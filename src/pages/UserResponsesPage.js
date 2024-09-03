import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getExamResultDetails } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const ResponsesContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const ResponseItem = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: ${props => props.theme.colors.light};
  border-radius: 4px;
`;

const StrangeExplanation = styled.p`
  font-style: italic;
  color: ${props => props.theme.colors.secondary};
  margin-top: 0.5rem;
`;

const UserResponsesPage = () => {
  const { examId } = useParams();
  const location = useLocation();
  const [userResponses, setUserResponses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserResponses = async () => {
      console.log('Current examId:', examId);
      console.log('Current path:', location.pathname);

      if (!examId) {
        setError('Invalid exam ID');
        setLoading(false);
        return;
      }

      try {
        const response = await getExamResultDetails(examId);
        console.log('API Response:', response.data);
        setUserResponses(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch user responses:', err);
        setError('Failed to load user responses');
        setLoading(false);
      }
    };

    fetchUserResponses();
  }, [examId, location]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!userResponses) return <ErrorMessage message="No data available" />;

  return (
    <>
      <Header />
      <ResponsesContainer>
        <h1>User Responses</h1>
        <h2>User: {userResponses.username}</h2>
        <p>Score: {userResponses.score}</p>
        <p>Start Time: {new Date(userResponses.startTime).toLocaleString()}</p>
        <p>End Time: {new Date(userResponses.endTime).toLocaleString()}</p>
        {userResponses.answers && userResponses.answers.map((response, index) => (
          <ResponseItem key={index}>
            <h3>Question: {response.questionText}</h3>
            <p>User Answer: {response.userAnswer}</p>
            <p>Correct Answer: {response.correctAnswer}</p>
            <p>Correct: {response.isCorrect ? 'Yes' : 'No'}</p>
            {response.userAnswer === 'Strange' && response.explanation && (
              <StrangeExplanation>
                Explanation for Strange: {response.explanation}
              </StrangeExplanation>
            )}
          </ResponseItem>
        ))}
      </ResponsesContainer>
      <Footer />
    </>
  );
};

export default UserResponsesPage;