import React from 'react';
import { Helmet } from 'react-helmet';
import { Heading, Paragraph, Anchor } from 'grommet';

const About = () => (
  <>
    <Helmet>
      <title>About</title>
    </Helmet>
    <Heading>About</Heading>
    <Paragraph>Scrum poker tool developed by <Anchor target="_blank" href="https://github.com/code-4-bread/">Code4Bread</Anchor></Paragraph>
  </>
);

export default About;
