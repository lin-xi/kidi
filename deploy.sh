#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn run pages:build

cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/lin-xi/kidi.git master:gh-pages