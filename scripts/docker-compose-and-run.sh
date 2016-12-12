#!/bin/bash
set -e
  docker-compose down
  docker rmi $(docker images -qa)
  docker-compose up -d
exit 0
