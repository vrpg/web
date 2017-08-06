VR-RPG-Client is the client side of the VR-RPG project

#Development requirements:#
- nodeJS, npm (https://nodejs.org/en/)

#How to start development#
- Visual Studio Code is used as an IDE (https://code.visualstudio.com/)

- Installation

  1.  install npm
  2.  [optional | windows] add npm to the classpath
  3.  install firebase

- [Linux | Ubuntu] For firebase installation follow the following commands

  1. sudo npm install -g firebase-tools
  2. [optional] firebase login

- Run the following commands (inside terminal) in the project folder in the following order:

  1.  npm install
  2.  npm run build:dev (for development, running server is needed locally)

- Now the project can be tested by opening dist/index.html

- For deployment (or test with remote/deployed server) run the following command:

  1. npm run build:prod (after this the project can be tested with remote server)
  2. firebase deploy (this will upload the content of the dist folder)

Contact:
gyorgy.bucsek@gmail.com
