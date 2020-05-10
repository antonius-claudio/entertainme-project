import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, Movies, TvSeries } from './pages';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './services/graphql';

const routes = [
  {
    exact: true,
    path: '/',
    children: <Home/>
  },
  {
    path: '/movies',
    children: <Movies/>
  },
  {
    path: '/tvseries',
    children: <TvSeries/>
  }
];

export const AppRouter = () => (
  <Switch>
    {routes.map((route) => <Route key={route} {...route} />)}
  </Switch>
);

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
            <AppRouter />
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
