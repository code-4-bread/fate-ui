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

const CreateSession = ({ size }) => {
  const [sessionName, setSessionName] = useState('');
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleCreateSession = async () => {
    setLoading(true);
    const userId = crypto.randomBytes(10).toString('hex');

    try {
      const sessionResponse = await post('sessions', {
        owner: userId,
        name: sessionName,
      });

      const { id } = sessionResponse.data;

      const newSession = {
        sessionId: id,
        userId,
      };

      let session = [];

      const localSessions = localStorage.getItem('sessions');

      if (!localSessions) {
        session.push(newSession);
      } else {
        const existingSessions = JSON.parse(localSessions);
        session = [...existingSessions, newSession];
      }

      localStorage.setItem('sessions', JSON.stringify(session));

      history.push(`/session/${id}`);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  return (
    <StyledBox
      direction="column"
      gap="medium"
      size={size}
    >
      <Box>
        <Text weight="bold" size={['small', 'medium'].includes(size) ? 'xlarge' : 'xxlarge'}>
          Create a new session
        </Text>
      </Box>
      <Box>
        <TextInput
          placeholder="Session title"
          value={sessionName}
          onChange={(e) => setSessionName(e.target.value)}
        />
      </Box>
      <Box>
        <Button
          label="Create"
          background="brand"
          onClick={handleCreateSession}
          disabled={loading}
        />
      </Box>
    </StyledBox>
  );
};

CreateSession.propTypes = {
  size: PropTypes.string.isRequired,
};

export default CreateSession;
