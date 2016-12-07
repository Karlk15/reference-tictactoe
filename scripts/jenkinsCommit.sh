#!/bin/bahs
git clean -dfx
git stash
rm -rf node_modules
npm install
./pack.sh
