# YiCORA AI localization: beginner setup guide

This guide takes YiCORA from its current mock generation providers to a self-hosted, multi-language localization system. It keeps the existing Next.js, Supabase, and R2 direction. Model inference runs on queued serverless GPU workers; the website does not run GPU work itself.

## The first language set

Do not launch with only English and Yoruba. Start with a broad set that has model candidates, then mark each language as preview until it passes native-speaker review.

| Use | Languages | Starting model |
| --- | --- | --- |
| Global TTS | English, Spanish, French, Portuguese, German, Italian, Russian, Mandarin Chinese, Japanese, Korean | `Qwen/Qwen3-TTS-12Hz-0.6B-Base` |
| Additional global TTS | Arabic, Hindi | `ResembleAI/chatterbox` |
| African TTS | Hausa, Yoruba, Igbo, Nigerian English | `PlotweaverAI/naija-tts` |
| East African TTS | Swahili | `ResembleAI/chatterbox` |
| Global ASR | Languages supported by Whisper; validate each YiCORA language on actual recordings | `openai/whisper-large-v3-turbo` |
| Nigerian ASR | Nigerian English, Nigerian Pidgin, Yoruba, Hausa, Igbo | `Axiveri/NaijaVox-2.0` |
| Translation draft | Broad multilingual baseline; evaluate every source/target pair | `google/madlad400-3b-mt` |

Model cards currently list Qwen TTS as Apache-2.0, Chatterbox as MIT, Naija TTS as MIT, NaijaVox-2.0 as Apache-2.0, Whisper as MIT, and MADLAD as Apache-2.0. Read the current card and all dataset/dependency terms before a commercial release. A model license does not automatically clear voice recordings or training data.

**Known gaps:** Naija TTS does not list Nigerian Pidgin. Naija TTS's own published Yoruba evaluation is weak and small. Add Pidgin TTS and any new African language only after YiCORA has a rights-cleared corpus and a tested model. Do not show a language as production-ready merely because a checkpoint accepts its code.

## What YiCORA already has

- Next.js API routes and provider interfaces for voice, video, and music.
- Supabase project/generation tables and row-level security.
- Mock voice/video providers, so current generation responses are demonstrations, not real model output.
- An in-memory `JobManager`. This loses job state when a server process restarts or another instance handles the status request.
- No RunPod, R2, or Hugging Face credentials in the current `.env.example`.

The first engineering task is therefore to replace mock providers and in-memory job state with a persistent queue workflow. Keep the UI controls and existing routes; change the provider implementations behind them.

## Part 1 — Create YiCORA model and data repositories

1. Create a YiCORA organization on Hugging Face.
2. Create private dataset repositories, initially:
   - `yicora/tts-data-yo`
   - `yicora/tts-data-ha`
   - `yicora/tts-data-ig`
   - `yicora/tts-data-en-ng`
   - `yicora/asr-data-ng`
   - `yicora/mt-eval`
3. Create private output repositories for fine-tuned checkpoints, for example `yicora/qwen-tts-en-v1` and `yicora/qwen-tts-es-v1`.
4. Keep private voice recordings private. Get written permission for model training, voice cloning, and commercial use.
5. Do not copy all unchanged base weights just to put YiCORA's name on them. Reference the upstream model ID in code. Upload the YiCORA fine-tuned checkpoint or adapter to your organization, preserve the license, and identify the upstream base in the model card.

Hugging Face CLI basics:

```bash
hf auth login
hf repos create yicora/tts-data-yo --repo-type dataset --private
hf repos create yicora/qwen-tts-en-v1 --private
```

If you intentionally need a full local copy of a public checkpoint, download it, create a private model repo, and upload the files while retaining the original `LICENSE` and attribution:

```bash
hf download Qwen/Qwen3-TTS-12Hz-0.6B-Base --local-dir ./models/qwen-tts-base
hf repos create yicora/qwen-tts-base-copy --private
hf upload yicora/qwen-tts-base-copy ./models/qwen-tts-base
```

For most production deployments, skip that full-copy step: RunPod can download/cache a pinned upstream model, while YiCORA stores only its fine-tunes.

