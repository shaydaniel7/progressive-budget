# Online/Offline Budget Tracker
Add functionality to our existing Budget Tracker application to allow for offline access and functionality. The user will be able to add expenses and deposits to their budget with or without a connection. When entering transactions offline, they should populate the total when brought back online.

Offline Functionality:
  * Enter deposits and expenses offline.

When brought back online:
  * Offline entries should be added to tracker.

## User Story
AS AN avid traveller
I WANT to be able to track my withdrawals and deposits with or without a data/internet connection
SO THAT my account balance is accurate when I am traveling

## Business Context
Giving users a fast and easy way to track their money is important, but allowing them to access that information anytime is even more important. Having offline functionality is paramount to our applications success.

## Acceptance Criteria
GIVEN a user is on Budget App without an internet connection
WHEN the user inputs a withdrawal or deposit
THEN that will be shown on the page, and added to their transaction history when their connection is back online.

## Submission on BCS
* Deploy your application with [Heroku and MongoDB Atlas.](../04-Important/MongoAtlas-Deploy.md)
* You are required to submit the following:
  * the URL to the deployed application
  * the URL to the Github repository


## More Notes
Need to use IndexedDB to add offline functionality. Review Module 18: NoSQL, Lesson 4: Add Offline Persistence with IndexedDB.

From 19.4.4:
Service workers do NOT need webpack to work. Because the application is already using webpack, we'll only need to prepend the names of the JavaScript files to cache in the dist/ folder. Other than that, the steps to add a service worker to an application without webpack are the same.

This app  has a server and uses MongoDB as its database, so deploy this application to Heroku using MongoDB Atlas. To review this process, look at Module 18: NoSQL, Lesson 5: Add Mongoose Validation, specifically 18.5.5: Deploy to Heroku.


