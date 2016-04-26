USE lost

-- CREATE TABLE AdminLF (norsekeyID varchar(30) NOT NULL PRIMARY KEY, 
-- show_all_items BOOL NOT NULL,
-- sorting VARCHAR(15),
-- gridSize INT NOT NULL,
-- password VARCHAR(128) NOT NULL,
-- locationID INT NOT NULL,
-- first_name VARCHAR(20) NOT NULL, 
-- last_name VARCHAR(30) NOT NULL,
-- email VARCHAR(50) NOT NULL,
-- FOREIGN KEY (locationID) REFERENCES LocationLF(locationID))
-- engine=InnoDB;

# LocationLF =============================================

INSERT INTO LocationLF (locationID,phonenumber,email,building_name,room_name)
VALUES (1,"111-1111","awesome@location.edu","Miller","418");

INSERT INTO LocationLF (locationID,phonenumber,email,building_name,room_name)
VALUES (2,"111-1111","awesome2@location.edu","Olin","200");

INSERT INTO LocationLF (locationID,phonenumber,email,building_name,room_name)
VALUES (3,"111-1111","awesome3@location.edu","Valders","10");

# AdminLF =============================================

INSERT INTO AdminLF (norsekeyID, allItems, sorting, gridSize, password,locationID,first_name,last_name,email,superPrivilege)
VALUES ("111111", false, "date", 5, "$2a$10$z4tbDtxmQaK2004UcE/Fqu9DsqVkQBs1ol7nnP.VdogYJ0B9aKBqG", 2, "Ales", "Sparrow", "super@senior.edu",true);

INSERT INTO AdminLF (norsekeyID, allItems, sorting, gridSize, password,locationID,first_name,last_name,email, superPrivilege)
VALUES ("111112", false, "date", 5, "$2a$10$20cgX0UkoBJr3cac1eJi4ey9SU/LXaa5qjawZFYNa9PFI0w8C4bp2", 1, "Miriam", "Harries", "hello@adele.edu", true);

INSERT INTO AdminLF (norsekeyID, allItems, sorting, gridSize, password,locationID,first_name,last_name,email)
VALUES ("111113", false, "date", 5, "$2a$10$V2pfZRnZmI1DK5.IX4mIAOI7k572seZLOrm68TLIEW1xBrn.mo//e", 3, "Jessica", "Tan", "yoda@sucks.edu");

INSERT INTO AdminLF (norsekeyID, allItems, sorting, gridSize, password,locationID,first_name,last_name,email)
VALUES ("111114", false, "date", 5, "$2a$10$zK7VmQehbFZ7AQa9I/5KEuhjUSFQluu3YElPuJmhCF5m4mm52i0Km", 1, "Kirby", "Olson", "fresh@prince.edu");

INSERT INTO AdminLF (norsekeyID, allItems, sorting, gridSize, password,locationID,first_name,last_name,email,superPrivilege)
VALUES ("111115", false, "date", 5, "$2a$10$bc7qhIYLq7pZNAW/XWwwGeuecEW3KfYTY7UjZTF1hsNQnM8QPQpnW", 2, "Sergei", "Hanka", "jarjar@binks.edu", true);

# ItemLF =============================================

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by)
VALUES (1,CURDATE(),"Bag",1,"111111");

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by,itemColor)
VALUES (2,CURDATE(),"Bottle",1,"111111","#000000");

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by)
VALUES (3,CURDATE(),"Wallet",1,"111111");

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by)
VALUES (4,CURDATE(),"Pajama",1,"111111");

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by,itemColor)
VALUES (5,CURDATE(),"Palmer",1,"111111","#ffffff");

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by)
VALUES (6,CURDATE(),"Kylie",1,"111111");

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by)
VALUES (7,CURDATE(),"Wires",1,"111111");

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by,itemColor)
VALUES (8,CURDATE(),"Doggie",1,"111111","#00f500");

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by)
VALUES (9,CURDATE(),"Consciousness",1,"111111");

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by)
VALUES (10,CURDATE(),"Textbook",1,"111111");

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by)
VALUES (11,CURDATE(),"Launch",2,"111111");

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by)
VALUES (12,CURDATE(),"Coat",2,"111111");

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by,itemColor)
VALUES (13,CURDATE(),"Marker",1,"111111","#0000a3");

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by)
VALUES (14,CURDATE(),"Charger",1,"111111");

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by)
VALUES (15,CURDATE(),"Phone",1,"111111");

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by)
VALUES (16,CURDATE(),"Game",1,"111111");

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by,itemColor)
VALUES (17,CURDATE(),"test",2,"111112","#5c005c");

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by)
VALUES (18,CURDATE(),"cat",2,"111113");

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by)
VALUES (19,CURDATE(),"Bottle",2,"111111");

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by,itemColor)
VALUES (20,CURDATE(),"jeans",2,"111112","#5c2e00");

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by)
VALUES (21,CURDATE(),"Pajama",1,"111111");

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by)
VALUES (22,CURDATE(),"computer",3,"111111");

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by)
VALUES (23,CURDATE(),"sweater",3,"111112");

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by,itemColor)
VALUES (24,CURDATE(),"hammer",3,"111112","#ffff00");

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by)
VALUES (25,CURDATE(),"hat",3,"111113");

INSERT INTO ItemLF (itemID,time_stamp,title,locationID,accepted_by)
VALUES (26,CURDATE(),"beard",3,"111111");


#====================================================================
#The below must be in this order: insert to tags, insert to itemtags.
#====================================================================

# Tags =============================================

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

# ItemTags =============================================

INSERT INTO ItemTags (itemID, tags) VALUES (1, "Blue@@@Black@@@Brown@@@Gray");
INSERT INTO ItemTags (itemID, tags) VALUES (2, "White@@@Pink@@@Purple@@@Green");
INSERT INTO ItemTags (itemID, tags) VALUES (3, "Blue@@@Black@@@Brown@@@Gray");
INSERT INTO ItemTags (itemID, tags) VALUES (4, "White@@@Pink@@@Purple@@@Green");
INSERT INTO ItemTags (itemID, tags) VALUES (5, "Blue@@@Black@@@Brown@@@Gray");
INSERT INTO ItemTags (itemID, tags) VALUES (6, "White@@@Pink@@@Purple@@@Green");
INSERT INTO ItemTags (itemID, tags) VALUES (7, "Blue@@@Black@@@Brown@@@Gray");
INSERT INTO ItemTags (itemID, tags) VALUES (8, "White@@@Pink@@@Purple@@@Green");
INSERT INTO ItemTags (itemID, tags) VALUES (9,"Blue@@@Black@@@Brown@@@Gray");
INSERT INTO ItemTags (itemID, tags) VALUES (10, "Blue@@@Black@@@Brown@@@Gray");
INSERT INTO ItemTags (itemID, tags) VALUES (11, "White@@@Pink@@@Purple@@@Green");
INSERT INTO ItemTags (itemID, tags) VALUES (12, "Blue@@@Black@@@Brown@@@Gray");
INSERT INTO ItemTags (itemID, tags) VALUES (13, "Blue@@@Black@@@Brown@@@Gray");
INSERT INTO ItemTags (itemID, tags) VALUES (14, "White@@@Pink@@@Brown@@@Gray");
INSERT INTO ItemTags (itemID, tags) VALUES (15, "Blue@@@Black@@@Purple@@@Green");
INSERT INTO ItemTags (itemID, tags) VALUES (16, "Blue@@@Black@@@Purple@@@Green");

