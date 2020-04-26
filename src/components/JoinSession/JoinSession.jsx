import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Button, Text, TextInput,
} from 'grommet';
import styled from 'styled-components';

const StyledBox = styled(Box)`
  margin-left: ${(props) => (!['small', 'medium'].includes(props.size) ? '25%' : '0')};
  margin-right: ${(props) => (!['small', 'medium'].includes(props.size) ? '25%' : '0')};
`;

const JoinSession = ({ size }) => {
  const [sessionId, setSessionId] = useState('');

  return (
    <StyledBox
      direction="column"
      gap="medium"
      size={size}
    >
      <Box>
        <Text weight="bold" size={['small', 'medium'].includes(size) ? 'xlarge' : 'xxlarge'}>
          Join a session
        </Text>
      </Box>
      <Box>
        <TextInput
          placeholder="Session id"
          value={sessionId}
          onChange={(e) => setSessionId(e.target.value)}
        />
      </Box>
      <Box>
        <Button
          label="Join"
          background="brand"
          onClick={() => { console.log('Session Joined'); }}
        />
      </Box>
    </StyledBox>
  );
};

JoinSession.propTypes = {
  size: PropTypes.string.isRequired,
};

export default JoinSession;
