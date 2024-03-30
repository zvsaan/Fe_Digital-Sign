import React, { useState } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";

const DocumentForm = () => {
  const [document, setDocument] = useState(null);

  const handleDocumentChange = (event) => {
    const file = event.target.files[0];
    setDocument(file);
  };

  const handleSubmit = () => {
    // Lakukan sesuatu dengan dokumen yang diunggah, misalnya mengirim ke server
    console.log("Dokumen yang diunggah:", document);
  };

  return (
    <Box
      gridColumn="span 12"
      mt={4}
      display="flex"
      justifyContent="center"
      alignItems="center"
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
          disabled={!document}
        >
          Unggah
        </Button>
      </Box>
    </Box>
  );
};

export default DocumentForm;