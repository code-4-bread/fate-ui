import React from 'react';
import {
  Main, Heading, Paragraph, Grid, Box, Button,
} from 'grommet';
import styled from 'styled-components';
import { Colors } from '../../theme/theme';

const StyledMain = styled(Main)`
  text-align: center;
  margin-bottom: 12%;
`;

const StyledHeading = styled(Heading)`
  margin-bottom: 0;
  color: ${Colors.brand}
`;

const StyledParagraph = styled(Paragraph)`
  margin-top: 0;
  color: ${Colors.accent}
`;

const NavIcons = ({ ...rest }) => (
  <Button plain focusIndicator={false} {...rest} />
);

const StyledButton = styled(NavIcons)`
  font-weight: bold
`;

const Header = () => (
  <StyledMain>
    <StyledHeading alignSelf="center">FATE</StyledHeading>
    <StyledParagraph alignSelf="center">Scrum Poker Tool</StyledParagraph>
    <Grid
      areas={[
        { name: 'menu-1', start: [0, 0], end: [0, 0] },
        { name: 'menu-2', start: [1, 0], end: [1, 0] },
        { name: 'menu-3', start: [2, 0], end: [2, 0] },
      ]}
      columns={['flex', 'flex', 'flex']}
      rows={['flex']}
      gap="large"
    >
      <Box gridArea="menu-1">
        <StyledButton
          label="Home"
        />
      </Box>
      <Box gridArea="menu-2">
        <StyledButton
          label="History"
        />
      </Box>
      <Box gridArea="menu-3">
        <StyledButton
          label="About"
        />
      </Box>
    </Grid>
  </StyledMain>
);

export default Header;
