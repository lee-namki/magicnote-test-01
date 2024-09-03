import React from 'react';
import styled from 'styled-components';

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Loading = () => (
  <LoadingWrapper>
    <p>Loading...</p>
  </LoadingWrapper>
);

export default Loading;