#!/bin/bash
# 一键更新 /docs 并推送到 GitHub

# 1️⃣ 备份旧 docs
if [ -d "docs" ]; then
  cp -r docs docs_backup_$(date '+%Y%m%d%H%M%S')
  echo "旧 docs 已备份"
fi

# 2️⃣ 生成最新文档（以 MkDocs 为例）
mkdocs build
echo "文档已生成到 site/"

# 3️⃣ 清空旧 docs 并复制最新内容
rm -rf docs/*
cp -r site/* docs/
echo "docs 文件夹已更新"

# 4️⃣ Git 提交并推送
git add docs/*
git commit -m "Update /docs: $(date '+%Y-%m-%d %H:%M:%S')"
git push origin main
echo "更新已推送到 GitHub"