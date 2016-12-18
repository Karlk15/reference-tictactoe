#!/bin/bash

git clean -dfx        # Remove untracked files from the working tree...
git stash             # Stash the changes in a dirty working directory away
rm -rf node_modules   # Remove node_modules from root
npm cache clean
npm install           # installs npm
cd client             # enters client
rm -rf node_modules   # Remove node_modules from client
npm cache clean
npm install           # installs npm should only be localy
cd ..
