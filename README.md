**More-Recipes**

A Recipe management and sharing app with great features!

**Features**

Signup and Login
Create (and modify) Recipes
View recipes
Post reviews on recipes
Add recipes as (Favorite)
Upvote or downvote recipes
View User profile
Templates

For this version, all html files and stylesheets, images, materialize are stored into the template directory

**Client**

**Server**

This directory holds all routes, controllers, middleware, migrations

**Testing**

install POSTMAN app
run npm start then navigate to localhost:8000 on POSTMAN
**Deployment**

**Built With**

ExpressJs - The web framework used
Sequelize - The ORM used
Postgres - Database Used
NPM - Dependency Management
API Routes

[Signup] - POST http://localhost:8000/api/v1/users/signup
[Signin] - POST http://localhost:8000/api/v1/users/signin
[Create Recipe] - POST http://localhost:8000/api/v1/recipes
[Modify Recipe] - PUT http://localhost:8000/api/v1/recipes/:recipeId
[Delete Recipe] - DELETE http://localhost:8000/api/v1/recipes/:recipeId
[Fetch All Recipes] - GET http://localhost:3000/api/v1/recipes
[Fetch Recipes by Most Upvotes] - GET http://localhost:3000/api/v1/recipes?sort=upvotes&order=ascending
[Fetch My Recipes] - GET http://localhost:3000/api/v1/users/myRecipes
[Post Recipe Review] - POST http://localhost:3000/api/v1/recipes/:recipeId/reviews
[Fetch Recipe Reviews] - GET http://localhost:3000/api/v1/recipes/:recipeId/reviews

**Versioning**

I used Git for versioning. For the versions available, see the tags on this repository.

**Getting Started**

git clone https://github.com/larrystone/BC-26-More-Recipes.git
Run npm install to install all packages
Run sequelize db:migrate to run pending migrations
Run npm start to start application
type localhost:8000 in browser to access application
Available Scripts

In the project directory, you can run:

npm start

Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

npm start:dev

Starts app with nodemon watcher. Restarts app when changes are made to the source code

npm test

Launches the test runner in the interactive watch mode.

npm run coveralls

Launches the interactive test runner and display test coverage reports

**Author**

Nouwatin Jacobb (Sansaristic) -Aspiring Software Dev.
**License**

This project is licensed under the Apache License - see the LICENSE file for details

**Acknowledgments**

Google Material Icons
Materialise CSS
Jquery
Google Graph API