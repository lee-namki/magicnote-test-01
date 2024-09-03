import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { submitStrangeExplanations, getExamResult } from '../utils/api';

const CompleteContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const StrangeAnswerForm = styled.form`
  margin-top: 2rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  margin-bottom: 1rem;
  padding: 0.5rem;
`;

const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: ${props => props.theme.colors.danger};
  margin-top: 1rem;
`;

const ExamCompletePage = () => {
  const [strangeAnswers, setStrangeAnswers] = useState([]);
  const [explanations, setExplanations] = useState({});
  const [error, setError] = useState('');
  const [examId, setExamId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExamResult = async () => {
      try {
        const result = await getExamResult();
        console.log('Exam result:', result.data); // 로깅 추가
        setStrangeAnswers(result.data.strangeAnswers);
        setExamId(result.data.examId);
      } catch (err) {
        console.error('Failed to load exam result:', err);
        setError('Failed to load exam result');
      }
    };
    fetchExamResult();
  }, []);

  const handleExplanationChange = (questionId, explanation) => {
    setExplanations(prev => ({ ...prev, [questionId]: explanation }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting explanations for examId:', examId);
      console.log('Explanations:', explanations);
      await submitStrangeExplanations(examId, explanations);
      navigate('/user-dashboard');
    } catch (err) {
      console.error('Submit explanations error:', err);
      setError('Failed to submit explanations');
    }
  };

  return (
    <>
      <Header />
      <CompleteContainer>
        <h1>테스트가 종료되었습니다.</h1>
        <p> 테스트에 참여해주셔서 감사합니다. <br/>아래는 "Strange"로 응답한 문항입니다. 그렇게 생각한 이유를 적어주세요.</p>
        <StrangeAnswerForm onSubmit={handleSubmit}>
          {strangeAnswers.map(answer => (
            <div key={answer.questionId}>
              <h2>Question: {answer.questionText}</h2>
              <TextArea
                value={explanations[answer.questionId] || ''}
                onChange={(e) => handleExplanationChange(answer.questionId, e.target.value)}
                placeholder="Explain why you chose 'Strange' for this question"
                required
              />
            </div>
          ))}
          <SubmitButton type="submit">제출하기</SubmitButton>
        </StrangeAnswerForm>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </CompleteContainer>
      <Footer />
    </>
  );
};

export default ExamCompletePage;