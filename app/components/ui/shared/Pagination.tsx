"use client";

import * as React from "react";
import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/navigation";

const theme = createTheme({
  components: {
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: "white",
          "&.Mui-selected": {
            backgroundColor: "primary",
            color: "white",
          },
        },
      },
    },
  },
});

type Props = {
  count: number;
  page: number;
};

export default function BasicPagination({ count, page }: Props) {
  const [currentPage, setCurrentPage] = useState<number>(page);
  const router = useRouter();

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value);
    router.push(`?page=${value}`);
  };

  return (
    <Stack spacing={2} className="text-white">
      <ThemeProvider theme={theme}>
        <Pagination
          count={count}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </ThemeProvider>
    </Stack>
  );
}
