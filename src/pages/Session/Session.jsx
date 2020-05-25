import React, { Component } from 'react';
import {
  Box, Text, List, Button, Grid,
} from 'grommet';
import PropTypes from 'prop-types';
import socketIoClient from 'socket.io-client';
import { Helmet } from 'react-helmet';
import { CheckSquare } from '@styled-icons/fa-regular';
import styled from 'styled-components';
import VoteBoxes from '../../components/VoteBoxes/VoteBoxes';
import { Colors } from '../../theme/theme';
import { post } from '../../utils/request';
import VoteResult from '../../components/VoteResult/VoteResult';

const StyledText = styled(Text)`
  text-align: center;
  font-size: 24px;
  margin-top: 5%;
  color: ${Colors.accent}
  font-weight: bold
`;


class Session extends Component {
  constructor(props) {
    super(props);
    const {
      match,
    } = props;

    this.state = {
      sessionId: match.params.sessionId,
      userId: match.params.userId,
      participants: [],
      title: '',
      votes: [],
      currentVote: '',
      state: '',
    };

    this.handleSetVote = this.handleSetVote.bind(this);
    this.handleCalculateVote = this.handleCalculateVote.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
  }

  componentDidMount() {
    const { sessionId, userId } = this.state;

    this.webSocket = socketIoClient(process.env.REACT_APP_API_URL);
    this.webSocket.on('connect', () => {
      this.webSocket.emit('getSessionDetail', sessionId);
      this.webSocket.on('sessionDetail', (data) => {
        const {
          participants,
          sessionOwnerId,
          title,
          votes,
          state,
        } = data;

        const existingVote = votes.filter((each) => each.voter === userId);

        this.setState(() => ({
          participants,
          sessionOwnerId,
          title,
          votes,
          state,
          currentVote: existingVote.length !== 0 ? existingVote[0].votePoint : '',
        }));
      });
    });
  }

  componentWillUnmount() {
    const { sessionId } = this.state;

    this.webSocket.emit('unsubscribe', sessionId);
  }

  handleSetVote(vote) {
    const { sessionId, userId } = this.state;

    this.webSocket.emit('setVote', {
      sessionId,
      userId,
      vote,
    });

    this.setState(() => ({
      currentVote: vote,
    }));
  }

  async handleCalculateVote() {
    const { sessionId } = this.state;

    await post(`sessions/${sessionId}`, {
      action: 'sessionCalculate',
    });
  }

  async handleRestart() {
    const { sessionId } = this.state;

    await post(`sessions/${sessionId}`, {
      action: 'sessionRestart',
    });
  }

  render() {
    const {
      participants,
      sessionOwnerId,
      title,
      votes,
      currentVote,
      userId,
      state,
      sessionId,
    } = this.state;

    if (state === 'ended') {
      return (
        <Grid
          areas={[
            { name: 'main', start: [0, 0], end: [2, 0] },
            { name: 'icon', start: [0, 1], end: [2, 1] },
          ]}
          columns={['flex', 'flex', 'flex']}
          rows={['small', 'small']}
          alignContent="center"
        >
          <Helmet><title>Session ended</title></Helmet>
          <Box gridArea="main">
            <CheckSquare color={Colors.brand} />
          </Box>
          <Box gridArea="icon">
            <StyledText>
              This section has ended.
            </StyledText>
          </Box>
        </Grid>
      );
    }

    const VoteCounts = () => {
      const votedUserIds = votes.map((vote) => vote.voter);
      const pendingToVote = participants.filter(
        (each) => (!votedUserIds.includes(each.userId) && !each.isOwner),
      );

      const pendingUserNames = pendingToVote.map((e) => e.name);

      if (participants.length === 1) {
        return (
          <Text margin={{ top: 'medium' }} weight="bold" size="large">No one has joined yet.</Text>
        );
      }

      if (pendingUserNames.length === 0) {
        return (
          <Text margin={{ top: 'medium' }} weight="bold" size="large">Everyone has given a vote.</Text>
        );
      }

      return (
        <Box>
          <Text margin={{ top: 'medium' }} weight="bold" size="large">Pending to vote users</Text>
          {
            pendingUserNames.map((name, index) => (
              <Text margin={{ top: 'small' }} size="medium" key={name}>
                {`${index + 1}. ${name}`}
              </Text>
            ))
          }
        </Box>
      );
    };

    const votePanel = currentVote
      ? (
        <Box flex basis="auto" margin={{ left: 'xlarge' }}>
          <Text alignSelf="center" size="xxlarge" weight="bold">{`You voted ${currentVote}`}</Text>
          <Text margin={{ top: 'medium' }} alignSelf="center" size="medium">Please wait for others to vote.</Text>
        </Box>
      ) : (
        <Box flex basis="auto" margin={{ left: 'xlarge' }}>
          <Text size="large" weight="bold">Cast your vote</Text>
          <VoteBoxes
            setVote={this.handleSetVote}
          />
        </Box>
      );

    const adminPanel = (
      <Box flex basis="auto" margin={{ left: 'xlarge' }}>
        <Text alignSelf="center" size="xxlarge" weight="bold">Admin Panel</Text>
        <VoteCounts />
        <Button
          margin={{ top: 'medium' }}
          label="Calculate votes"
          size="large"
          onClick={this.handleCalculateVote}
        />
      </Box>
    );

    let mainPanel = sessionOwnerId === userId ? adminPanel : votePanel;

    if (state === 'calculated') {
      mainPanel = (
        <>
          <VoteResult participants={participants} votes={votes} />
          {sessionOwnerId === userId && (
            <Button
              margin={{ top: 'medium' }}
              label="Restart session"
              size="large"
              onClick={this.handleRestart}
            />
          )}
        </>
      );
    }

    return (
      <>
        <Box margin={{ bottom: 'large' }}>
          <Helmet><title>{title}</title></Helmet>
          <Box>
            <Text size="large">
              <b>Session Name:</b>
              {' '}
              {title}
            </Text>
          </Box>
          <Box>
            <Text size="large">
              <b>Session Id:</b>
              {' '}
              {sessionId}
            </Text>
          </Box>
        </Box>
        <Box direction="row" basis="auto">
          <Box basis="small">
            <Text size="large" weight="bold">Participants</Text>
            <List
              data={participants}
              primaryKey="name"
            />
          </Box>
          {mainPanel}
        </Box>
      </>
    );
  }
}

Session.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Session;
