import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import type { JSX } from 'react';
import type { IBook } from '../../utils/types/book.type';
import DeleteBookModal from "./DeleteBookModal";
import UpdateBookModal from "./UpdateBookModal";

interface ICardBookProps {
    bookData: IBook
}

const CardBook = ({ bookData }: ICardBookProps): JSX.Element => {
    return (
        <Card sx={{ boxShadow: '0px 4px 24px 0px #33333314', borderRadius: "12px", position : "relative" }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="100"
                    image={bookData.image}
                    alt={bookData.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" fontSize={"16px"} component="div" fontWeight={"700"}>
                        {bookData.title}
                    </Typography>
                    <Typography fontSize={"12px"}>
                        <span>Published</span> : <span>{bookData.published}</span>
                    </Typography>
                    <Typography fontSize={"12px"}>
                        <span>Pages</span> : <span>{bookData.pages}</span>
                    </Typography>
                    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                        <Typography fontSize={"12px"}>
                            <span>Author</span> : <span>{bookData.author}</span>
                        </Typography>
                        <Typography px={"8px"} fontWeight={"700"} color={"white"} fontSize={"12px"} borderRadius={"5px"} bgcolor={bookData.status === "new" ? "red" : bookData.status === "reading" ? "orange" : "green"}>
                            {bookData.status}
                        </Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
            <Box position={"absolute"} display={"flex"} flexDirection={"column"} alignItems={"center"} gap={"3px"} right={"10px"} top={"10px"} bgcolor={"rgba(255,255,255,1)"} boxShadow={"0px 4px 14px 0px #33333314"} p={"3px"} borderRadius={"5px"}>
                <DeleteBookModal deleteItemId={bookData.id}/>
                <UpdateBookModal updateItem={bookData}/>
            </Box>
        </Card>
    );
};

export default CardBook;