# KYC_Service_React

Instructions to setup the webapp:
1. Go into the uploads folder and decompress the two zip files in there. Take the .txt and .xml files from each and place them in the uploads folder.
2. Install MariaDB and create a database. You will also need to create a database user with access to all sql functions.
3. Open up the fileParser.js file and put the correct user, password and database name info into the createMariadbConnectionPool function at the top of the file.
4. Go back to MariaDB and run the "all fsrv tables build file.sql", "all fsrv enum tables build file.sql" and "all fundata tables build file" in that order due to
inter-table dependencies.
5. Make sure MariaDB is running in the background as a service so that it is accessible.
6. Open up a terminal with the active directory set to the root directory of the repository.
7. You will need to install the following libraries using npm which is included with Node.js:  
"@babel/cli": "^7.12.1",  
"@babel/core": "^7.12.3",  
"@babel/preset-react": "^7.12.5",  
"express": "^4.17.1",  
"express-fileupload": "^1.2.0",  
"mariadb": "^2.5.1",  
"xml2js": "^0.4.23"  
8. Run the command "node fileParser.js". This command will take a while as it populates the database tables.
9. Once #8 finishes, run the command "node mainFile.js". The terminal will show "Listening on port 3000 or whatever port"
10. You should now be able to visit locahost:3000 or localhost:whatever port and see the webapp
