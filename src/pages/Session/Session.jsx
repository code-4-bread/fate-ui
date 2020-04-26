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
      sessionState: '',
    };

    this.handleSetVote = this.handleSetVote.bind(this);
    this.handleSessionStart = this.handleSessionStart.bind(this);
  }

  componentDidMount() {
    const { sessionId } = this.state;

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

        this.setState(() => ({
          participants,
          sessionOwnerId,
          title,
          votes,
          state,
        }));
      });
    });
  }

  componentWillUnmount() {
    const { sessionId } = this.state;

    this.webSocket.emit('unsubscribe', sessionId);
  }

  handleSetVote(vote) {
    this.setState(() => ({
      currentVote: vote,
    }));
  }

  handleSessionStart() {
    console.log('Session Started');
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
        <Text alignSelf="start" size="large" margin={{ top: 'medium' }}>Start the session if all the participants has joined.</Text>
        <Button
          margin={{ top: 'medium' }}
          label="Start session"
          size="large"
          onClick={this.handleSessionStart}
        />
      </Box>
    );


    const mainPanel = sessionOwnerId === userId ? adminPanel : votePanel;

    return (
      <>
        <Box margin={{ bottom: 'large' }}>
          <Helmet><title>{title}</title></Helmet>
          <Box>
            <Text size="xxlarge">
              <b>Session Name:</b>
              {' '}
              {title}
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
