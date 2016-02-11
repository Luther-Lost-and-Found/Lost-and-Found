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

Lost and Found Application: 
Sergei, Miriam, Kirby, Ales, Jessica

meeting times @ Olin 351:

Tuesdays: 2:30pm - 4pm
Thursdays: 12:45pm - 2:15pm

Having met last semester’s requirements, this semester we plan on refining our application by doing the following.

Replace Bootstrap with Angular Material
Put application on permanent server
Set administrators up with application to get feedback
Implement the migration of items
Set up site-specific elements (displaying items based on admin’s default location, etc.)
Item expiration date
Switch over to using Python (Flask) and nginx for static files (uWSGI to connect nginx with Flask for API)
Active Directory integration?
refining search engine:
refining tagging system
search by tags
advanced search functionality (colors and other options)
perhaps consider using actual search libraries
refining user interface (html, css, etc…) 
HAVE FUN!
