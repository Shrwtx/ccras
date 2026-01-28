
import os

try:
    from PIL import Image, ImageDraw
    HAS_PIL = True
except ImportError:
    HAS_PIL = False

def setup():
    print("--- CCRAS Backend Initializer ---")
    
    # 1. Create Folders
    folders = ["static", "weights"]
    for f in folders:
        if not os.path.exists(f):
            os.makedirs(f)
            print(f"[+] Created folder: {f}")

    # 2. Initialize Placeholder Weights ONLY IF they don't exist
    # This prevents overwriting your real trained models!
    weights = ["xray_model.pth", "knee_model.pth", "mri_model.pth", "ct_model.pth"]
    for w in weights:
        path = os.path.join("weights", w)
        if not os.path.exists(path):
            with open(path, "wb") as f:
                f.write(b"MOCK_WEIGHT_DATA_PLACEHOLDER")
            print(f"[!] Warning: Created mock weights for {w}. Replace this with your real .pth file.")
        else:
            print(f"[OK] Real weights detected for {w}. Skipping initialization.")

    # 3. Generate Mock Heatmap Image for UI
    heatmap_path = "static/heatmap_sample.png"
    if HAS_PIL:
        if not os.path.exists(heatmap_path):
            img = Image.new('RGBA', (512, 512), color=(0, 0, 0, 0))
            draw = ImageDraw.Draw(img)
            draw.ellipse([150, 150, 350, 350], fill=(255, 0, 0, 100))
            draw.ellipse([200, 200, 300, 300], fill=(255, 255, 0, 150))
            img.save(heatmap_path)
            print(f"[+] Generated Heatmap Asset: {heatmap_path}")
    else:
        print(f"[!] Warning: Pillow not installed. Skipping heatmap generation.")

    print("\n--- Setup Complete ---")
    print("Next Steps:")
    print("1. Place your real trained .pth files in the 'backend/weights' folder.")
    print("2. Update 'backend/model_factory.py' typical_classes to match your labels.")
    print("3. Run 'uvicorn main:app --reload'")

if __name__ == "__main__":
    setup()
