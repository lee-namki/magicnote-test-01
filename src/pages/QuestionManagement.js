import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getAllQuestions, createQuestion, updateQuestion, deleteQuestion } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import QuestionModal from '../components/QuestionModal';
import Header from '../components/Header';
import Footer from '../components/Footer';

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

const Button = styled.button`
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const AddButton = styled(Button)`
  margin-bottom: 1rem;
`;

const SuccessMessage = styled.div`
  color: green;
  background-color: #e6ffe6;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const QuestionManagement = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await getAllQuestions();
      setQuestions(response.data);
    } catch (err) {
      setError('Failed to fetch questions');
    } finally {
      setLoading(false);
    }
  };

  const handleAddQuestion = async (questionData) => {
    try {
      await createQuestion(questionData);
      fetchQuestions();
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error adding question:', err);
      setError('Failed to add question');
    }
  };

  const handleUpdateQuestion = async (id, questionData) => {
    try {
      await updateQuestion(id, questionData);
      fetchQuestions();
      setEditingQuestion(null);
      setSuccessMessage('Question updated successfully');
    } catch (err) {
      setError('Failed to update question');
    }
  };

  const handleDeleteQuestion = async (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      try {
        await deleteQuestion(id);
        fetchQuestions();
        setSuccessMessage('Question deleted successfully');
      } catch (err) {
        setError('Failed to delete question');
      }
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <>
      <Header />
      <ManagementContainer>
        <h1>Question Management</h1>
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        <AddButton onClick={() => setIsModalOpen(true)}>Add New Question</AddButton>
        <Table>
          <thead>
            <tr>
              <Th>ID</Th>
              <Th>Question</Th>
              <Th>Correct Answer</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {questions.map(question => (
              <tr key={question._id}>
                <Td>{question._id}</Td>
                <Td>{question.questionText}</Td>
                <Td>{question.correctAnswer}</Td>
                <Td>
                  <Button onClick={() => setEditingQuestion(question)}>Edit</Button>
                  <Button onClick={() => handleDeleteQuestion(question._id)}>Delete</Button>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
        {isModalOpen && (
          <QuestionModal
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleAddQuestion}
          />
        )}
        {editingQuestion && (
          <QuestionModal
            question={editingQuestion}
            onClose={() => setEditingQuestion(null)}
            onSubmit={(data) => handleUpdateQuestion(editingQuestion._id, data)}
          />
        )}
      </ManagementContainer>
      <Footer />
    </>
  );
};

export default QuestionManagement;