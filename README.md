# Halo 5 GraphQL [![Build Status](https://travis-ci.org/PaulDebevec/solarizer.svg?branch=master)](https://travis-ci.org/PaulDebevec/solarizer)

## About
Halo 5 GraphQL is a frontend web application created using a Node.js runtime environment with React and Redux libraries and developed by a pair of developers from the Turing School. Deployment to production at [solarizer.herokuapp.com](http://solarizer.herokuapp.com/) is handled using a continuous integration workflow with Travis-CI.

This application allows for users to 

## Prerequisites
* Node.js 12.18.1

## Setup Local Server
1. Clone this repository: `git clone https://github.com/Rosebud303/Halo5_GraphQL.git`
2. Enter the local directory: `cd client`
3. Install package dependencies: `npm install`
4. Run test suite: `npm test` then `a` to run all tests
4. Launch server: `npm run dev`
5. Visit [localhost:3000](localhost:3000) to view the application in your browser

## Walkthrough
 1. Visit the production or localhost application and enter your address and click Begin  
 ![Home page](https://i.imgur.com/nVWbPtD.png)
 2. Enter a hypothetical solar array configuration. Commonly-encountered settings are suggested through the use of placeholder text in each input field, and then click Submit  
 ![Configure page](https://i.imgur.com/J14h8zM.png)
 3. (Optional) Enter historical energy usage for the past twelve months (tip: check your utility bill history). If this information is not available, click Skip, otherwise click Submit.  
 ![Historical page](https://i.imgur.com/Dkyl1Tp.png)
 4. Results are displayed in a table.  
 ![Results page](https://i.imgur.com/V243QrD.png)
 5. Click on "Graph It" to view the same data in charts.  
 ![Charts page](https://i.imgur.com/yJIusmW.png)
 6. The FAQ is available from the home page by clicking "What is Solarizer?"
 ![FAQ](https://i.imgur.com/ayKYh9D.png)

## Backend
Halo 5 GraphQL's frontend is supported by multiple endpoints developed and structured in the GraphQL backend created for this application.  

## Contributors
* [Jeremy Poulter](https://github.com/J-Poulter) (frontend & backend)
* [Duy Vu](https://github.com/Rosebud303) (frontend & backend)

## Acknowledgements
This project was made possible by the collection and publication of Halo 5 statistics, metadata, and profile data by 343 Industries ([343 Industries](https://developer.haloapi.com/))
