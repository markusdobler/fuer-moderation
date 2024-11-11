#!/bin/bash
set -e

rm -rf dist/
npm run build -- --base="./"
cd dist
git init
git branch -m pages
git add .
git commit -m "Pages"
git remote add origin  git@github.com:markusdobler/fuer-moderation.git
git push --force -u origin pages