## Part 2 — Prepare the training and evaluation audio

For each voice, create clean, single-speaker recordings with their exact transcripts. Preserve Yoruba and Igbo diacritics and Hausa characters. Include short and long sentences, names, numbers, questions, and code-switching. Remove silence, clipping, background music, and mismatched transcripts.

Keep an evaluation set out of training. Ask native speakers to rate intelligibility, pronunciation, naturalness, and meaning. Record scores by language and voice so you can compare the base model with every fine-tune.

WAXAL may help with experimentation, but its dataset card lists CC-BY-SA terms for several Nigerian-language TTS subsets. Decide whether YiCORA can comply before using those recordings in model training. Your own speaker recordings with documented releases are the clearest route to a YiCORA-owned voice dataset.

## Part 3 — Fine-tune global Qwen voices

The official Qwen3-TTS recipe currently supports single-speaker fine-tuning for the supported languages. Use one prepared dataset and output repo per language/voice. Fine-tuning a speaker in a supported language does not by itself add a new language to the model.

Each JSONL line contains an audio path, matching text, and a reference audio path:

```json
{"audio":"./data/train/0001.wav","text":"A correctly transcribed sentence.","ref_audio":"./data/reference.wav"}
```

On a CUDA GPU, follow the upstream Qwen recipe:

```bash
git clone https://github.com/QwenLM/Qwen3-TTS.git
cd Qwen3-TTS/finetuning

python prepare_data.py \
  --device cuda:0 \
  --tokenizer_model_path Qwen/Qwen3-TTS-Tokenizer-12Hz \
  --input_jsonl ./data/train_raw.jsonl \
  --output_jsonl ./data/train_with_codes.jsonl

python sft_12hz.py \
  --init_model_path Qwen/Qwen3-TTS-12Hz-0.6B-Base \
  --output_model_path ./output/yicora-voice-en-v1 \
  --train_jsonl ./data/train_with_codes.jsonl \
  --batch_size 32 \
  --lr 2e-6 \
  --num_epochs 10 \
  --speaker_name yicora_voice_en
```

These are the upstream example settings, not guaranteed optimal YiCORA settings. First run a short smoke run, listen to its output, and change batch size if the selected GPU runs out of memory. Use Hugging Face Jobs or another GPU trainer to run the same pinned training code remotely; save checkpoints to durable storage.

## Part 4 — African-language TTS

1. Deploy `PlotweaverAI/naija-tts` unchanged as the initial Hausa/Yoruba/Igbo/Nigerian-English candidate.
2. Compare its outputs with the same held-out native-speaker scripts. Pay special attention to Yoruba tone marks and code-switching.
3. The model card gives inference instructions but is not a turnkey YiCORA fine-tuning walkthrough. Do not use the Qwen training script on it. For a YiCORA fine-tune, first reproduce the training pipeline for its Chatterbox base and verify the language/tokenizer support; then train from licensed YiCORA speech data.
4. Repeat for Hausa, Igbo, and Nigerian English separately. Keep language-specific checkpoints so one language's updates do not silently degrade another.
5. For Pidgin TTS, collect and license Pidgin recordings first. Do not route Pidgin text to Hausa, Yoruba, or English TTS and claim it is supported.

For global languages not covered by Qwen, the Chatterbox multilingual model lists Arabic, Hindi, and Swahili among its supported languages. Test the exact language/dialect and pronunciation before enabling it for users.

## Part 5 — Deploy queued RunPod Serverless GPU workers

Create a small worker repository for each model family. Each worker contains a Python handler, pinned dependencies, and a Dockerfile. The handler loads its model once when the GPU worker starts, accepts a JSON task, downloads input from R2, runs inference, uploads output to R2, and returns the R2 object key plus timing/status metadata.

Recommended first endpoints:

1. `yicora-asr-global` — Whisper large-v3-turbo.
2. `yicora-asr-ng` — NaijaVox-2.0.
3. `yicora-tts-global` — Qwen TTS; add Chatterbox when needed.
4. `yicora-tts-ng` — Naija TTS.
5. `yicora-translation` — MADLAD-400 3B.

