"use client";
import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/router";

const theme = createTheme({
  components: {
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: "white", // Default text color
          backgroundColor: "", // Default background color
          "&.Mui-selected": {
            backgroundColor: "primary", // Background color when selected
            color: "white", // Text color when selected
          },
        },
      },
    },
  },
});




type Props = {
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
};

export default function BasicPagination({ count, page, onChange }: Props) {
  
  return (
    <Stack spacing={2} className="text-white">
      <ThemeProvider theme={theme}>
        <Pagination
          count={count}
          page={page}
          onChange={onChange}
          color="primary"
        />
      </ThemeProvider>
      {/* <Pagination count={10} disabled /> */}
    </Stack>
  );
}
