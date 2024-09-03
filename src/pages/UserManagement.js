import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getAllUsers, createUser, updateUser, deleteUser } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import UserModal from '../components/UserModal';
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

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers();
      setUsers(response.data);
    } catch (err) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (userData) => {
    try {
      await createUser(userData);
      fetchUsers();
      setIsModalOpen(false);
    } catch (err) {
      setError('Failed to add user');
    }
  };

  const handleUpdateUser = async (id, userData) => {
  try {
    await updateUser(id, userData);
    fetchUsers();
    setEditingUser(null);
  } catch (err) {
    setError('Failed to update user');
  }
};

const handleDeleteUser = async (id) => {
  if (window.confirm('Are you sure you want to delete this user?')) {
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (err) {
      setError('Failed to delete user');
    }
  }
};

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <>
      <Header />
      <ManagementContainer>
        <h1>User Management</h1>
        <AddButton onClick={() => setIsModalOpen(true)}>Add New User</AddButton>
        <Table>
          <thead>
            <tr>
              <Th>ID</Th>
              <Th>Username</Th>
              <Th>Admin</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
          {users.map(user => (
            <tr key={user._id}>
                <Td>{user._id}</Td>
                <Td>{user.username}</Td>
                <Td>{user.isAdmin ? 'Yes' : 'No'}</Td>
                <Td>
                <Button onClick={() => setEditingUser(user)}>Edit</Button>
                <Button onClick={() => handleDeleteUser(user._id)}>Delete</Button>
                </Td>
            </tr>
            ))}
          </tbody>
        </Table>
        {isModalOpen && (
          <UserModal
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleAddUser}
          />
        )}
        {editingUser && (
          <UserModal
            user={editingUser}
            onClose={() => setEditingUser(null)}
            onSubmit={(data) => handleUpdateUser(editingUser.id, data)}
          />
        )}
      </ManagementContainer>
      <Footer />
    </>
  );
};

export default UserManagement;