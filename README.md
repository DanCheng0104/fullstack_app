# Water Data Visualization Tool
This project is to display water data in an interactive map. This app is built with react as frontend, nodejs+express+postgres as backend.

## Getting Started
in order to run this in your local, you will need to have the following software installed in your local machine: nodejs, postgres with postgis extension

### Setting up in your local
1. cd to your local where you want to copy the repo
2. running this command
```
git clone https://github.com/DanCheng0104/fullstack_app.git
```
3. cd to fullstack_app and run this command (install package.json on the server side)
```
npm install
```
5. cd to client folder and run this command (install package.json on the client side )
```
npm install
```
6. get data into local postgres database, type cmd to open terminal in your local windows machine, cd to the bin directory where your local postgresl is located, and run following command, (I will upload the shapefile to github later so you can download it to your local)
```
shp2pgsql -s 4326 "shapefile path in your local" tablename | psql -h localhost -d database -U username
```
you will be asked to type your pwd after this command

7. in query.js, commented out production connection (production connection will connect to postgres database on heroku)

8. in your git bash, cd to fullstack_app folder and type npm start
9. open another git bash (or in your vscode terminal), cd to client folder, type npm start
10. if no errors show up in step 8 and step 9, open your browser and type localhost:3000, everything should work

### Setting up database in heroku (one time setup, im just writing notes here for future projects)
create a postgres addon in existing heroku app in heroku site (you can use commandline as well), im choosing hobby-dev plan, it is a free plan but it has limitations (20 connections and 10,000 rows)

in the settings tab of postgres addon, database credentials info are there, so i can use to import data to heroku postgres database.

### import data to heroku postgres database
1. create postgis extensions: cd to bin directory where postgresql is installed in my local, and running the following command using database credentials to log into db
```
psql -h hostName -U user databaseName
```
again, you will be asked to type your pwd.

2. type the following command to create postgis extension which is for spatial data
```
create extension postgis
```

3. open another terminal and cd to bin directory of postgresql installation directory and type such command to import shapefile to heroku postgres database
```
shp2pgsql -s 4326 "shapefile path in your local" tablename | psql -h host -d database -U username
```

## Deployment

remember to comment out local connections in query.js in order to get the app connected to heroku db
1. heroku login (heroku create if not remote heroku repo is created)
2. git add .
3. git commit -m "commit msg"
4. git pull
5. git push
6. git push heroku master 
