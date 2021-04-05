# KYC_Service_React

Instructions to setup the webapp:
1. Go into the uploads folder and decompress the zip file in there. Take the .xml file and place it in the uploads folder.
2. Install MariaDB and create a database. You will also need to create a database user with access to all sql functions.
3. Open up the fileParser.js file and put the correct user, password and database name info into the createMariadbConnectionPool function at the top of the file.
4. Go back to MariaDB and run the "all fsrv tables build file.sql" file then the "all fsrv enum tables build file.sql" file in that order due to
inter-table dependencies.
5. Make sure MariaDB is running in the background as a service so that it is accessible.
6. Open up a terminal with the active directory set to the root directory of the repository.
7. You will need to install the dependency modules using npm which is included with Node.js using the command "npm install"  
8. Run the command "node fileParser.js". This command will take a while as it populates the database tables.
9. Once #8 finishes, run the command "node mainFile.js". The terminal will show "Listening on port 3000 or whatever port"
10. You should now be able to visit locahost:3000 or localhost:whatever port and see the webapp
