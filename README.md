## MaltQuest!

# What is this app?
MaltQuest is an app that allows users to manage homebrewing recipes and ingredients.

# What technologies does MaltQuest use?
MaltQuest is a project that is split into two repositories, the app and the server. The server can be found at: https://github.com/jhlindell/MaltQuest-server

The app uses React as a front end framework. The project was scaffolded using create-react-app. Redux and Thunk are used for state management. For layout and styling, Bootstrap, via the Reactstrap package, flexbox and css are used.

The server uses Node and Express to run the server. The data layer is comprised of Mongo using Mongoose for an ORM and for database access. Faker.js is used to fake the data sets.

#Running the application
Clone both this repository and the above linked MaltQuest-server repository. For the server, you must have MongoDB running locally. use npm install or yarn install to install dependencies. 

Use npm start or yarn start in the server repository to get the server running. Once it is up and running, the data must be initialized. The server runs on localhost:/8000. Using either a browser or Postman, hit the route: localhost:/8000/api/seed_ingredients. Upon success message, follow it up with: localhost:/8000/api/seed_recipes. The ingredients must be run first, as the recipes seed depends on the database to populate ingredients properly.

In the app repository, run npm install or yarn install to install dependencies. Npm start or yarn start gets the project up and running. The app runs on localhost:/3000