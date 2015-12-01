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

USE lost

INSERT INTO LocationLF (locationID,phonenumber,email,building_name,room_name)
VALUES (1,"111-1111","awesome@location.edu","Miller","418");

INSERT INTO AdminLF (norsekeyID,password,locationID,first_name,last_name,email)
VALUES ("111111", "$2a$10$p1LerZ.GmYkKRHNQS5UPyeZAjhEJ9uFgn2kEmns0mmTsqr/b/5bRi", 1, "Super", "Senior", "super@senior.edu");

INSERT INTO ItemLF (itemID,time_stamp,title,tags,locationID,accepted_by,claimed)
VALUES (1,CURDATE(),"Bag","Blue",1,"111111","False");

INSERT INTO ItemLF (itemID,time_stamp,title,tags,locationID,accepted_by,claimed)
VALUES (2,CURDATE(),"Bottle","Third in a row",1,"111111","False");

INSERT INTO ItemLF (itemID,time_stamp,title,tags,locationID,accepted_by,claimed)
VALUES (3,CURDATE(),"Wallet","Empty",1,"111111","False");

INSERT INTO ItemLF (itemID,time_stamp,title,tags,locationID,accepted_by,claimed)
VALUES (4,CURDATE(),"Pajama","Cozy",1,"111111","False");

INSERT INTO ItemLF (itemID,time_stamp,title,tags,locationID,accepted_by,claimed)
VALUES (5,CURDATE(),"Palmer","Happy",1,"111111","False");

INSERT INTO ItemLF (itemID,time_stamp,title,tags,locationID,accepted_by,claimed)
VALUES (6,CURDATE(),"Kylie","Black",1,"111111","False");

INSERT INTO ItemLF (itemID,time_stamp,title,tags,locationID,accepted_by,claimed)
VALUES (7,CURDATE(),"Wires","Red",1,"111111","False");

INSERT INTO ItemLF (itemID,time_stamp,title,tags,locationID,accepted_by,claimed)
VALUES (8,CURDATE(),"Doggie","Rainbow Colors",1,"111111","False");

INSERT INTO ItemLF (itemID,time_stamp,title,tags,locationID,accepted_by,claimed)
VALUES (9,CURDATE(),"Consciousness","Undefined",1,"111111","False");

INSERT INTO ItemLF (itemID,time_stamp,title,tags,locationID,accepted_by,claimed)
VALUES (10,CURDATE(),"Textbook","With a lot of pictures",1,"111111","False");

INSERT INTO ItemLF (itemID,time_stamp,title,tags,locationID,accepted_by,claimed)
VALUES (11,CURDATE(),"Launch","Rotten",1,"111111","False");

INSERT INTO ItemLF (itemID,time_stamp,title,tags,locationID,accepted_by,claimed)
VALUES (12,CURDATE(),"Coat","Black",1,"111111","False");

INSERT INTO ItemLF (itemID,time_stamp,title,tags,locationID,accepted_by,claimed)
VALUES (13,CURDATE(),"Marker","Family Relic",1,"111111","False");

INSERT INTO ItemLF (itemID,time_stamp,title,tags,locationID,accepted_by,claimed)
VALUES (14,CURDATE(),"Charger","MacBook Pro",1,"111111","False");

INSERT INTO ItemLF (itemID,time_stamp,title,tags,locationID,accepted_by,claimed)
VALUES (15,CURDATE(),"Phone","Keep it",1,"111111","False");

INSERT INTO ItemLF (itemID,time_stamp,title,tags,locationID,accepted_by,claimed)
VALUES (16,CURDATE(),"Game","Very sad",1,"111111","False");

CREATE TABLE Tags (tag VARCHAR(15) NOT NULL PRIMARY KEY) 
engine=MyISAM;

INSERT INTO Tags (tag) VALUES ("Red");

INSERT INTO Tags (tag) VALUES ("Black");

INSERT INTO Tags (tag) VALUES ("Green");

INSERT INTO Tags (tag) VALUES ("Blue");

INSERT INTO Tags (tag) VALUES ("Pink");

INSERT INTO Tags (tag) VALUES ("Purple");

INSERT INTO Tags (tag) VALUES ("Orange");

INSERT INTO Tags (tag) VALUES ("Yellow");

INSERT INTO Tags (tag) VALUES ("White");

INSERT INTO Tags (tag) VALUES ("Brown");

INSERT INTO Tags (tag) VALUES ("Gray");

CREATE TABLE ItemTags (
	itemID INT NOT NULL,
	tag VARCHAR(15) NOT NULL,
	FOREIGN KEY (itemID) REFERENCES ItemLF (itemID), 
	FOREIGN KEY (tag) REFERENCES Tags (tag),
	PRIMARY KEY (itemID, tag)
	)
engine=MyISAM;

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
