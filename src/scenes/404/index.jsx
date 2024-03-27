import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import notFoundImage from "../../assets/images/404-error.png"

const NotFoundPage = () => {
  return (
    <Box textAlign="center" mt={5}>
      <Typography variant="h2" gutterBottom>
        Oops! Page Not Found
      </Typography>
      <Box mb={2}>
        <img src={notFoundImage} alt="404 Not Found" style={{ maxWidth: "50%" }} />
      </Box>
      <Typography variant="h5">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </Typography>
      <Box mt={2}>
        <Typography variant="subtitle3">
          Go back to{" "}
          <Link to="/" style={{ textDecoration: "underline" }}>
            Home
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default NotFoundPage;
