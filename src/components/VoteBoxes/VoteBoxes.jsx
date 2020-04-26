import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from 'grommet';


const VoteBoxes = ({ setVote }) => {
  const voteGroup1 = [1, 2, 3, 5];
  const voteGroup2 = [8, 13, 20, 40];

  return (
    <>
      <Box direction="row" gap="medium" margin={{ top: 'medium' }}>
        {
          voteGroup1.map((each) => (
            <Box key={each}>
              <Button
                size="large"
                focusIndicator={false}
                label={each}
                onClick={() => setVote(each)}
              />
            </Box>
          ))
        }
      </Box>
      <Box direction="row" gap="medium" margin={{ top: 'medium' }}>
        {
          voteGroup2.map((each) => (
            <Box key={each}>
              <Button
                size="large"
                focusIndicator={false}
                label={each}
                onClick={() => setVote(each)}
              />
            </Box>
          ))
        }
      </Box>
    </>
  );
};

VoteBoxes.propTypes = {
  setVote: PropTypes.func.isRequired,
};

export default VoteBoxes;
