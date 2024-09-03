import React from 'react';
import styled from 'styled-components';

const ErrorWrapper = styled.div`
  color: ${props => props.theme.colors.danger};
  background-color: #ffeeee;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid ${props => props.theme.colors.danger};
  border-radius: 4px;
`;

const ErrorMessage = ({ message }) => (
  <ErrorWrapper>
    <p>{message}</p>
  </ErrorWrapper>
);

export default ErrorMessage;