import { Box, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Mengimpor useNavigate dari react-router-dom
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

const UploadDocumentForm = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate(); // Menggunakan useNavigate untuk navigasi

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Mengirim file ke API (Anda perlu menggantinya dengan implementasi yang sesuai)
    if (file) {
      const formData = new FormData();
      formData.append("pdfFile", file);
      fetch("URL_API_ANDA", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle respon dari API (jika diperlukan)
          console.log(data);
          // Navigasi ke halaman /invite setelah dokumen diunggah
          navigate("/invite"); // Menggunakan navigate untuk navigasi
        })
        .catch((error) => {
          // Handle error
          console.error("Error:", error);
        });
    }
  };

  return (
    <Box
      mt="20px"
      textAlign="center"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
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