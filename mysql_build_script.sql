CREATE USER senior;
GRANT ALL PRIVILEGES ON *.* TO senior;
CREATE DATABASE lost;
USE lost;

# Admin Table

CREATE TABLE AdminLF (norsekeyID varchar(30) NOT NULL PRIMARY KEY, 
password VARCHAR(128) NOT NULL,
locationID INT NOT NULL,
first_name VARCHAR(20) NOT NULL, 
last_name VARCHAR(30) NOT NULL,
email VARCHAR(50) NOT NULL,
FOREIGN KEY (locationID) REFERENCES LocationLF(locationID))
engine=InnoDB;

# Location Table

CREATE TABLE LocationLF (locationID INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
phonenumber VARCHAR(20) NOT NULL,
email VARCHAR(50) NOT NULL,
building_name VARCHAR(20) NOT NULL, 
room_name VARCHAR(30) NOT NULL)
engine=InnoDB;

# Item Table

CREATE TABLE ItemLF (itemID INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
time_stamp DATE NOT NULL,
title VARCHAR(50) NOT NULL,
tags VARCHAR(30), 
locationID INT NOT NULL, 
accepted_by VARCHAR(30) NOT NULL, 
claimed_by VARCHAR(30),
claimed VARCHAR(5) NOT NULL,
FOREIGN KEY (locationID) REFERENCES LocationLF(locationID),
FOREIGN KEY (accepted_by) REFERENCES AdminLF(norsekeyID))
engine=InnoDB;

# Image Table

CREATE TABLE ImageLF (imageID INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
image_type VARCHAR(25) NOT NULL DEFAULT '',
image BLOB NOT NULL,
image_size VARCHAR(25) NOT NULL DEFAULT '', 
image_ctgy VARCHAR(25) NOT NULL DEFAULT '',
image_name VARCHAR(50) NOT NULL DEFAULT '')
engine=InnoDB;