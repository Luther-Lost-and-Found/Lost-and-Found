#! /bin/bash

# make a python virtual environment with
# the requirements for the flask server
#virtualenv -p $(which python2.7) venv
#source venv/bin/activate
#pip2 install -r requirements.txt

# create the user for nginx
#sudo useradd www-data

# setup the nginx configuration file
sudo mkdir -p /etc/nginx/sites-availiable /etc/nginx/sites-enabled
sudo cp nginx/conf/nginx.conf /etc/nginx/nginx.conf
sudo cp nginx/conf/lost-and-found.conf /etc/nginx/sites-availiable
sudo rm /etc/nginx/sites-enabled/default
sudo ln /etc/nginx/sites-availiable/lost-and-found.conf /etc/nginx/sites-enabled/lost-and-found

# make a directory to serve static content from
sudo mkdir -p /var/www/static
# move the static content to the proper directory
sudo cp -r public/* /var/www/static

# front-end dependencies
bower install
sudo mkdir -p /var/www/lib
sudo cp -r bower_components/* /var/www/lib

