"""RunPod Serverless worker for YiCORA's multilingual Qwen TTS pilot."""

from __future__ import annotations

import io
import os
import time
import uuid
from functools import lru_cache

import boto3
import runpod
import soundfile as sf
import torch
from qwen_tts import Qwen3TTSModel


MODEL_ID = os.getenv("HF_MODEL_ID", "Qwen/Qwen3-TTS-12Hz-0.6B-CustomVoice")
MAX_TEXT_LENGTH = int(os.getenv("MAX_TEXT_LENGTH", "3000"))
SUPPORTED_LANGUAGES = {
    "Chinese", "English", "Japanese", "Korean", "German", "French",
    "Russian", "Portuguese", "Spanish", "Italian",
}


@lru_cache(maxsize=1)
def load_model() -> Qwen3TTSModel:
    """Load once per worker and reuse for subsequent queued requests."""
    if not torch.cuda.is_available():
        raise RuntimeError("This worker requires a CUDA GPU.")

    token = os.getenv("HF_TOKEN")
    return Qwen3TTSModel.from_pretrained(
        MODEL_ID,
        device_map="cuda:0",
        dtype=torch.bfloat16,
        token=token,
    )


def get_r2_client():
    required = ("R2_ENDPOINT", "R2_ACCESS_KEY_ID", "R2_SECRET_ACCESS_KEY")
    missing = [name for name in required if not os.getenv(name)]
    if missing:
        raise RuntimeError(f"Missing R2 worker configuration: {', '.join(missing)}")

    return boto3.client(
        "s3",
        endpoint_url=os.environ["R2_ENDPOINT"],
        aws_access_key_id=os.environ["R2_ACCESS_KEY_ID"],
        aws_secret_access_key=os.environ["R2_SECRET_ACCESS_KEY"],
        region_name="auto",
    )


def handler(job: dict) -> dict:
    started_at = time.monotonic()
    payload = job.get("input") or {}
    text = payload.get("text")
    language = payload.get("language")
    speaker = payload.get("speaker")
    instruction = payload.get("instruction") or None

    if not isinstance(text, str) or not text.strip():
        raise ValueError("input.text must be a non-empty string")
    if len(text) > MAX_TEXT_LENGTH:
        raise ValueError(f"Text is too long; maximum is {MAX_TEXT_LENGTH} characters")
    if language not in SUPPORTED_LANGUAGES:
        raise ValueError(f"Unsupported Qwen language: {language!r}")
    if not isinstance(speaker, str) or not speaker.strip():
        raise ValueError("input.speaker must be a supported Qwen speaker name")
    if instruction is not None and not isinstance(instruction, str):
        raise ValueError("input.instruction must be a string when provided")

    model = load_model()
    supported_speakers = model.get_supported_speakers() or []
    canonical_speakers = {name.casefold(): name for name in supported_speakers}
    resolved_speaker = canonical_speakers.get(speaker.casefold())
    if not resolved_speaker:
        raise ValueError(
            "Unsupported Qwen speaker. Choose one of: "
            + ", ".join(supported_speakers)
        )

    wavs, sample_rate = model.generate_custom_voice(
        text=text.strip(),
        language=language,
        speaker=resolved_speaker,
        instruct=instruction,
        max_new_tokens=2048,
    )
    if not wavs:
        raise RuntimeError("Qwen returned no audio")

    audio_buffer = io.BytesIO()
    sf.write(audio_buffer, wavs[0], sample_rate, format="WAV", subtype="PCM_16")
    audio_buffer.seek(0)

    bucket = os.getenv("R2_BUCKET_NAME")
    if not bucket:
        raise RuntimeError("Missing R2_BUCKET_NAME")
    object_key = f"generated/tts/{uuid.uuid4().hex}.wav"
    get_r2_client().put_object(
        Bucket=bucket,
        Key=object_key,
        Body=audio_buffer.getvalue(),
        ContentType="audio/wav",
        Metadata={"model": MODEL_ID, "language": language},
    )

    audio_seconds = len(wavs[0]) / sample_rate
    return {
        "object_key": object_key,
        "content_type": "audio/wav",
        "sample_rate": sample_rate,
        "duration_seconds": round(audio_seconds, 2),
        "model_id": MODEL_ID,
        "language": language,
        "speaker": resolved_speaker,
        "inference_seconds": round(time.monotonic() - started_at, 2),
    }


runpod.serverless.start({"handler": handler})
