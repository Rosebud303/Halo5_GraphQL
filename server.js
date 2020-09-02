const express = require("express");
const graphqlHTTP = require("express-graphql");
const MyGraphQLSchema = require("./MyGraphQLSchema");
const cors = require("cors");
const path = require('path');

const app = express();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: MyGraphQLSchema,
    graphiql: true,
  })
);

app.use(express.static('public'))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server start on port ${PORT}`));
