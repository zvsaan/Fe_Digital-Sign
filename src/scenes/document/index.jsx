import React, { useState, useEffect } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Modal, Box, Typography, TextField, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import Header from "../../components/Header";

function DataDocument() {
  const [documents, setDocuments] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [edittgl, setEdittgl] = useState('');

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = () => {
    fetch('http://127.0.0.1:8000/api/files')
      .then(response => response.json())
      .then(data => setDocuments(data.results))
      .catch(error => console.error('Error fetching data:', error));
  };

  const handleEditClick = (document) => {
    setSelectedDocument(document);
    setEditTitle(document.title);
    setEdittgl(document.tgl);
    setOpenEditModal(true);
  };

  const handleDeleteClick = (document) => {
    setSelectedDocument(document);
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
    if (name === 'title') {
      setEditTitle(value);
    } else if (name === 'tgl') {
      setEdittgl(value);
    }
  };

  const handleEditSubmit = () => {
    fetch(`http://127.0.0.1:8000/api/files/${selectedDocument.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: editTitle,
        tgl: edittgl,
      }),
    })
    .then(response => {
      if (response.ok) {
        fetchDocuments();
        setOpenEditModal(false);
      } else {
        throw new Error('Failed to update document');
      }
    })
    .catch(error => console.error('Error updating document:', error));
  };

  const handleDeleteSubmit = () => {
    fetch(`http://127.0.0.1:8000/api/files/${selectedDocument.id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        fetchDocuments();
        setOpenDeleteModal(false);
      } else {
        throw new Error('Failed to delete document');
      }
    })
    .catch(error => console.error('Error deleting document:', error));
  };

  return (
    <div>
      <Box m="20px">
        <Header title="DATA DOCUMENT" subtitle="List of Data Document" />
        <Box m="40px 0 0 0" height="75vh">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Tgl</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {documents.map((document, index) => (
                  <TableRow key={document.id_document}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{document.title}</TableCell>
                    <TableCell>{document.tgl}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEditClick(document)}>
                        <EditIcon color="primary" />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteClick(document)}>
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

      <Modal open={openEditModal} onClose={handleCloseEditModal}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Box sx={{ width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, position: 'relative' }}>
            <IconButton style={{ position: 'absolute', top: 5, right: 5 }} onClick={handleCloseEditModal}>
              <CloseIcon />
            </IconButton>
            <Typography variant="h6">Edit Document</Typography>
            <TextField label="Title" value={editTitle} name="title" onChange={handleEditChange} fullWidth margin="normal" />
            <TextField label="tgl" value={edittgl} name="tgl" onChange={handleEditChange} fullWidth margin="normal" />
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
            <Typography variant="h6">Delete Document</Typography>
            <Typography>Are you sure you want to delete {selectedDocument && selectedDocument.title}?</Typography>
            <Button variant="contained" color="secondary" onClick={handleDeleteSubmit}>Delete</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default DataDocument;