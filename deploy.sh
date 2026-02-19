#!/bin/bash

echo "⚡ 开始打包..."

npm run build

echo "🚀 提交并推送..."

git add docs
git commit -m "Update build $(date '+%Y-%m-%d %H:%M:%S')"
git push

echo "🎉 部署完成！"
echo "🔗 https://lan359969-blip.github.io/water-chem/"