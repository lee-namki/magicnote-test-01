import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { AuthProvider } from './contexts/AuthContext';
import theme from './styles/theme';
import GlobalStyle from './styles/globalStyles';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import UserDashboard from './pages/UserDashboard';
import ExamPage from './pages/ExamPage';
import ExamCompletePage from './pages/ExamCompletePage';
import AdminDashboard from './pages/AdminDashboard';
import UserManagement from './pages/UserManagement';
import QuestionManagement from './pages/QuestionManagement';
import ExamResultsManagement from './pages/ExamResultsManagement';
import UserResponsesPage from './pages/UserResponsesPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/user-dashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
            <Route path="/exam/:examId" element={<PrivateRoute><ExamPage /></PrivateRoute>} />
            <Route path="/exam-complete" element={<PrivateRoute><ExamCompletePage /></PrivateRoute>} />
            <Route path="/admin-dashboard" element={<PrivateRoute adminOnly><AdminDashboard /></PrivateRoute>} />
            <Route path="/admin/users" element={<PrivateRoute adminOnly><UserManagement /></PrivateRoute>} />
            <Route path="/admin/questions" element={<PrivateRoute adminOnly><QuestionManagement /></PrivateRoute>} />
            <Route path="/admin/exam-results" element={<PrivateRoute adminOnly><ExamResultsManagement /></PrivateRoute>} />
            <Route path="/admin/user-responses/:examId" element={<PrivateRoute adminOnly><UserResponsesPage /></PrivateRoute>} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;