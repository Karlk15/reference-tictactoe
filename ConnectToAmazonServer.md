
## 1) Key created and downloaded then set the permissions of your private key file so that only you can read it with the

   $ chmod 400 your_user_name-key-pair-region_name.pem
   
   $ chmod 400 karlk15.pem

## 2) Next I Installed the AWS Command Line Interface

   instead of following Amazon instruction to get pip and python
   I read that:
   OSX 10. should include python check
   
    $ python --version = Python 2.7.12
    
   install pip using
   
    $ sudo easy_install pip = pip 9.0.1

## 3) To Install the AWS CLI Using pip I used

    $ sudo pip install awscli
   Error came which was fixed with --ignore-installed option
    $ sudo pip install awscli --ignore-installed six

## 4) To work around this issue,  I use which pip to locate the executable, and then invoke it directly by using an absolute path when installing the AWS CLI:

    $ which pip
      /usr/local/bin/pip
    $ sudo /usr/local/bin/pip install awscli

## 5) To upgrade an existing AWS CLI installation, I used the --upgrade option:

    $ sudo pip install --upgrade awscli

## 6) next I needed to configure

    $ aws congifure
   and use my Access key ID,Secret access key
   
      AKIAIT76BISPAWZQLXVA
      
      0iT1LM1M6ShaKP5Qs4wT3jGygj/N+u0C6Z+fihwO
      
      eu-west-1

## 7) Where I saved my-aws-key-pairs I need to go to and run

    $ chmod 400 my-ec2-key-pair.pem if I didn´t do it already
   than
    $ ssh -i my-ec2-key-pair.pem ec2-user@<EC2-INSTANCE-PUBLIC-IP-ADDRESS>
      ssh -i KarlK15.pem ec2-user@52.213.251.37

## 7.5)
   http://www.ybrikman.com/writing/2015/11/11/running-docker-aws-ground-up/#installing-docker

## AFTER LOG IN
## 8) Now I am fully working Linux server running in the AWS cloud.

   I want to install Docker on it.
    $ sudo yum update -y
    $ sudo yum install -y docker
    $ sudo service docker start

## 9) To be able to run cmds without sudo:

    $ sudo usermod -a -G docker ec2-user
    $ exit
   than log in again
    $ ssh -i KarlK15.pem ec2-user@52.213.251.37

## 10)To check if I have some images

    $ docker ps
    $ docker info (returns lost info about my docker install without errors)
   should return empty so to get image lets run
    $ docker run -d -p 80:5000 training/webapp:latest python app.py
   The -p 80:5000 flag in the command above tells Docker to link port 5000 on the
   Docker container to port 80 on the EC Instance.
   You can test that the Docker image is running as follows: and
    $ docker ps
   To test the docker image run
    $ curl http://localhost (it should return)
      Hello world!
    then got to web and enter the id http://52.213.251.37/
      Hello world!
      
## 11)Sækja docker-compose

    $ curl -L "https://github.com/docker/compose/releases/download/1.9.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    $ chmod +x /usr/local/bin/docker-compose
    $ docker-compose --version
      docker-compose version: 1.9.0
## 12)Sækja git til að geta clonað af github

    $ sudo yum install git-all

## 13)Næst er að clona verkefnið af GitHub

   $ git clone https://github.com/Karlk15/reference-tictactoe.git

## 14)ath hvort verkefnið sé komið

   $ ls
   $ cd reference-tictactoe

## 15)Breyta öllum 3000 ports í 80

## 16)byggja upp verkefnið aftur með breytingum og fá nytt image í local ekki á server

   $ ./pack.sh

## 15) Prófa að keyra Image up innskráður ssh -i KarlK15.pem ec2-user@52.213.251.37

   $ cd reference-tictactoe
   $ docker-compose up
   ef það virkar ekki hreinsaðu myndirnar og Gáma
   $ ./cleanImages.sh
   $ ./cleanContainer.sh

## 16) Keyra upp Chrome og slá inn slóðina á public key

    52.213.251.37
