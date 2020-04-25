import React from 'react';
import { Helmet } from 'react-helmet';
import { Grid, Box, Text } from 'grommet';
import CurrentSessions from '../../components/CurrentSessions/CurrentSessions';


const Home = () => (
  <>
    <Helmet>
      <title>Scrum Poker Tool</title>
    </Helmet>
    <Grid
      rows={['flex']}
      columns={['small', 'large']}
      gap="small"
      areas={[
        { name: 'current-sessions', start: [0, 0], end: [0, 0] },
        { name: 'create-session', start: [1, 0], end: [1, 0] },
      ]}
    >
      <Box gridArea="current-sessions">
        <Text weight="bold" size="large" alignSelf="center">Active Sessions</Text>
        <CurrentSessions />
      </Box>
      <Box gridArea="create-session" background="accent">
        <h1>Create Session</h1>
      </Box>
    </Grid>
  </>
);

export default Home;
