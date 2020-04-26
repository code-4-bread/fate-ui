import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Grommet } from 'grommet';
import styled from 'styled-components';
import theme from './theme/theme';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import History from './pages/History/History';
import Page404 from './pages/Page404/Page404';
import Session from './pages/Session/Session';

const StyledBody = styled('div')`
  @media (min-width: 600px) {
    margin-left: 20%;
    margin-right: 20%
  }
`;

ReactDOM.render(
  // eslint-disable-next-line react/jsx-filename-extension
  <BrowserRouter>
    <Helmet>
      <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
    </Helmet>
    <Grommet theme={theme}>
      <StyledBody>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/history" component={History} />
          <Route exact path="/about" component={About} />
          <Route exact path="/session/:id" component={Session} />
          <Route component={Page404} />
        </Switch>
      </StyledBody>
    </Grommet>
  </BrowserRouter>,
  document.getElementById('root'),
);
