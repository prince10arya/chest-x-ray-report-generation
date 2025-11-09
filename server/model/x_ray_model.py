import torch
from transformers import VisionEncoderDecoderModel, ViTImageProcessor, AutoTokenizer
from PIL import Image

# 🔹 Load fine-tuned model
MODEL_PATH = "./xray_vit_gpt2_model"

print("🔹 Loading fine-tuned ViT + GPT-2 model...")
model = VisionEncoderDecoderModel.from_pretrained(MODEL_PATH)
processor = ViTImageProcessor.from_pretrained(MODEL_PATH)
tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)

tokenizer.pad_token = tokenizer.eos_token
model.config.pad_token_id = tokenizer.pad_token_id
model.eval()

def generate_report(image: Image.Image) -> str:
    """
    Takes a PIL image (chest X-ray) and returns the generated radiology report.
    """
    pixel_values = processor(images=image, return_tensors="pt").pixel_values

    with torch.no_grad():
        output_ids = model.generate(
            pixel_values,
            max_length=128,
            num_beams=4,
            early_stopping=True
        )

    report = tokenizer.decode(output_ids[0], skip_special_tokens=True)
    return report.strip()
