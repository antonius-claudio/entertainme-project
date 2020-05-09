import React from 'react';
import { Nav } from './components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, Movies, TvSeries } from './pages';

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
      <Router>
        <Nav/>
        <div className="container">
          <AppRouter />
        </div>
      </Router>
    </>
  );
}

export default App;
