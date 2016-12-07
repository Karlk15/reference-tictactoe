#!/bin/bash
git clean -dfx
git stash
rm -rf node_modules
npm install
cd client
rm -rf node_modules
npm install
cd ..
./pack.sh
