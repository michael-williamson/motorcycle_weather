const express = require('express');
const graphql = require('express-graphql');
const axios = require('axios');
const schema = require('./schema/schema');
const bodyParser = require('body-parser');


   
const app = express();    

app.use(bodyParser.json());   
app.use("/graphql", graphql({
    schema: schema,
    graphiql: true
}));   


if(process.env.NODE_ENV !== 'production'){
    const webpackMiddleware = require('webpack-dev-middleware');
    const webpack = require('webpack');
    const webpackConfig = require('./webpack.config.js');
    app.use(webpackMiddleware(webpack(webpackConfig)));
    }else{
      app.use(express.static('dist'));
      app.get('*', (req,res)=> {
        res.sendFile(path.join(__dirname, 'dist/index.html'));
      });
    }

    app.listen(process.env.PORT || 4000, () => {
        console.log('Listening on 4000');
      });