#======================================================
#=================	  INSTRUCTIONS	 ==================
#======================================================
#=== from within your project directory containing ====
#===== build.sql enter the mysql database as root =====
#============ and run the following script ============
#======================================================
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
allItems BOOL NOT NULL DEFAULT false,
sorting VARCHAR(15),
gridSize INT NOT NULL DEFAULT 5,
password VARCHAR(128) NOT NULL,
locationID INT NOT NULL,
first_name VARCHAR(20) NOT NULL, 
last_name VARCHAR(30) NOT NULL,
email VARCHAR(50),
superPrivilege BOOL NOT NULL DEFAULT false,
FOREIGN KEY (locationID) REFERENCES LocationLF(locationID))
engine=InnoDB;

CREATE TABLE ItemLF (itemID INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
time_stamp DATE NOT NULL,
title VARCHAR(50) NOT NULL,
imageID INT,
locationID INT NOT NULL, 
accepted_by VARCHAR(30) NOT NULL, 
claimed_by VARCHAR(30),
claimed BOOL NOT NULL DEFAULT false,
imagePrimColor VARCHAR(20),
imageSecColor VARCHAR(20),
imageThirdColor VARCHAR(20),
itemColor VARCHAR(10),
FULLTEXT (title),
FULLTEXT (imagePrimColor,itemColor),
FOREIGN KEY (locationID) REFERENCES LocationLF(locationID),
FOREIGN KEY (accepted_by) REFERENCES AdminLF(norsekeyID))
ENGINE=MyISAM;

CREATE TABLE Tags (tag VARCHAR(15) NOT NULL PRIMARY KEY) 
engine=MyISAM;

CREATE TABLE ItemTags (
	itemID INT NOT NULL,
	tags LONGTEXT,
	FOREIGN KEY (itemID) REFERENCES ItemLF (itemID), 
	PRIMARY KEY (itemID),
	FULLTEXT (tags)
	)
engine=MyISAM;

USE lost;

source locations.sql;

INSERT INTO AdminLF (norsekeyID, allItems, sorting, gridSize, password, locationID, first_name, last_name, email, superPrivilege)
VALUES ("admin", false, "date", 5, "$2a$10$XxZLxg3raFHX/8F1KhnyWeLGSy3.dwzv6IPGUpXlEUm6FjnZ1q5Y6", 2, "Admin", "Super", "super@admin.edu",true);

source functions.sql;

source populateTables.sql;
