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

#====================================================================
#The below must be in this order: insert to tags, insert to itemtags.
#====================================================================

-- INSERT INTO TagCategories (category) VALUES ("color");
-- INSERT INTO TagCategories (category) VALUES ("item");
-- INSERT INTO TagCategories (category) VALUES ("school supply");
-- INSERT INTO TagCategories (category) VALUES ("electronic");
-- INSERT INTO TagCategories (category) VALUES ("clothing");
-- INSERT INTO TagCategories (category) VALUES ("water bottle");
-- INSERT INTO TagCategories (category) VALUES ("other");

-- INSERT INTO Tags (tag) VALUES ("Red", "color");
-- INSERT INTO Tags (tag) VALUES ("Black", "color");
-- INSERT INTO Tags (tag) VALUES ("Green", "color");
-- INSERT INTO Tags (tag) VALUES ("Blue", "color");
-- INSERT INTO Tags (tag) VALUES ("Pink", "color");
-- INSERT INTO Tags (tag) VALUES ("Purple", "color");
-- INSERT INTO Tags (tag) VALUES ("Orange", "color");
-- INSERT INTO Tags (tag) VALUES ("Yellow", "color");
-- INSERT INTO Tags (tag) VALUES ("White", "color");
-- INSERT INTO Tags (tag) VALUES ("Brown", "color");
-- INSERT INTO Tags (tag) VALUES ("Gray", "color");

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

INSERT INTO ItemTags (itemID, tag) VALUES (1, "Black");
INSERT INTO ItemTags (itemID, tag) VALUES (2, "Blue");
INSERT INTO ItemTags (itemID, tag) VALUES (3, "Brown");
INSERT INTO ItemTags (itemID, tag) VALUES (4, "Gray");
INSERT INTO ItemTags (itemID, tag) VALUES (5, "Red");
INSERT INTO ItemTags (itemID, tag) VALUES (6, "Green");
INSERT INTO ItemTags (itemID, tag) VALUES (7, "Pink");
INSERT INTO ItemTags (itemID, tag) VALUES (8, "Purple");
INSERT INTO ItemTags (itemID, tag) VALUES (9, "Orange");
INSERT INTO ItemTags (itemID, tag) VALUES (10, "Blue");
INSERT INTO ItemTags (itemID, tag) VALUES (11, "Yellow");
INSERT INTO ItemTags (itemID, tag) VALUES (12, "Gray");
INSERT INTO ItemTags (itemID, tag) VALUES (13, "Black");
INSERT INTO ItemTags (itemID, tag) VALUES (14, "White");
INSERT INTO ItemTags (itemID, tag) VALUES (15, "Brown");
INSERT INTO ItemTags (itemID, tag) VALUES (16, "Gray");
