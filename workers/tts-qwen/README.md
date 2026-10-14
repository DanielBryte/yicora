# YiCORA Qwen TTS RunPod worker

This is the first real inference worker for the YiCORA localization stack. It uses Qwen's multilingual CustomVoice checkpoint and stores generated WAV files in a private R2 bucket. The model supports Chinese, English, Japanese, Korean, German, French, Russian, Portuguese, Spanish, and Italian. It does not provide YiCORA's African-language voices.

## RunPod endpoint secrets

Set these as endpoint environment variables/secrets. Never commit values here or put them in `NEXT_PUBLIC_*` variables.

```text
HF_MODEL_ID=Qwen/Qwen3-TTS-12Hz-0.6B-CustomVoice
HF_TOKEN=<only needed for a private YiCORA model repository>
R2_ENDPOINT=https://<account-id>.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=<R2 API token access key>
R2_SECRET_ACCESS_KEY=<R2 API token secret>
R2_BUCKET_NAME=<private bucket name>
```

Create a Cloudflare R2 API token scoped to this bucket with **Object Read & Write** permissions. Use its S3 credentials here. Keep the bucket private; the worker returns only an object key. YiCORA's web server should authorize the user and create a short-lived download URL when the asset is requested.

## Worker input

```json
{
  "input": {
    "text": "Welcome to YiCORA.",
    "language": "English",
    "speaker": "Ryan",
    "instruction": "Speak clearly and warmly."
  }
}
```

Use the exact language and speaker names supported by the model. The handler rejects unsupported values rather than silently producing a mismatched language or voice.

## Deploy

Build this directory as a container image, push it to a container registry available to RunPod, and create a **Queue** Serverless endpoint from that image. Start with minimum workers `0`, one maximum worker, and an execution timeout long enough for model cold-start plus generation. Attach persistent model cache storage at `/runpod-volume` if available. Add the secrets above in RunPod's endpoint configuration, then send the example input from the endpoint's test interface.

The worker reports an R2 object key and duration after generation. The Next.js app is not connected to this endpoint yet: that is the next integration step, after the endpoint has a real ID and the R2 bucket is configured.
