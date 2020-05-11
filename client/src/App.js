import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, Movies, TvSeries, Detail, Favorites } from './pages';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './services/graphql';
import { FormEdit } from './components';

const routes = [
  {
    exact: true,
    path: '/',
    children: <Home/>
  },
  {
    path: '/movie-detail/:id/edit',
    children: <FormEdit/>
  },
  // <Route path={`${path}/add`} exact>
  //     <h1>hello</h1>
  // </Route>
  {
    path: '/movie-detail/:id',
    children: <Detail/>
  },
  {
    path: '/tvseries-detail/:id',
    children: <Detail/>
  },
  {
    path: '/movies',
    children: <Movies/>
  },
  {
    // exact: true,
    path: '/tvseries',
    children: <TvSeries/>
  },
  {
    // exact: true,
    path: '/favorites',
    children: <Favorites/>
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
            <AppRouter/>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
