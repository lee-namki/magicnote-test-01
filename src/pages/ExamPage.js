import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getQuestions, submitAnswer } from '../utils/api';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';

const ExamContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const QuestionCard = styled.div`
  background-color: ${props => props.theme.colors.light};
  padding: 2rem;
  border-radius: 4px;
  margin-bottom: 2rem;
`;

const AnswerButton = styled.button`
  padding: 0.5rem 1rem;
  margin-right: 1rem;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }
`;

const Timer = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Progress = styled.div`
  margin-bottom: 1rem;
`;

const ExamPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { examId } = useParams();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await getQuestions(examId);
        setQuestions(response.data);
      } catch (err) {
        console.error('Error fetching questions:', err);
        setError('Failed to load questions');
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [examId]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleAnswer(null);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex]);

  const handleAnswer = async (answer) => {
    try {
      setLoading(true);
      await submitAnswer(examId, questions[currentQuestionIndex]._id, answer);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setTimeLeft(10);
      } else {
        navigate('/exam-complete');
      }
    } catch (err) {
      console.error('Error submitting answer:', err);
      setError('Failed to submit answer');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (questions.length === 0) return <div>No questions available</div>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <ExamContainer>
      <Progress>Question {currentQuestionIndex + 1} of {questions.length}</Progress>
      <Timer>{timeLeft} seconds left</Timer>
      <QuestionCard>
        <h2>{currentQuestion.questionText}</h2>
        <AnswerButton onClick={() => handleAnswer('O')}>O</AnswerButton>
        <AnswerButton onClick={() => handleAnswer('X')}>X</AnswerButton>
        <AnswerButton onClick={() => handleAnswer('Strange')}>Strange</AnswerButton>
      </QuestionCard>
    </ExamContainer>
  );
};

export default ExamPage;