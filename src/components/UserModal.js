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

const Checkbox = styled.input`
  margin-bottom: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const UserModal = ({ user, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    isAdmin: false
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        password: '',
        isAdmin: user.isAdmin
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <ModalBackground onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <h2>{user ? 'Edit User' : 'Add New User'}</h2>
        <Form onSubmit={handleSubmit}>
          <Input
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
          <Input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={user ? "Leave blank to keep current password" : "Password"}
            required={!user}
          />
          <label>
            <Checkbox
              name="isAdmin"
              type="checkbox"
              checked={formData.isAdmin}
              onChange={handleChange}
            />
            Is Admin
          </label>
          <Button type="submit">{user ? 'Update' : 'Add'}</Button>
        </Form>
      </ModalContent>
    </ModalBackground>
  );
};

export default UserModal;