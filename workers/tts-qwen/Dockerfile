FROM runpod/pytorch:1.0.3-cu1281-torch291-ubuntu2404

WORKDIR /worker

COPY requirements.txt .
RUN python -m pip install --no-cache-dir -r requirements.txt

COPY handler.py .

ENV HF_MODEL_ID=Qwen/Qwen3-TTS-12Hz-0.6B-CustomVoice \
    HF_HOME=/runpod-volume/huggingface \
    PYTHONUNBUFFERED=1

CMD ["python", "-u", "handler.py"]
