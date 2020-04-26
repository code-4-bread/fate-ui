import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Button, Text, TextInput,
} from 'grommet';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import crypto from 'crypto';
import { post } from '../../utils/request';

const StyledBox = styled(Box)`
  margin-left: ${(props) => (!['small', 'medium'].includes(props.size) ? '25%' : '0')};
  margin-right: ${(props) => (!['small', 'medium'].includes(props.size) ? '25%' : '0')};
`;

const JoinSession = ({ size }) => {
  const [sessionId, setSessionId] = useState('');
  const [userName, setUserName] = useState('');

  const history = useHistory();

  const handleSessionJoin = async () => {
    const userId = crypto.randomBytes(10).toString('hex');
    await post(`sessions/${sessionId}`, {
      userId,
      userName,
      action: 'newJoin',
    });

    history.push(`/session/${sessionId}/${userId}`);
  };

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
      <Box gap="small">
        <TextInput
          placeholder="Session id"
          value={sessionId}
          onChange={(e) => setSessionId(e.target.value)}
        />
        <TextInput
          placeholder="Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </Box>
      <Box>
        <Button
          label="Join"
          background="brand"
          onClick={handleSessionJoin}
        />
      </Box>
    </StyledBox>
  );
};

JoinSession.propTypes = {
  size: PropTypes.string.isRequired,
};

export default JoinSession;
