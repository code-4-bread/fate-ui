import React, { useState, useEffect } from 'react';
import { List, Box, Button, Text } from 'grommet';
import { useHistory } from 'react-router-dom';


const CurrentSessions = () => {
  const [sessions, setSessions] = useState([
    {
      name: 'POS-123',
    },
    {
      name: 'POS-234',
    },
    {
      name: 'POS-345',
    },
    {
      name: 'POS-456',
    },
    {
      name: 'POS-567',
    },
  ]);

  const history = useHistory();

  return (
    <List
      primaryKey="name"
      data={sessions}
      step={10}
      children={(item) => (
        <Box direction="row" gap="medium">
          <Box>
            <Text weight="bold">{item.name}</Text>
          </Box>
          <Box>
            <Button
              plain
              label="Join"
              focusIndicator={false}
              background="accent"
              onClick={() => history.push(`/session/${item.name}`)}
            />
          </Box>
        </Box>
      )}
    />
  );
};

export default CurrentSessions;
