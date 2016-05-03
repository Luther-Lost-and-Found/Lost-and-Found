#! /bin/bash

# setup the nginx configuration file
sudo mkdir -p /etc/nginx/sites-availiable /etc/nginx/sites-enabled
sudo cp nginx/conf/nginx.conf /etc/nginx/nginx.conf
sudo cp nginx/conf/lost-and-found.conf /etc/nginx/sites-availiable
sudo rm /etc/nginx/sites-enabled/default
sudo ln /etc/nginx/sites-availiable/lost-and-found.conf /etc/nginx/sites-enabled/lost-and-found

# front-end dependencies
bower install

# make a directory to serve static content from
sudo mkdir -p /var/www/static
# move the static content to the proper directory
sudo cp -r public/* /var/www/static
sudo mv /var/www/static/lib /var/www/lib


