# node-ghahvedark
test project for ghahvedark

install modules with

npm install

open config.env file from config folder and enter database username password at mongodb atlas account
or your local username 

you can run this api in development mode with

npm run dev

and for production you can use 

npm start

the seeder.js file can delete all the books and creat all of them with _data folder
and you dont need to insert all of them by hand

for initial books

node seeder.js -i

for delete books
 
node seeder.js -d
