USE lost

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