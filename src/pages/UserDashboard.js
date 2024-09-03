import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getUserInfo, startExam } from '../utils/api';

const DashboardContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const UserInfo = styled.div`
  background-color: ${props => props.theme.colors.light};
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 2rem;
`;

const StartButton = styled.button`
  padding: 1rem 2rem;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }

  &:disabled {
    background-color: ${props => props.theme.colors.disabled};
    cursor: not-allowed;
  }
`;

const Guidelines = styled.ul`
  margin-top: 2rem;
  padding-left: 1.5rem;
`;

const ErrorMessage = styled.p`
  color: ${props => props.theme.colors.danger};
  margin-top: 1rem;
`;

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getUserInfo();
        setUser(response.data);
      } catch (err) {
        setError('Failed to load user information');
      }
    };
    fetchUserInfo();
  }, []);

  const handleStartExam = async () => {
    try {
      const response = await startExam();
      navigate(`/exam/${response.data.examId}`);
    } catch (err) {
      setError('Failed to start the exam');
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <>
      <Header />
      <DashboardContainer>
        <h1>환영합니다.</h1>
        <UserInfo>
          <p>본 테스트는 학생들의 질문의 적절함을 평가하는 역량을 봅니다.<br/>시험은 오직 1회만 진행 가능합니다.<br/>시험을 시작하면 멈출 수 없으므로 신중하게 시작해주세요.<br/>총 시험 시간은 20분입니다.</p>
        </UserInfo>
        <StartButton onClick={handleStartExam} disabled={user.examCompleted}>
          {user.examCompleted ? 'Exam Completed' : 'Start Exam'}
        </StartButton>
        <Guidelines>
          <h2>테스트 가이드라인:</h2>
          <li>참 또는 거짓을 판정할 수 있는 질문은 "O", "X"를 선택하세요. 단, 질문이 교육과정 상 이상한 경우 "Strange"를 누릅니다.</li>
          <li>참 또는 거짓을 판정할 수 없는 유형의 질문은, 교육과정상 적합하면 O 그게 아닌 경우 "Strange"를 누릅니다.</li>
          <li>문항은 100개로 구성되어 있습니다.</li>
          <li>각 문항은 10초 이내로 응답해야 합니다.</li>
          <li>문항별 "O", "X", "Strange" 중 하나를 선택합니다.</li>
          <li>10초가 초과되거나 넘어간 뒤에는 이전 문제로 돌아갈 수 없습니다.</li>
          <li>모든 문항이 끝난 후에, "Strange"로 선택한 것에 그렇게 생각한 이유를 적어주세요.</li>
        </Guidelines>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </DashboardContainer>
      <Footer />
    </>
  );
};

export default UserDashboard;