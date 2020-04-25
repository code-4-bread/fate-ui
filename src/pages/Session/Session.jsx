import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

const Session = () => {
  const params = useParams();

  return (
    <>
      <Helmet>
        <title>{`${params.id} Session`}</title>
      </Helmet>
      <h1>{`You are viewing ${params.id} session`}</h1>
    </>
  );
};

export default Session;
