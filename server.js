const express = require('express');
const graphqlHTTP = require('express-graphql');
const MyGraphQLSchema = require('./MyGraphQLSchema');

const app = express();

app.use(
  '/graphql', graphqlHTTP({
    schema: MyGraphQLSchema,
    graphiql: true,
  }),
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server start on port ${PORT}`));
