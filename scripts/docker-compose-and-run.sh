#!/bin/bash
                                  # this script is copyed to aws server and runned in every deploy
set -e                            # exits with 0 if an error shows up
  docker-compose down             # takes down running dockers
  docker rmi $(docker images -qa) # removes all docker images quired and all
  docker-compose up -d            # run docker up with nodemon
exit 0
