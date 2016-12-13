#!/bin/bash
docker rmi $(docker images -qa) # removes all images
