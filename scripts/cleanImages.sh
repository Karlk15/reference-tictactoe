#!/bin/bash
docker rmi $(docker images -q) # removes all images
