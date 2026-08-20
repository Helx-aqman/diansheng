import sys, subprocess, os
print("start", flush=True)
try:
    from PIL import Image, ImageDraw, ImageFont
    print("Pillow ok", flush=True)
except ImportError:
    print("installing Pillow...", flush=True)
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow", "-q"])
    from PIL import Image, ImageDraw, ImageFont
    print("installed", flush=True)

W = 1024
img = Image.new("RGBA", (W, W), (0, 0, 0, 0))
d = ImageDraw.Draw(img)
d.rounded_rectangle([0, 0, W - 1, W - 1], radius=230, fill=(232, 130, 58, 255))
d.rounded_rectangle([0, int(W * 0.55), W - 1, W - 1], radius=230, fill=(214, 108, 46, 255))
fnt = ImageFont.truetype("C:/Windows/Fonts/msyh.ttc", 600)
d.text((W / 2, int(W / 2) - 20), "典", font=fnt, fill=(255, 255, 255, 255), anchor="mm")
out = "C:/Users/CGC/WorkBuddy/听书伴读/app/static/app_icon.png"
img.save(out)
print("saved", out, os.path.getsize(out), flush=True)
