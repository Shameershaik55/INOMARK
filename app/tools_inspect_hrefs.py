import os
import re

base_dir = r"c:\Users\shame\Downloads\INOMARK\stitch_inomark_ai_creator_marketplace (8)\stitch_inomark_ai_creator_marketplace"

def inspect_hrefs():
    relative_hrefs = {}
    for folder in os.listdir(base_dir):
        p = os.path.join(base_dir, folder, "code.html")
        if os.path.exists(p):
            with open(p, "r", encoding="utf-8") as f:
                content = f.read()
                hrefs = re.findall(r'href=["\']([^"\']+)["\']', content)
                for h in hrefs:
                    if not h.startswith("http") and not h.startswith("#"):
                        relative_hrefs.setdefault(folder, set()).add(h)
    
    for f, hrefs in relative_hrefs.items():
        print(f, "->", hrefs)

if __name__ == "__main__":
    inspect_hrefs()
