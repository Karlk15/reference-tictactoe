#!/bin/bash
set -e
docker-compose down
docker rmi $(docker images -q)
docker-compose up -d
exit 0
