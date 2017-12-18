# Web [![Build Status](https://travis-ci.org/vrpg/web.svg?branch=master)](https://travis-ci.org/vrpg/web)

!!! WORK IN PROGRESS !!!

VRPG/Web is the client side of the VRPG project

## Development requirements
- nodeJS, npm (https://nodejs.org/en/)
- Visual Studio Code is used as an IDE (https://code.visualstudio.com/)

## How to start development
- Installation

  1.  install npm
  2.  [optional | windows] add npm to the classpath

- Run the following commands (inside terminal) in the project folder in the following order:

  1.  npm install
  2.  npm run start (for development, running server is needed locally)
  3.  [optional] npm run start:prod (after this the project can be tested with remote server)

- Compile protobuff

  1. npm run pbjs
  2. npm run pbts

- Now the project can be tested by opening http://localhost:3000/

Contact:
gyorgy.bucsek@gmail.com
