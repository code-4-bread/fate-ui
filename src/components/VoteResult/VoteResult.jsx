import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text, List } from 'grommet';


const VoteResult = ({ participants, votes }) => {
  const mergedData = votes.map((vote) => {
    const user = participants.find((each) => (vote.voter === each.userId));

    return {
      ...vote,
      userName: user.name,
    };
  });

  return (
    <Box margin={{ left: 'large' }} alignContent="center" basis="large">
      <Box>
        <Text alignSelf="center" size="xxlarge">Vote Results</Text>
        <List
          margin={{ horizontal: 'large' }}
          data={mergedData}
          primaryKey="userName"
          secondaryKey="votePoint"
        />
      </Box>
    </Box>
  );
};

VoteResult.propTypes = {
  votes: PropTypes.array.isRequired,
  participants: PropTypes.array.isRequired,
};

export default VoteResult;
