"use client";

import * as React from "react";
import { useEffect, useState } from "react";
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
            backgroundColor: "#1976d2", // MUI primary rengi
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
  onChange?: (value: number) => void;
};

export default function BasicPagination({ count, page, onChange }: Props) {
  const [currentPage, setCurrentPage] = useState<number>(page);
  const router = useRouter();

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    if (onChange) {
      onChange(value);
    }
    router.push(`?page=${value}`);
  };

  return (
    <Stack spacing={2} className="dark:bg-[#121212] bg-gray-600 py-2 px-3 rounded-full">
      <ThemeProvider theme={theme}>
        <Pagination
          count={count}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          className="text-green-800"
        />
      </ThemeProvider>
    </Stack>
  );
}
