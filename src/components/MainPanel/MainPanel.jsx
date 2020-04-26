import React, { useState } from 'react';
import {
  Tabs,
  Tab,
  ResponsiveContext,
} from 'grommet';
import CreateSession from '../CreateSession/CreateSession';
import JoinSession from '../JoinSession/JoinSession';

const MainPanel = () => {
  const [mode, setMode] = useState('create');
  const size = React.useContext(ResponsiveContext);

  return (
    <>
      <Tabs
        activeIndex={mode === 'create' ? 0 : 1}
        onActive={(index) => {
          setMode(index === 0 ? 'create' : 'join');
        }}
      >
        <Tab focusIndicator={false} title="Create">
          <CreateSession size={size} />
        </Tab>
        <Tab focusIndicator={false} title="Join">
          <JoinSession size={size} />
        </Tab>
      </Tabs>
    </>
  );
};

export default MainPanel;
