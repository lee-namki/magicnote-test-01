import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 0 auto;
`;

const StyledField = styled(Field)`
  margin-bottom: 1rem;
  padding: 0.5rem;
`;

const StyledErrorMessage = styled(ErrorMessage)`
  color: ${props => props.theme.colors.danger};
  margin-bottom: 1rem;
`;

const LoginForm = ({ onSubmit }) => (
  <Formik
    initialValues={{ username: '', password: '' }}
    validationSchema={Yup.object({
      username: Yup.string().required('Required'),
      password: Yup.string().required('Required'),
    })}
    onSubmit={onSubmit}
  >
    <StyledForm>
      <StyledField name="username" type="text" placeholder="Username" />
      <StyledErrorMessage name="username" component="div" />
      
      <StyledField name="password" type="password" placeholder="Password" />
      <StyledErrorMessage name="password" component="div" />
      
      <button type="submit">Login</button>
    </StyledForm>
  </Formik>
);

export default LoginForm;