import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 4px;
  width: 80%;
  max-width: 500px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
`;

const Select = styled.select`
  margin-bottom: 1rem;
  padding: 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const QuestionModal = ({ question, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    questiontext: '',
    correctAnswer: 'O'
  });

  useEffect(() => {
    if (question) {
      setFormData({
        text: question.text,
        correctAnswer: question.correctAnswer
      });
    }
  }, [question]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      questionText: formData.questionText,
      correctAnswer: formData.correctAnswer
    });
  };

  return (
    <ModalBackground onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <h2>{question ? 'Edit Question' : 'Add New Question'}</h2>
        <Form onSubmit={handleSubmit}>
          <Input
            name="questionText"
            value={formData.questionText}
            onChange={handleChange}
            placeholder="Question text"
            required
          />
          <Select
            name="correctAnswer"
            value={formData.correctAnswer}
            onChange={handleChange}
          >
            <option value="O">O</option>
            <option value="X">X</option>
            <option value="Strange">Strange</option>
          </Select>
          <Button type="submit">{question ? 'Update' : 'Add'}</Button>
        </Form>
      </ModalContent>
    </ModalBackground>
  );
};

export default QuestionModal;