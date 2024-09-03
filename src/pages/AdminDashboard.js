import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';

const DashboardContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const LinkButton = styled(Link)`
  display: block;
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }
`;

const AdminDashboard = () => {
  return (
    <>
      <Header />
      <DashboardContainer>
        <h1>Admin Dashboard</h1>
        <LinkButton to="/admin/users">User Management</LinkButton>
        <LinkButton to="/admin/questions">Question Management</LinkButton>
        <LinkButton to="/admin/exam-results">Exam Results Management</LinkButton>
      </DashboardContainer>
      <Footer />
    </>
  );
};

export default AdminDashboard;