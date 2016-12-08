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

#########TODO COMMENT#####
#TODO ___________fix_________As__________SOON_________AS______________POSSIBLE______________________________
SECURITY_GROUP_ID=$(aws ec2 create-security-group --group-name MySecurityGroup --description "My security group")
SECURITY_GROUP_NAME=$(KarlUser-key-pair-eu-west-1.pem)
INSTANCE_ID=$(aws ec2 run-instances  --user-data file://ec2-instance-init.sh --image-id ami-9398d3e0 --security-group-ids ${SECURITY_GROUP_ID} --count 1 --instance-type t2.micro --key-name ${SECURITY_GROUP_NAME} --query 'Instances[0].InstanceId'  --output=text)

echo ${INSTANCE_ID} > ./ec2_instance/instance-id.txt

scp -o StrictHostKeyChecking=no -i "./ec2_instance/${SECURITY_GROUP_NAME}.pem" ./docker-compose.yaml ec2-user@${INSTANCE_PUBLIC_NAME}:~/docker-compose.yaml
scp -o StrictHostKeyChecking=no -i "./ec2_instance/${SECURITY_GROUP_NAME}.pem" ./docker-compose-and-run.sh ec2-user@${INSTANCE_PUBLIC_NAME}:~/docker-compose-and-run.sh

aws ec2 wait --region eu-west-1 instance-running --instance-ids ${INSTANCE_ID}

yum -y update
yum -y install docker
pip install docker-compose
pip install backports.ssl_match_hostname --upgrade
service docker start
usermod -a -G docker ec2-user
touch ec2-init-done.markerfile

status='unknown'
while [ ! "${status}" == "ok" ]
do
   echo Checking status of host, currently ${status}
   status=$(ssh -i "./ec2_instance/${SECURITY_GROUP_NAME}.pem"  -o StrictHostKeyChecking=no -o BatchMode=yes -o ConnectTimeout=5 ec2-user@${INSTANCE_PUBLIC_NAME} echo ok 2>&1)
   sleep 2
done


ssh -o StrictHostKeyChecking=no -i "./ec2_instance/${SECURITY_GROUP_NAME}.pem" ec2-user@${INSTANCE_PUBLIC_NAME} "cat ~/docker-compose-and-run.sh"
