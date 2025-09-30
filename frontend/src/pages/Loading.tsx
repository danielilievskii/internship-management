import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

const Loading = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="80vh"
      width="100%"
    >
      <CircularProgress sx={{ color: "black" }} />
      <Typography variant="body1" mt={2}>
        Loading...
      </Typography>
    </Box>
  );
}

export default Loading;