import { CgPlayListAdd } from "react-icons/cg"; 
import { TbListSearch } from "react-icons/tb";
import { Box, Grid, Typography } from '@mui/material';
import type { JSX } from 'react';
import Header from '../components/layout/Header';
import CardBook from '../components/ui/CardBook';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import type { IBook } from '../utils/types/book.type';
import CreateBookModal from '../components/ui/CreateBookModal';

const Home = (): JSX.Element => {
  const { books, filterBooks, filterStatus } = useSelector((state: RootState) => state.book)

  return (
    <Box color={"white"}>
      <Header />
      <Box mt={"10px"}>
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
          <Box fontSize={"20px"} fontWeight={"700"}>
            You’ve got <span style={{ color: "#6200EE" }}>{books.length} book</span>
          </Box>
          <Box>
            <CreateBookModal />
          </Box>
        </Box>
        <Box fontSize={"14px"} my={"5px"}>
          Your books today
        </Box>
        {filterStatus ?
          filterBooks.length > 0 ?
            <Grid py={"20px"} container spacing={{ xs: 1, md: 2, lg: 3 }} columns={{ xs: 1, sm: 2, md: 3 }}>
              {filterBooks.map((item: IBook) => (
                <Grid key={item.id} size={{ xs: 1 }}>
                  <CardBook bookData={item} />
                </Grid>
              ))}
            </Grid>
            :
            <Box display={"flex"} minHeight={"60vh"} justifyContent={"center"} alignItems={"center"}>
              <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} gap={"5px"}>
                <Box fontSize={"40px"} color={"gray"}>
                  <TbListSearch />
                </Box>
                <Typography variant="h6" color="gray" fontWeight={"700"}>
                  No results found
                </Typography>
              </Box>
            </Box>
          :
          books.length > 0 ?
            <Grid py={"20px"} container spacing={{ xs: 1, md: 2, lg: 3 }} columns={{ xs: 1, sm: 2, md: 3 }}>
              {books.map((item: IBook) => (
                <Grid key={item.id} size={{ xs: 1 }}>
                  <CardBook bookData={item} />
                </Grid>
              ))}
            </Grid>
            :
            <Box display={"flex"} minHeight={"60vh"} justifyContent={"center"} alignItems={"center"}>
              <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} gap={"5px"}>
                <Box fontSize={"40px"} color={"gray"}>
                  <CgPlayListAdd />
                </Box>
                <Typography variant="h6" color="gray" fontWeight={"700"}>
                  Add a book
                </Typography>
              </Box>
            </Box>}
      </Box>
    </Box >
  );
};

export default Home;