For each endpoint:

1. Create a RunPod **Queue** serverless endpoint.
2. Build and push the worker Docker image.
3. Set the GPU type and execution timeout to fit the model/job.
4. Set minimum workers to `0` for the cheapest initial setup; this permits cold starts. Set minimum workers to `1` only when interactive latency matters enough to pay for an idle GPU.
5. Set a small maximum worker count at first to control concurrency and spend.
6. Configure model caching or a persistent cache for Hugging Face weights; do not fetch multi-gigabyte model weights on every request.
7. Add secrets in the RunPod endpoint settings, never in the Docker image or browser bundle.
8. Submit one test job and check its logs, GPU memory, output audio, and failure handling before connecting the endpoint to YiCORA.

RunPod Queue endpoints support async `/run` jobs and status polling; they are intended for queued processing and retries. Use them for dubbing/export work rather than keeping a browser request open for minutes. [RunPod endpoint types](https://docs.runpod.io/serverless/endpoints/overview), [worker quickstart](https://github.com/runpod/docs/blob/main/serverless/quickstart.mdx), [model caching](https://docs.runpod.io/serverless/endpoints/model-caching)

## Part 6 — Connect RunPod to the existing YiCORA app

The workflow should be:

```text
Browser uploads video directly to private R2
  -> Next.js checks the signed-in user and creates a persistent Supabase job
  -> Inngest runs the workflow and dispatches ASR to RunPod
  -> transcript is saved; user reviews/edits it
  -> MADLAD drafts translation; user reviews/edits it
  -> selected language routes to its TTS RunPod endpoint
  -> FFmpeg aligns/mixes audio and renders the video
  -> final asset is written to R2; Supabase job becomes completed
  -> dashboard displays the result
```

Next.js should pass an R2 object key or short-lived signed URL—not upload video bytes through its API route. Store job state in Supabase, not the current in-memory `JobManager`. Protect generation routes with Supabase authentication, validate language/model choices server-side, and keep `RUNPOD_API_KEY`, `HF_TOKEN`, and R2 credentials server-only.

Add server-side environment variables when you are ready to connect accounts:

```env
RUNPOD_API_KEY=
RUNPOD_ASR_GLOBAL_ENDPOINT_ID=
RUNPOD_ASR_NG_ENDPOINT_ID=
RUNPOD_TTS_GLOBAL_ENDPOINT_ID=
RUNPOD_TTS_NG_ENDPOINT_ID=
RUNPOD_TRANSLATION_ENDPOINT_ID=
HF_TOKEN=
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=yicora-media
R2_ENDPOINT=
```

Keep model routing in server-side configuration, for example:

```text
en,es,fr,pt,de,it,ru,zh,ja,ko -> Qwen global TTS
ar,hi,sw                         -> Chatterbox TTS
ha,yo,ig,en-NG                   -> Naija TTS
pcm                              -> unavailable for TTS until YiCORA trains/evaluates a Pidgin voice
```

The ASR router can use NaijaVox for `pcm`, `en-NG`, `yo`, `ha`, and `ig`, and Whisper for the global path. The translation router uses MADLAD as a draft generator, with a review step before speech synthesis.

## Do this first

1. Create the Hugging Face organization and private data/model repos.
2. Create RunPod account and deploy **one** Qwen TTS Queue endpoint using its upstream base model.
3. Generate a short sample for several supported languages and verify audio quality.
4. Deploy one Naija TTS endpoint and test Hausa, Yoruba, Igbo, and Nigerian English.
5. Replace the app's mock voice provider with a server-only RunPod adapter.
6. Persist job state in Supabase and keep output media in R2.
7. Add ASR, translation, review, then FFmpeg video export.
8. Fine-tune one speaker per supported Qwen language using the official recipe. Separately reproduce the African TTS trainer before attempting an African-language fine-tune.

Do not pay for training until the inference worker, data rights, and evaluation set are ready. GPU weights can be downloaded for free; GPU runtime, storage, and bandwidth/operations are separate costs.
