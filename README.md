# Lost-and-Found

[![Join the chat at https://gitter.im/Luther-Lost-and-Found/Lost-and-Found](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/Luther-Lost-and-Found/Lost-and-Found?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
Senior project

Database:
- using mysql: 
   task: get the mysql client on computer
- general architecture
   tables: Administrator, Item, Location.
   Administrator:
      attributes: norsekey(primary key), password, location, first name, last name, email
   Location:
      attributes: locationID (primary key), email, phone number,buildingName, room Name
   Item:
      attributes: itemID, date, title, tags, (photo), location held , notes, claimed by, found by,claimed
 
RELATIONS:
   Location to admin: one to many, admin to item: one to many, location to item: one to many.
