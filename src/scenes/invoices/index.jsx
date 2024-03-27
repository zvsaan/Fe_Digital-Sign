import React, { useState, useEffect } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Modal, Box, Typography, TextField, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import Header from "../../components/Header";

function UserTable() {
  const [users, setUsers] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch('http://127.0.0.1:8000/api/auth/users')
      .then(response => response.json())
      .then(data => setUsers(data.results))
      .catch(error => console.error('Error fetching data:', error));
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
    setOpenEditModal(true);
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setOpenDeleteModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setEditName(value);
    } else if (name === 'email') {
      setEditEmail(value);
    }
  };

  const handleEditSubmit = () => {
    fetch(`http://127.0.0.1:8000/api/auth/update/${selectedUser.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: editName,
        email: editEmail,
      }),
    })
    .then(response => {
      if (response.ok) {
        fetchUsers();
        setOpenEditModal(false);
      } else {
        throw new Error('Failed to update user');
      }
    })
    .catch(error => console.error('Error updating user:', error));
  };

  const handleDeleteSubmit = () => {
    fetch(`http://127.0.0.1:8000/api/auth/delete/${selectedUser.id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        fetchUsers();
        setOpenDeleteModal(false);
      } else {
        throw new Error('Failed to delete user');
      }
    })
    .catch(error => console.error('Error deleting user:', error));
  };

  return (
    <div>
      <Box m="20px">
        <Header title="DATA USER" subtitle="List of Data User" />
        <Box m="40px 0 0 0" height="75vh">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, index) => (
                  <TableRow key={user.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEditClick(user)}>
                        <EditIcon color="primary" />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteClick(user)}>
                        <DeleteIcon color="secondary" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      {/* Edit Modal */}
      <Modal open={openEditModal} onClose={handleCloseEditModal}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Box sx={{ width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, position: 'relative' }}>
            <IconButton style={{ position: 'absolute', top: 5, right: 5 }} onClick={handleCloseEditModal}>
              <CloseIcon />
            </IconButton>
            <Typography variant="h6">Edit User</Typography>
            <TextField label="Name" value={editName} name="name" onChange={handleEditChange} fullWidth margin="normal" />
            <TextField label="Email" value={editEmail} name="email" onChange={handleEditChange} fullWidth margin="normal" />
            <Button variant="contained" color="primary" onClick={handleEditSubmit}>Save Changes</Button>
          </Box>
        </Box>
      </Modal>

      {/* Delete Modal */}
      <Modal open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Box sx={{ width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, position: 'relative' }}>
            <IconButton style={{ position: 'absolute', top: 5, right: 5 }} onClick={handleCloseDeleteModal}>
              <CloseIcon />
            </IconButton>
            <Typography variant="h6">Delete User</Typography>
            <Typography>Are you sure you want to delete {selectedUser && selectedUser.name}?</Typography>
            <Button variant="contained" color="secondary" onClick={handleDeleteSubmit}>Delete</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default UserTable;
