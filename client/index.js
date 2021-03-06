import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute} from 'react-router';
import ApolloClient from 'apollo-client';  
import {ApolloProvider} from 'react-apollo'; 
   
import App from './components/App';   
import Weather from './components/Weather';

const client = new ApolloClient({
    dataIdFromObject: o => o.id   
  });    

  const Root = () => {
    return (
      <ApolloProvider client={client}>
        <Router history={hashHistory}>
          <Route component={App} path="/">
            <IndexRoute component={Weather}/> 
          </Route> 
        </Router> 
      </ApolloProvider>
    );     
  };

ReactDOM.render(
    <Root />,
    document.querySelector('#root')
  );