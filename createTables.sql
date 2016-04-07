DROP DATABASE lost;

DROP USER senior;

CREATE USER senior IDENTIFIED BY 'qwerty';
GRANT ALL PRIVILEGES ON *.* TO senior;
FLUSH PRIVILEGES;

CREATE DATABASE lost;

USE lost;

CREATE TABLE LocationLF (locationID INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
phonenumber VARCHAR(20) NOT NULL,
email VARCHAR(50) NOT NULL,
building_name VARCHAR(20) NOT NULL, 
room_name VARCHAR(30) NOT NULL)
engine=InnoDB;

CREATE TABLE AdminLF (norsekeyID varchar(30) NOT NULL PRIMARY KEY, 
password VARCHAR(128) NOT NULL,
locationID INT NOT NULL,
first_name VARCHAR(20) NOT NULL, 
last_name VARCHAR(30) NOT NULL,
email VARCHAR(50) NOT NULL,

viewOnlyCurrentLocation BOOL,
sortBy VARCHAR(50),
size INT,

FOREIGN KEY (locationID) REFERENCES LocationLF(locationID))
engine=InnoDB;

CREATE TABLE ItemLF (itemID INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
time_stamp DATE NOT NULL,
title VARCHAR(50) NOT NULL,
imageID INT,
tags VARCHAR(30), 
locationID INT NOT NULL, 
accepted_by VARCHAR(30) NOT NULL, 
claimed_by VARCHAR(30),
claimed VARCHAR(5) NOT NULL,
imagePrimColor VARCHAR(20),
imageSecColor VARCHAR(20),
imageThirdColor VARCHAR(20),
FULLTEXT (title,tags),
FOREIGN KEY (locationID) REFERENCES LocationLF(locationID),
FOREIGN KEY (accepted_by) REFERENCES AdminLF(norsekeyID))
ENGINE=MyISAM;

-- CREATE TABLE TagCategories(category VARCHAR(50) NOT NULL PRIMARY KEY
-- )
-- engine=MyISAM;

CREATE TABLE Tags (tag VARCHAR(15) NOT NULL PRIMARY KEY,
	category VARCHAR(50) NOT NULL
)
engine=MyISAM;

CREATE TABLE ItemTags (
	itemID INT NOT NULL,
	tag VARCHAR(15) NOT NULL,
	FOREIGN KEY (itemID) REFERENCES ItemLF (itemID), 
	FOREIGN KEY (tag) REFERENCES Tags (tag),
	PRIMARY KEY (itemID, tag)
	)
engine=MyISAM;