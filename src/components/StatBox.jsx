import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
// import ProgressCircle from "./ProgressCircle";

const StatBox = ({ title, subtitle, icon }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" alignItems="center">
        <Box sx={{ marginRight: "30px" }}>{icon}</Box>
        <Box>
          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {title}
          </Typography>
          <Typography variant="h4" sx={{ color: colors.greenAccent[500] }}>
            {subtitle}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default StatBox;