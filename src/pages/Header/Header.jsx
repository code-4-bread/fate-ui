import React from 'react';
import { Main, Heading, Paragraph } from 'grommet';
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

const Header = () => (
  <StyledMain>
    <StyledHeading alignSelf="center">FATE</StyledHeading>
    <StyledParagraph alignSelf="center">Scrum Poker Tool</StyledParagraph>
  </StyledMain>
);

export default Header;
