### 1) Key created and downloaded then set the permissions of your private key file so that only you can read it with the

    $ chmod 400 your_user_name-key-pair-region_name.pem

    $ chmod 400 karlk15.pem

### 2) Next I Installed the AWS Command Line Interface instead of following Amazon instruction to get pip and python I read that:

  OSX 10. should include python check

    $ python --version = Python 2.7.12

    install pip using

    $ sudo easy_install pip = pip 9.0.1

### 3) To Install the AWS CLI Using pip I used

    $ sudo pip install awscli

  __Error came which was fixed with --ignore-installed option__

    $ sudo pip install awscli --ignore-installed six

### 4) To work around this issue,  I use which pip to locate the executable, and then invoke it directly by using an absolute path when installing the AWS CLI:

    $ which pip

    /usr/local/bin/pip

    $ sudo /usr/local/bin/pip install awscli

### 5) To upgrade an existing AWS CLI installation, I used the --upgrade option:

    $ sudo pip install --upgrade awscli

### 6) next I needed to configure

    $ aws congifure

  and use my Access key ID,Secret access key

### 7) Where I saved my-aws-key-pairs I need to go to and run

    $ chmod 400 my-ec2-key-pair.pem

  if I didn´t do it already than

    $ ssh -i my-ec2-key-pair.pem ec2-user@<EC2-INSTANCE-PUBLIC-IP-ADDRESS>
  t.d
    ssh -i KarlK15.pem ec2-user@52.213.251.37

### 7.5) http://www.ybrikman.com/writing/2015/11/11/running-docker-aws-ground-up/#installing-docker

AFTER LOG IN
### 8) Now I am fully working Linux server running in the AWS cloud. I want to install Docker on it.

    $ sudo yum update -y

    $ sudo yum install -y docker

    $ sudo service docker start

### 9) To be able to run cmds without sudo:

    $ sudo usermod -a -G docker ec2-user

    $ exit

  than log in again t.d

    $ ssh -i KarlK15.pem ec2-user@52.213.251.37

### 10) To check if I have some images

    $ docker ps

    $ docker info (returns lost info about my docker install without errors)

should return empty so to get image lets run

    $ docker run -d -p 80:5000 training/webapp:latest python app.py

  The -p 80:5000 flag in the command above tells Docker to link port 5000 on the Docker container to port 80 on the EC Instance. You can test that the Docker image is running as follows:

    $ docker ps

  To test the docker image run

    $ curl http://localhost (it should return)

      Hello world!

      then got to web and enter the id

      t.d http://52.213.251.37/

      Hello world!

### 11)get docker-compose

    $ curl -L "https://github.com/docker/compose/releases/download/1.9.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

    $ chmod +x /usr/local/bin/docker-compose

    $ docker-compose --version

### docker-compose version: 1.9.0

### 12) Get git to make clone from github available

    $ sudo yum install git-all

### 13) Change all 3000 ports to 80

### 14) Build to get new Image

    $ ./pack.sh

### 15) Næst sækja nyjustu myndina á Amazon serverinn með því að fara inn í verkerfmið reference-tictactoe og keyra skriftuna fyrir neðan

    $ scp -o StrictHostKeyChecking=no -i "location+name.pem key" ./docker-compose.yaml ec2-user@52.208.180.163:~/docker-compose.yaml


### 16) Chech if docker-compose.yml

    $ ls
    - docker-compose.yml

### 17) Run up images logged in

  t.d
    $ ssh -i KarlK15.pem ec2-user@52.213.251.37

    $ docker-compose up

  If this does not work try to clean containers and images

    $ ./cleanImages.sh

    $ ./cleanContainer.sh

### 18) Run up in Web with public key

  t.d 52.213.251.37

### 19) Connect to ubuntu server and Installs

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

### 20) Nice to change password on ubuntu server

    $ passwd

### 21) logged in ubuntu server give jenkins push permissions

    $ sudo su jenkins
    $ docker login

### 22) Create script in aws server that runs docker-compose up

      name it --> docker-compose-and-run.sh

### 23) Create new project in jenkins for deploy

      add execute shell and add cmds
      ssh -o StrictHostKeyChecking=no -i "{SECURITY_GROUP_NAME}.pem" -f ec2-user@${INSTANCE_PUBLIC_NAME} "docker-compose-and-run.sh"

### 24) copy {INSTANCE_PUBLIC_NAME} into ubuntu server with cmd

    $ scp -o StrictHostKeyChecking=no "{INSTANCE_PUBLIC_NAME}"  ubuntu@{IP_ADDRESS}:~/{INSTANCE_PUBLIC_NAME}.pem

### 25) log in to ubuntu server and move {INSTANCE_PUBLIC_NAME}.pem to right position

      sudo {INSTANCE_PUBLIC_NAME}.pem  /var/lib/jenkins/workspace/TicTacToe_Deploy
      to see the owner run cmd
      ls -l {DIRECTORY} then make jenkins the owner
      $ sudo chown jenkins:jenkins /var/lib/jenkins/workspace/TicTacToe_Deploy/{INSTANCE_PUBLIC_NAME}.pem

### 26) make jenkins build when changes is pushed to github
        - go to configure and select box that is called build when changes is pushed to github
        - go to github repository and into settings
        - go to integrations & services
        - click add services and choose jenkins(Github plugin)
        - follow instructions about how to set the Jenkins hook url
        - click update services
        - then in right corner click Test service
        Your should now see jenkins starting on jenkins homepage
