import React from 'react';
import { Helmet } from 'react-helmet';
import { Grid, Box, Text } from 'grommet';
import styled from 'styled-components';
import { Frown } from '@styled-icons/fa-regular';
import { Colors } from '../../theme/theme';

const StyledText = styled(Text)`
  text-align: center;
  font-size: 24px;
  margin-top: 5%;
  color: ${Colors.accent}
`;

const Page404 = () => (
  <>
    <Helmet>
      <title>404 Not Found</title>
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
        <Frown color={Colors.brand} />
      </Box>
      <Box gridArea="icon">
        <StyledText>
          404 Page Not Found
        </StyledText>
      </Box>
    </Grid>
  </>
);

export default Page404;
