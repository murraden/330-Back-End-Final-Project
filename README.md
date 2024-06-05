# 330-Back-End-Final-Project

README

Submission Status Upadte -

At this point my vision is more or less completed. Everything that i had invisioned origionaly when thinking up this project has been completed and is fully functional. I would love to find the time to make a front end for this project and to figure out a few quirks that just didnt make sense to me on the back end. For instance why the \_id of a recipe is forced to be a 24 character string, and why when you search for a \_id that is anything other than a 24 character string the error handler does not function properly and you get a 500 error.

Another thing that i discovered along the way and that made my work very challenging is that data within a test file can be mutated (i think, at least thats my best discription for whatw as happening) while it works its way through the test file. Thats why in my test file and throught my code you will find a LOT of console.log statements, and some tests using global data and other tests using data created within the test. Those were all added while i was trying to debug my tests/code and figure out why it was not functioning as intended. What i found is that for the most part my code was correct and the issue lied within my test file and the created data being passed into each test getting mutated somehow before reaching specific tests. To fix this i had to switch the hook i was using for creating test data. I was origionaly using the beforeAll hook to create my test data, and only after i isolated one of the failing tests and ran it individualy was i able to realize that it did pass, and changed my beforeAll hook to beforeEach, creating new data before each test ran and then my failing tests all passed.

I also struggeled with simple errors and not being able to easily catch those errors. Capitial letters, plurls and non plurals were hidden within my code forcing errors that were not easy to track down. at one point i was importing my Recipe model into one of my dao files as "recipe" and not "Recipe". With that i was able to have a valueable learning moment where i noticed that VScode upon a succesful model import will change the color of the text to the light green/teal color and then use that color throughtout the files.

Perhaps learning and using Type Script would help catch some of those errors along the way and save me some time in the long haul.

All and all with this project i had some very high highs and some very low lows, and i really learned a lot along the way. I am proud of the fully functioning API that i have built and of everything i have learned throught this course. The first few weeks of this course i had it in my mind that i was not going to enjoy back end programing, but by the end of this project i realized that i enjoy it just as much as front end. It is just as challenging and just as rewarding!

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
