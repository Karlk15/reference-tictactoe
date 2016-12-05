#!/bin/bash
set -e               # skips to exit 0 if warning pops when cmd docker-compose up
  sleep 10           # gives server 10 seconds to start up and connect
  npm run migratedb  # starts running migratedb after 10 seconds
  node run.js        # node used to run js and run.js connects the ports
exit 0               # if warning pops up this will be second step from set -e
