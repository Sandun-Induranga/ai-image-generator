import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ py: 2, textAlign: "center" }}>
      <Typography variant="body2" color="textSecondary">
        © 2025 Sandun Induranga | Powered by Hugging Face
      </Typography>
    </Box>
  );
};

export default Footer;
