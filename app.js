const express = require('express');
const bodyParser = require('body-parser');
const graphQLHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQLSchema = require('./graphql/schema/index');
const graphQLResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Contorl-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if(req.method == 'OPTIONS'){
        return res.sendStatus(200);
    }
    next();
});

app.use(isAuth);

app.use(
    '/graphql',
    graphQLHttp({
        schema: graphQLSchema,
        rootValue: graphQLResolvers,
        graphiql: true
    })
);

//mongodb+srv://sharebits:sharebits@cluster0-ebi7i.mongodb.net/de?retryWrites=true&w=majority

mongoose.connect(`mongodb+srv://sharebits:sharebits@cluster0-ebi7i.mongodb.net/sharebitsdb?retryWrites=true&w=majority`,  { useNewUrlParser: true }
).then(() => {
    app.listen(process.env.PORT || 8099); //|| 8099
}).catch(err => {
    console.log(err);
});
