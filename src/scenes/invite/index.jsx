import { Box, Button, TextField, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";

const InvitePage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleSubmit = () => {
    // Logika untuk mengirim undangan
    console.log('Form telah disubmit');
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Undang Penandatangan" subtitle="Please invite Signatories" />
      </Box>
      <Box display="flex" mt={3}>
        <Box
          border={1}
          borderRadius={1}
          p={3}
          borderColor="#cccccc"
        >
          <form onSubmit={handleSubmit}>
            <Box display="flex" alignItems="center" mb={2}>
              <TextField
                label="Nama"
                variant="outlined"
                fullWidth
                margin="dense"
              />
              <Box ml={2}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="dense"
                />
              </Box>
            </Box>
            <Box display="flex" justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                startIcon={<DownloadOutlinedIcon />}
                type="submit"
              >
                Kirim
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default InvitePage;