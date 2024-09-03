import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getAllExamResults } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const ManagementContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background-color: ${props => props.theme.colors.light};
  padding: 0.5rem;
  text-align: left;
`;

const Td = styled.td`
  padding: 0.5rem;
  border-bottom: 1px solid ${props => props.theme.colors.light};
`;

const ViewButton = styled(Link)`
  padding: 0.5rem 1rem;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  text-decoration: none;
  border-radius: 4px;
`;

const ExamResultsManagement = () => {
  const [examResults, setExamResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExamResults = async () => {
      try {
        const response = await getAllExamResults();
        setExamResults(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch exam results:', err);
        setError('Failed to load exam results. Please try again later.');
        setLoading(false);
      }
    };

    fetchExamResults();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <>
      <Header />
      <ManagementContainer>
        <h1>Exam Results Management</h1>
        <Table>
          <thead>
            <tr>
              <Th>ID</Th>
              <Th>User</Th>
              <Th>Date</Th>
              <Th>Score</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {examResults.map(result => (
              <tr key={result._id}>
                <Td>{result._id}</Td>
                <Td>{result.user?.username || 'Unknown User'}</Td>
                <Td>{result.endTime ? new Date(result.endTime).toLocaleDateString() : 'N/A'}</Td>
                <Td>{result.score !== undefined ? result.score : 'N/A'}</Td>
                <Td>
                <ViewButton to={`/admin/user-responses/${result._id}`}>View Details</ViewButton>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ManagementContainer>
      <Footer />
    </>
  );
};

export default ExamResultsManagement;