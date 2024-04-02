import React, { useState } from 'react';
import { Box, Button, IconButton, TextField } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import ClearIcon from '@mui/icons-material/Clear';
import Header from "../../components/Header";

const InvitePage = () => {
  const [signatories, setSignatories] = useState([{ name: '', email: '' }]);

  const handleAddSignatory = () => {
    setSignatories([...signatories, { name: '', email: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logika untuk mengirim undangan
    console.log('Form telah disubmit:', signatories);
  };

  const handleChange = (index, field, value) => {
    const updatedSignatories = [...signatories];
    updatedSignatories[index][field] = value;
    setSignatories(updatedSignatories);
  };

  const handleRemoveSignatory = (index) => {
    const updatedSignatories = [...signatories];
    updatedSignatories.splice(index, 1);
    setSignatories(updatedSignatories);
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Undang Penandatangan" subtitle="Please invite Signatories" />
      </Box>
      {signatories.map((signatory, index) => (
        <Box key={index} display="flex" mt={3}>
          <Box
            border={1}
            borderRadius={1}
            p={3}
            borderColor="#cccccc"
            width="100%"
            position="relative" // Menambahkan posisi relatif untuk menempatkan ikon
            style={{ marginBottom: '20px', borderBottom: '1px solid #cccccc', marginLeft: '100px', marginRight: '100px' }}
          >
            <form onSubmit={handleSubmit}>
              <Box display="flex" alignItems="center" mb={2}>
                <TextField
                  label="Nama"
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  value={signatory.name}
                  onChange={(e) => handleChange(index, 'name', e.target.value)}
                />
                <Box ml={2}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    value={signatory.email}
                    onChange={(e) => handleChange(index, 'email', e.target.value)}
                  />
                </Box>
              </Box>
            </form>
            <IconButton
              style={{ position: 'absolute', top: '-10px', right: '-10px', zIndex: 1 }} 
              onClick={() => handleRemoveSignatory(index)}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      ))}

      <Box display="flex" justifyContent="center">
        <Button
          variant="outlined"
          color="primary"
          onClick={handleAddSignatory}
        >
          Tambahkan Penandatangan
        </Button>
      </Box>

      <Box display="flex" justifyContent="center" mt={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<DownloadOutlinedIcon />}
          onClick={handleSubmit}
        >
          Kirim
        </Button>
      </Box>
    </Box>
  );
};

export default InvitePage;