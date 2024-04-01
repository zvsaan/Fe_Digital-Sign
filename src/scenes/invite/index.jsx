import React, { useState } from 'react';
import { Box, Button, Typography, TextField } from "@mui/material";
import Header from '../../components/Header';

const InvitePage = () => {
  const [email, setEmail, document, setDocument] = useState(null);

  const sendInvite = () => {
    // Implement code to send invite
    alert(`Invite sent to ${email}`);
  };

  const handleDocumentChange = (event) => {
    const file = event.target.files[0];
    setDocument(file);
  };

  const handleSubmit = () => {
    // Lakukan sesuatu dengan dokumen yang diunggah, misalnya mengirim ke server
    console.log("Dokumen yang diunggah:", document);
  };

  return (
    <Box m="20px">
      <Header title="INVITE SIGN" subtitle="Invite User Digital Sign" />

<Box
      gridColumn="span 9"
      mt={4}
      display="flex"
      justifyContent="left"
      alignItems="left"
    >
        <Box width="80%">
        <Typography variant="h6" gutterBottom>
          Unggah Dokumen PDF
        </Typography>
        <Box display="flex" alignItems="center" mb={2}>
          <TextField
            type="file"
            onChange={handleDocumentChange}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            fullWidth
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!document}>Unggah
        </Button>
        <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Masukkan alamat Email tujuan"
      />
      
      <Button 
      variant="contained"
      color="primary"
      onClick={sendInvite}>Send Invite</Button>
      </Box>
      </Box>
      </Box>
  );
};

export default InvitePage;
