#!/bin/bash
set -e               # skips to exit 0 if warning pops when cmd docker-compose up
  sleep 10           # gives server 10 seconds to start up and connect
  npm run migratedb  #
  node run.js        # node used to run js and run.js connects the ports
  open http://52.214.95.76/
exit 0               # if warning pops up this will be second step from set -e
