import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Grommet } from 'grommet';
import styled from 'styled-components';
import theme from './theme/theme';
import Header from './pages/Header/Header';
import BasePage from './pages/BasePage/BasePage';
import Page404 from './pages/Page404/Page404';

const StyledBody = styled('div')`
  margin-left: 20%;
  margin-right: 20%
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
          <Route exact path="/" component={BasePage} />
          {/* <Route exact location="/history" component={} /> */}
          {/* <Route exact location="/about" component={} /> */}
          <Route component={Page404} />
        </Switch>
      </StyledBody>
    </Grommet>
  </BrowserRouter>,
  document.getElementById('root'),
);
