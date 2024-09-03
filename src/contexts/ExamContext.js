import React, { createContext, useContext, useState } from 'react';

const ExamContext = createContext();

export const ExamProvider = ({ children }) => {
  const [examState, setExamState] = useState({
    currentQuestion: 0,
    answers: [],
    timeRemaining: 10,
  });

  const updateExamState = (newState) => {
    setExamState((prevState) => ({ ...prevState, ...newState }));
  };

  return (
    <ExamContext.Provider value={{ examState, updateExamState }}>
      {children}
    </ExamContext.Provider>
  );
};

export const useExam = () => useContext(ExamContext);