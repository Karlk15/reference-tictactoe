#!/bin/bash
set -e
  git clean -dfx        # Remove untracked files from the working tree...
  git stash             # Stash the changes in a dirty working directory away
  rm -rf node_modules   # Remove node_modules from root
  npm install           # installs npm
  cd client             # enters client
  rm -rf node_modules   # Remove node_modules from client
  npm install           # installs npm should only be localy
  cd ..
  cd scripts
  #./cleanImages.sh     # to clean images in ubuntu
  cd ..
  ./pack.sh             # run pack script
  scp -o StrictHostKeyChecking=no -i "~/workspace/TicTacToe_Deploy/KarlUser-key-pair-eu-west-1.pem" ./docker-compose.yaml ec2-user@52.208.180.163:~/docker-compose.yaml  #jenkins cp's docker-compose to aws server
  scp -o StrictHostKeyChecking=no -i "~/workspace/TicTacToe_Deploy/KarlUser-key-pair-eu-west-1.pem" ./scripts/docker-compose-and-run.sh ec2-user@52.208.180.163:~/docker-compose-and-run.sh  #jenkins cp's docker-compose-and-run to aws server
  scp -o StrictHostKeyChecking=no -i "~/workspace/TicTacToe_Deploy/KarlUser-key-pair-eu-west-1.pem" ./build/.env ec2-user@52.208.180.163:~/.env
exit 0
