import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import { withStyles } from "@material-ui/styles";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const styles = {
  documentContainer: {
    border: "2px solid #ccc", // Warna border sedikit lebih gelap
    padding: "16px",
    marginBottom: "16px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)", // Menambahkan bayangan
  },
};

const DocumentViewer = ({ classes }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [document, setDocument] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleDocumentChange = (event) => {
    const file = event.target.files[0];
    setDocument(file);
  };

  const nextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const prevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Dokumen PDF
      </Typography>
      <Box>
        <input
          accept="application/pdf"
          id="contained-button-file"
          type="file"
          onChange={handleDocumentChange}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
            Pilih Dokumen
          </Button>
        </label>
      </Box>
      {document && (
        <Box className={classes.documentContainer}>
          <Document file={document} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button onClick={prevPage} disabled={pageNumber <= 1}>
              Previous
            </Button>
            <Typography>
              Page {pageNumber} of {numPages}
            </Typography>
            <Button onClick={nextPage} disabled={pageNumber >= numPages}>
              Next
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default withStyles(styles)(DocumentViewer);