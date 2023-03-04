# employee-tracker
## Description
This will allow you to run specific queries from the CLI to query and manipulate the Database using Node.JS

## Table of Contents 

  - [Installation](#installation)
  - [Usage](#usage)
  - [Features](#features)
  - [Technologies used](#technologies-used)


## Installation
  1. Install Node.js https://nodejs.org/dist/v16.8.0/node-v16.8.0-x64.msi 
  2. Clone the data from this git repository 
  3. Install NPM https://docs.npmjs.com/cli/v6/configuring-npm/install 
  5. Install and Configure MySQL https://dev.mysql.com/downloads/installer/
  6. Rename .env.EXAMPLE to .env and configure with your DB Credentials
  7. Navigate to the git repo using your preferred CommandLine Application (Recommended GitBash or Inline Terminal within VSCode)
  8. cd db/ and run 'mysql -u root -p' and enter DataBase Password
  9. run 'source schema.sql' then 'source seeds.sql'
  10. run 'npm i' 
  11 run 'npm start'
  
## Usage
This application is intended to be used for you to have the ability to SELECT, INSERT, UPDATE, and DELETE information in the Employees Database 

## Features
Add, remove, and update - Add, remove, or update employees, roles, and departments.
View employees - View employees collectively, by manager, or by department

## Technologies Used
Node
Mysql

## Contributing
GitHub contributors
This project is not currently seeking contributions