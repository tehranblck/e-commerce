// components/ui/shared/BasicPagination.tsx
"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter, useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();

  useEffect(() => {
    const pageParam = searchParams.get("page");
    if (pageParam) {
      setCurrentPage(parseInt(pageParam, 10));
    } else {
      setCurrentPage(1);
    }
  }, [searchParams]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
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
