import React from 'react';
import { Helmet } from 'react-helmet';
import {
  Grid, Box
} from 'grommet';
import MainPanel from '../../components/MainPanel/MainPanel';


const Home = () => {
  return (
    <>
      <Helmet>
        <title>Scrum Poker Tool</title>
      </Helmet>
      <Grid
        rows={['flex']}
        columns={['flex']}
        gap="small"
        areas={[
          { name: 'create-session', start: [0, 0], end: [0, 0] },
        ]}
      >
        <Box gridArea="create-session">
          <MainPanel />
        </Box>
      </Grid>
    </>
  );
};

export default Home;
