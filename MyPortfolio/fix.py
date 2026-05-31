import os
import shutil
import re

src_dir = os.path.join(os.getcwd(), 'assets')
dest_dir = os.path.join(os.getcwd(), 'public', 'assets')

if not os.path.exists(dest_dir):
    os.makedirs(dest_dir)

# Copy files instead of moving to avoid permission errors on delete
for file in os.listdir(src_dir):
    if file.endswith(('.pdf', '.jpg', '.png', '.min.js')):
        src_path = os.path.join(src_dir, file)
        dest_path = os.path.join(dest_dir, file)
        try:
            shutil.copy2(src_path, dest_path)
            print(f"Copied {file}")
        except Exception as e:
            print(f"Failed to copy {file}: {e}")

# Modify index.html to add 'download' attribute
index_path = os.path.join(os.getcwd(), 'index.html')
try:
    with open(index_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace <a href="assets/file.pdf" with <a href="assets/file.pdf" download
    new_content = re.sub(r'(<a[^>]*href="assets/[^"]+\.pdf")[^>]*>', lambda m: m.group(0) if 'download' in m.group(0) else m.group(0).replace('href="', 'download href="'), content)
    # Actually wait, let's just insert download attribute right before target="_blank"
    # or just replace <a href="assets/...pdf" with <a download href="assets/...pdf"
    new_content = re.sub(r'<a\s+href="assets/([^"]+\.pdf)"', r'<a href="assets/\1" download', content)
    
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Updated index.html")
except Exception as e:
    print(f"Failed to update index.html: {e}")
