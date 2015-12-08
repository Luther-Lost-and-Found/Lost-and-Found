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
password VARCHAR(128) NOT NULL,
locationID INT NOT NULL,
first_name VARCHAR(20) NOT NULL, 
last_name VARCHAR(30) NOT NULL,
email VARCHAR(50) NOT NULL,
FOREIGN KEY (locationID) REFERENCES LocationLF(locationID))
engine=InnoDB;

CREATE TABLE ItemLF (itemID INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
time_stamp DATE NOT NULL,
title VARCHAR(50) NOT NULL,
imageID INT,
tags VARCHAR(20),
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
	tag VARCHAR(15) NOT NULL,	
	FULLTEXT(tag),
	FOREIGN KEY (itemID) REFERENCES ItemLF (itemID), 
	FOREIGN KEY (tag) REFERENCES Tags (tag),
	PRIMARY KEY (itemID, tag)
	)
engine=MyISAM;

INSERT INTO LocationLF (locationID,phonenumber,email,building_name,room_name)
VALUES (1,"111-1111","awesome@location.edu","Miller","418");

INSERT INTO LocationLF (locationID,phonenumber,email,building_name,room_name)
VALUES (2,"111-1111","awesome2@location.edu","Olin","200");

INSERT INTO LocationLF (locationID,phonenumber,email,building_name,room_name)
VALUES (3,"111-1111","awesome3@location.edu","Valders","10");


INSERT INTO AdminLF (norsekeyID,password,locationID,first_name,last_name,email)
VALUES ("111111", "$2a$10$z4tbDtxmQaK2004UcE/Fqu9DsqVkQBs1ol7nnP.VdogYJ0B9aKBqG", 2, "Ales", "Sparrow", "super@senior.edu");

INSERT INTO AdminLF (norsekeyID,password,locationID,first_name,last_name,email)
VALUES ("111112", "$2a$10$20cgX0UkoBJr3cac1eJi4ey9SU/LXaa5qjawZFYNa9PFI0w8C4bp2", 1, "Miriam", "Harries", "hello@adele.edu");

INSERT INTO AdminLF (norsekeyID,password,locationID,first_name,last_name,email)
VALUES ("111113", "$2a$10$V2pfZRnZmI1DK5.IX4mIAOI7k572seZLOrm68TLIEW1xBrn.mo//e", 3, "Jessica", "Tan", "yoda@sucks.edu");

INSERT INTO AdminLF (norsekeyID,password,locationID,first_name,last_name,email)
VALUES ("111114", "$2a$10$zK7VmQehbFZ7AQa9I/5KEuhjUSFQluu3YElPuJmhCF5m4mm52i0Km", 1, "Kirby", "Olson", "fresh@prince.edu");

INSERT INTO AdminLF (norsekeyID,password,locationID,first_name,last_name,email)
VALUES ("111115", "$2a$10$bc7qhIYLq7pZNAW/XWwwGeuecEW3KfYTY7UjZTF1hsNQnM8QPQpnW", 2, "Sergei", "Hanka", "jarjar@binks.edu");


INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by)
VALUES (1,CURDATE(),"Bag","Blue",1,"111111");

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by,itemColor)
VALUES (2,CURDATE(),"Bottle",1,"111111","black");

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by)
VALUES (3,CURDATE(),"Wallet",1,"111111");

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by)
VALUES (4,CURDATE(),"Pajama",1,"111111");

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by,itemColor)
VALUES (5,CURDATE(),"Palmer",1,"111111","white");

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by)
VALUES (6,CURDATE(),"Kylie",1,"111111");

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by)
VALUES (7,CURDATE(),"Wires",1,"111111");

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by,itemColor)
VALUES (8,CURDATE(),"Doggie",1,"111111","green");

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by)
VALUES (9,CURDATE(),"Consciousness",1,"111111");

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by)
VALUES (10,CURDATE(),"Textbook",1,"111111");

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by)
VALUES (11,CURDATE(),"Launch",1,"111111");

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by)
VALUES (12,CURDATE(),"Coat",1,"111111");

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by,itemColor)
VALUES (13,CURDATE(),"Marker",1,"111111","blue");

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by)
VALUES (14,CURDATE(),"Charger",1,"111111");

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by)
VALUES (15,CURDATE(),"Phone",1,"111111");

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by)
VALUES (16,CURDATE(),"Game",1,"111111");

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by,itemColor)
VALUES (17,CURDATE(),"test",2,"111112","purple");

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by)
VALUES (18,CURDATE(),"cat",2,"111113");

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by)
VALUES (19,CURDATE(),"Bottle",2,"111111");

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by,itemColor)
VALUES (20,CURDATE(),"jeans",2,"111112","brown");

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by)
VALUES (21,CURDATE(),"Pajama",1,"111111");

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by)
VALUES (22,CURDATE(),"computer",3,"111111");

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by)
VALUES (23,CURDATE(),"sweater",3,"111112");

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by,itemColor)
VALUES (24,CURDATE(),"hammer",3,"111112","orange");

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by)
VALUES (25,CURDATE(),"hat",3,"111113");

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by)
VALUES (26,CURDATE(),"beard",3,"111111");


source allTags.sql


INSERT INTO ItemTags (itemID, tag) VALUES (1, "Black");

INSERT INTO ItemTags (itemID, tag) VALUES (2, "Blue");

INSERT INTO ItemTags (itemID, tag) VALUES (3, "Brown");

INSERT INTO ItemTags (itemID, tag) VALUES (4, "Gray");

INSERT INTO ItemTags (itemID, tag) VALUES (5, "Black");

INSERT INTO ItemTags (itemID, tag) VALUES (6, "Blue");

INSERT INTO ItemTags (itemID, tag) VALUES (7, "Brown");

INSERT INTO ItemTags (itemID, tag) VALUES (8, "Gray");

INSERT INTO ItemTags (itemID, tag) VALUES (9, "Black");

INSERT INTO ItemTags (itemID, tag) VALUES (10, "Blue");

INSERT INTO ItemTags (itemID, tag) VALUES (11, "Brown");

INSERT INTO ItemTags (itemID, tag) VALUES (12, "Gray");

INSERT INTO ItemTags (itemID, tag) VALUES (13, "Black");

INSERT INTO ItemTags (itemID, tag) VALUES (14, "Blue");

INSERT INTO ItemTags (itemID, tag) VALUES (15, "Brown");

INSERT INTO ItemTags (itemID, tag) VALUES (16, "Gray");
