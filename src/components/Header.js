import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

const HeaderContainer = styled.header`
  background-color: ${props => props.theme.colors.primary};
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin-left: 1rem;
`;

const LogoutButton = styled.button`
  background-color: transparent;
  color: white;
  border: 1px solid white;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: white;
    color: ${props => props.theme.colors.primary};
  }
`;

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <HeaderContainer>
      <Logo to="/">매직노트 답변 역량검사</Logo>
      <nav>
        {user ? (
          <>
            <NavLink to={user.isAdmin ? "/admin-dashboard" : "/user-dashboard"}>관리자페이지</NavLink>
            <LogoutButton onClick={logout}>Logout</LogoutButton>
          </>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </nav>
    </HeaderContainer>
  );
};

export default Header;