import React from 'react';
import { Helmet } from 'react-helmet';
import { Box, Grid, Text } from 'grommet';
import { LaughBeam } from '@styled-icons/fa-regular';
import styled from 'styled-components';
import { Colors } from '../../theme/theme';

const StyledText = styled(Text)`
  text-align: center;
  font-size: 24px;
  margin-top: 5%;
  color: ${Colors.accent}
`;

const History = () => (
  <>
    <Helmet>
      <title>History</title>
    </Helmet>
    <Grid
      areas={[
        { name: 'main', start: [0, 0], end: [2, 0] },
        { name: 'icon', start: [0, 1], end: [2, 1] },
      ]}
      columns={['flex', 'flex', 'flex']}
      rows={['small', 'small']}
      alignContent="center"
    >
      <Box gridArea="main">
        <LaughBeam color={Colors.brand} />
      </Box>
      <Box gridArea="icon">
        <StyledText>
          This feature is still under development.
        </StyledText>
      </Box>
    </Grid>
  </>
);

export default History;
