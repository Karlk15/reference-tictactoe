ifndef TAG
  #needs to be a project stored in git, gets the short commit sha
	TAG := $(shell git rev-parse --short HEAD)
endif
ifndef PROJECT_NAME
  #Change to the name of you project
	PROJECT_NAME := reference-tictactoe
endif
ifndef USERNAME
  #Change  to your dockerhub username
	USERNAME := karlk15
endif
ifndef IMAGE_TAG
  #Change <username> to your dockerhub username
	IMAGE_TAG := ${karlk15}/${PROJECT_NAME}:${TAG}
endif

build:
	docker build -t ${IMAGE_TAG} .
run:
	docker run -p "3000:3000" -d ${IMAGE_TAG}
docker-test:
	#add '--net host' if you want to connect to redis container runnin in another container on host or use docker compose with the ' command: 'npm test' '
	docker run -it ${IMAGE_TAG} npm test
redis:
	#-v flag for starting with persistent storage
	#docker run -d -p "5432:5432" -v "${PWD}/redis:/data redis"
	docker run -p 5432:5432 --name pg2 -e POSTGRES_PASSWORD=mysecretpassword -d postgres
compose:
	docker-compose up -d --build
