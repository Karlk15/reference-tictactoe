#!/bin/bash
set -e
  yum update -y
  yum install -y docker
  service docker start
  sudo usermod -a -G docker ec2-user
  yum install -y git-all
  curl -L "https://github.com/docker/compose/releases/download/1.9.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  chmod +x /usr/local/bin/docker-compose
  docker-compose up
exit 0
