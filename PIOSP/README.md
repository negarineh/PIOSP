## Development

This project have written in Node.js and using MongoDB as database <br>
Client side code included in this project in 'front-end' directory 

## Requirements

For running this app, you need to install Node.js from: https://nodejs.org/en/download/ <br>
In addition, you need to install MongoDB from here: https://www.mongodb.com/download-center#atlas <br>
You can use any text editor for editing code but we used Visual Studio Code for writing this project: <br>
 https://code.visualstudio.com/download

## Running Server Side

First you need to install dependencies:

### `npm install`

In the project directory, you can run:

### `node bin\www.js`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) in the browser.<br>
All routes are available in 'app/routes' directory and can test through Postman(https://www.getpostman.com/apps)

## Running Client Side

In the 'front-end' directory, you can run:

/* installing dependencies */
### `npm install`

/* running App */
### `npm start`

Because server is running in port 3000 your client side will run in port 3001: <br>

Open [http://localhost:3001/mainpage](http://localhost:300/mainpage) to view it in the browser. <br>

/* check App.js in 'front-end' directory for other routes <br>
/* route '/page3' will show functionality of admin part
