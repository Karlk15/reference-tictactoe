
### 1) Connect to ubuntu server and Installs

    $ curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
    $ sudo apt-get install -y nodejs
    $ node -v
    $ npm -v
    $ sudo apt-get install git-all
    $ sudo apt-get update
    $ sudo apt-get install apt-transport-https ca-certificates

  Add the new GPG key. This commands downloads the key with the ID
  58118E89F3A912897C070ADBF76221572C52609D from the keyserver hkp://ha.pool.sks-keyservers.net:80
  and adds it to the adv keychain. For more info, see the output of man apt-key.

    $ sudo apt-key adv \
                   --keyserver hkp://ha.pool.sks-keyservers.net:80 \
                   --recv-keys 58118E89F3A912897C070ADBF76221572C52609D

    If a new version of docker is deployed this will get it

    $ echo "deb https://apt.dockerproject.org/repo ubuntu-xenial main" | sudo tee /etc/apt/sources.list.d/docker.list

    Update the APT package index.

    $ sudo apt-get update
    $ sudo apt-get install linux-image-extra-$(uname -r) linux-image-extra-virtual
    $ sudo apt-get install -y docker
    $ sudo service docker start
    $ sudo service jenkins restart

    $ sudo groupadd docker               -groupdd should exists but nice to check
    $ sudo gpasswd -a jenkins docker     -adds jenkins to docker group so jenkins does not use sudo
    $ sudo service docker restart
    $ sudo gpasswd -a jenkins docker
    $ sudo service docker restart
    $ npm install -g nodemon
    $ npm install -g create-react-app

### 2) Nice to change password on ubuntu server

    $ passwd

### 3) logged in ubuntu server give jenkins push permissions

    $ sudo su jenkins
    $ docker login

### 4) Create script in aws server that runs docker-compose up

      name it --> docker-compose-and-run.sh

### 5) Create new project in jenkins for deploy

      add execute shell and add cmds
      ssh -o StrictHostKeyChecking=no -i "{SECURITY_GROUP_NAME}.pem" -f ec2-user@${INSTANCE_PUBLIC_NAME} "docker-compose-and-run.sh"

### 6) copy {INSTANCE_PUBLIC_NAME} into ubuntu server with cmd

    $ scp -o StrictHostKeyChecking=no "{INSTANCE_PUBLIC_NAME}"  ubuntu@{IP_ADDRESS}:~/{INSTANCE_PUBLIC_NAME}.pem

### 7) log in to ubuntu server and move {INSTANCE_PUBLIC_NAME}.pem to right position

      sudo {INSTANCE_PUBLIC_NAME}.pem  /var/lib/jenkins/workspace/TicTacToe_Deploy
      to see the owner run cmd
      ls -l {DIRECTORY} then make jenkins the owner
      $ sudo chown jenkins:jenkins /var/lib/jenkins/workspace/TicTacToe_Deploy/{INSTANCE_PUBLIC_NAME}.pem

### 8) make jenkins build when changes is pushed to github
        - go to configure and select box that is called build when changes is pushed to github
        - go to github repository and into settings
        - go to integrations & services
        - click add services and choose jenkins(Github plugin)
        - follow instructions about how to set the Jenkins hook url
        - click update services
        - then in right corner click Test service
        Your should now see jenkins starting on jenkins homepage
