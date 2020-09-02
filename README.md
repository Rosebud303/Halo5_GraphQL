# Halo 5 GraphQL

## About
Halo 5 GraphQL is a frontend web application created using a Node.js runtime environment with React and Redux libraries and developed by a pair of developers from the Turing School. Deployment to production at [solarizer.herokuapp.com](http://solarizer.herokuapp.com/) is handled using a continuous integration workflow with Travis-CI.

This application allows for users to 

## Prerequisites
* Node.js 12.18.1

## Setup Local Server (site is deployed with link above for easier access)
1. Clone this repository: `git clone https://github.com/Rosebud303/Halo5_GraphQL.git`
2. Install outer package dependencies: `npm install`
3. Enter the local directory: `cd client`
4. Install package dependencies: `npm install`
5. Launch server: `npm run dev`
6. Visit [localhost:3000](localhost:3000) to view the application in your browser

## Walkthrough
 1. Visit the production or localhost application and enter your address and click Begin  
 ![Home page]()
 2. Enter a hypothetical solar array configuration. Commonly-encountered settings are suggested through the use of placeholder text in each input field, and then click Submit  
 ![Configure page]()
 3. (Optional) Enter historical energy usage for the past twelve months (tip: check your utility bill history). If this information is not available, click Skip, otherwise click Submit.  
 ![Historical page]()
 4. Results are displayed in a table.  
 ![Results page]()
 5. Click on "Graph It" to view the same data in charts.  
 ![Charts page]()
 6. The FAQ is available from the home page by clicking "What is Solarizer?"
 ![FAQ]()

## Backend & Storage
Halo 5 GraphQL's frontend is supported by multiple endpoints developed and structured in the GraphQL backend created for this application.  

