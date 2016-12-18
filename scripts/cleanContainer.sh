#!/bin/bash
                               #(docker-compose down only removes what was run up)this will remove all containers
docker stop $(docker ps -a -q) #stops the containers
docker rm $(docker ps -a -q)   #removes them
