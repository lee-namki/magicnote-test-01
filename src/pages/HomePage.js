import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

const Description = styled.p`
  text-align: center;
  max-width: 600px;
  margin-bottom: 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const StyledButton = styled(Link)`
  padding: 0.5rem 1rem;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }
`;

const HomePage = () => {
  return (
    <>
      <Header />
      <HomeContainer>
        <Title>생활과 윤리 답변자 역량 검사</Title>
        <Description>
          본 사이트는 검사를 위한 임시 사이트입니다. <br/>
          웹에서 Login 버튼을 클릭하여 로그인하십시오.
        </Description>
        <ButtonContainer>
          <StyledButton to="/login">Login</StyledButton>
          <StyledButton to="/login?admin=true">Admin Login</StyledButton>
        </ButtonContainer>
      </HomeContainer>
      <Footer />
    </>
  );
};

export default HomePage;