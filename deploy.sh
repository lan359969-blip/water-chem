#!/bin/bash

# ------------------------------
# React 项目一键打包部署脚本（增强版）
# ------------------------------

# 1️⃣ 检查 Node.js 是否安装
if ! command -v node &> /dev/null
then
    echo "⚠️ Node.js 未安装，请先安装 Node.js"
    exit 1
fi

# 2️⃣ 检查 npm 是否安装
if ! command -v npm &> /dev/null
then
    echo "⚠️ npm 未安装，请先安装 npm"
    exit 1
fi

# 3️⃣ 安装依赖（如果 node_modules 已存在则跳过）
if [ ! -d "node_modules" ]; then
    echo "📦 正在安装依赖..."
    npm install
else
    echo "✅ 依赖已存在，跳过安装"
fi

# 4️⃣ 打包 React 项目
echo "⚡ 正在打包 React 项目..."
npm run build

# 5️⃣ 检查 dist 文件夹是否存在
if [ ! -d "dist" ]; then
    echo "❌ 打包失败，dist 文件夹不存在"
    exit 1
fi

# 6️⃣ 清空 docs 文件夹
echo "🗑️ 清空 docs 文件夹..."
rm -rf docs/*
mkdir -p docs

# 7️⃣ 拷贝打包文件到 docs
echo "📂 拷贝打包文件到 docs..."
cp -r dist/* docs/

# 8️⃣ 提交并推送到 GitHub
echo "🚀 提交并推送到 GitHub..."
git add docs/*
git commit -m "Update website build"
git push

# 9️⃣ 提示部署完成
echo "🎉 部署完成！"
echo "🔗 访问网址：https://你的用户名.github.io/仓库名/ (根据你的仓库名修改)"