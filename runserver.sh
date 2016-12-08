#!/bin/bash
##already have this one in scripts as runner.sh need to take a look at
set -e
  sleep 10
  npm run migratedb
  node run.js
exit 0
