import styled from 'styled-components';

const LoadingSpinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid ${props => props.theme.colors.primary};
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
  margin: 20px auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export default LoadingSpinner;