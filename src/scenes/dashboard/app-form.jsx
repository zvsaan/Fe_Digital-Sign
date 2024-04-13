import { Box, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

const UploadDocumentForm = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (file) {
      const formData = new FormData();
        formData.append("file", file);
        fetch("http://localhost:8000/api/files", {
            method: "POST",
            body: formData,
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            navigate("/invite");
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    }
  };

  return (
    <Box
      mt="20px"
      textAlign="center"
    >
      <form
        style={{
          border: "2px dashed #ccc",
          padding: "20px",
          margin: "0 auto",
          maxWidth: "1100px",
          height: "280px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <p style={{ fontSize: "18px", marginBottom: "10px", textAlign: "center" }}>Upload Dokumen</p>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <input
            type="file"
            name="file"
            accept=".pdf"
            onChange={handleFileUpload}
            style={{ display: "none" }}
            id="fileInput"
          />
          <label htmlFor="fileInput">
            Drag & Drop atau Klik di sini untuk mengunggah file
          </label>
        </div>
        {file && (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<DownloadOutlinedIcon />}
            style={{ width: "200px", margin: "0 auto" }}
          >
            Upload PDF
          </Button>
        )}
      </form>
    </Box>
  );
};

export default UploadDocumentForm;
