const express = require('express');
const bodyParser = require('body-parser');
const graphQLHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQLSchema = require('./graphql/schema/index');
const graphQLResolvers = require('./graphql/resolvers/index');

const app = express();

app.use(bodyParser.json());

app.use(
    '/graphql',
    graphQLHttp({
        schema: graphQLSchema,
        rootValue: graphQLResolvers,
        graphiql: true
    })
);

//mongodb+srv://sharebits:sharebits@cluster0-ebi7i.mongodb.net/de?retryWrites=true&w=majority

mongoose.connect(`mongodb+srv://sharebits:sharebits@cluster0-ebi7i.mongodb.net/sharebitsdb?retryWrites=true&w=majority`
).then(() => {
    app.listen(8099);
}).catch(err => {
    console.log(err);
});
