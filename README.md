# 330-Back-End-Final-Project

README

Status Update

I have written a lot of code so far and i have a lot of bugs and things to sort out. I am having issues getting my DB up and running. I have spent several hours trouble shooting it to no avail. I still need to write Unit tests for all of my code which should help with the debugging issues and get my project up and running and fully functional. As of now i still have a lot of work to do but i feel that i have a good base of code to build from.

Simple Recipe API:

    The project i plan to make will be geared for the cooking enthusiast where users will be able to search for, save and share their favorite recipes. With so many people now having diverse dietary preferences and allergies, users frequently struggle to organize and find recipes that will suit their needs.
    The recipe API will aim to provide a solution to that by offering a platform for users to store, search, update and organize their recipe collection.

The Problem:

    The problem this project seeks to solve is one of recipe organization and accessibility. Every person who has ever picked up a knife or a spatula has delt with the same problem. Not being able to find the recipe they want when they want it. Weather you are an amature chef just trying to make something semi nutricious for yourself on a tuesday night after work, or a top tier cheif working at a fancy resturant we all deal with the same issues. We have recipes scattered across differnt platforms, cookbooks, websites and apps making it challenging to find the spicific recipe you want. Additionally, users may want to discover new recipes based on their dietary prefrences of avaliable ingredients. This recipe management API addresses these Challenges by offering a user-friendly database for organizing and accessing recipes, as well as providing personalized recipe ideas.

Components:

    Routes:

    Authentication routes: /signup, /login, /logout
    Recipe CRUD routes: /recipes, /recipes/:id, /recipes/search
    User profile routes: /profile, /profile/recipes

    Data Models:

    User: username, email, password(hashed)
    Recipe: titel, ingredients, instructions, tags, author, created_at

    Middleware:

    Authentication middleware for verifying user credentials
    Authorization middleware for editing or deleting recipes
    Error handling middlware for responding to invalid requests

    Database:

    MongoDB for storing user profiles and recipe data.

    Dependencies:

    Express.js for routing
    Mongoose for database interaction
    JWT for authentication

Meeting Project Requierments:

    Authentication and Authorization: Implement signup, login, and logout routes with authentication middleware to protect user data.

    CRUD Routes: Develop routes for creating, reading, updating, and deleting recipes.

    Indexes: Use indexes for optimizing recipe searches based on title, ingredients, or tags.

    Text Search: Implement a search route allowing users to search for recipes by keyword or ingredient.

    Testing: Ensure test coverage > 80% by writing unit and integration tests for all routes and middleware.

Proposed Ideal Timeline:

    Week 6: Design database schema and set up project structure.
            Implement authentication routes and middleware.

    Week 7: Develop recipe CRUD routes and integrate with the database.
            Implement search functionality and user profile routes.

    Week 8: Write unit tests for all routes and middleware.
            Test API endpoints and debug any issues.

    Week 9: Document API endpoints and usage.
            Prepare Postman collection for API demonstration.

    Week 10: Finalize project presentation and demo preparation.
