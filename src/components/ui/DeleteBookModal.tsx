import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { FiTrash2 } from 'react-icons/fi';
import { Button, IconButton } from '@mui/material';
import { CgClose } from 'react-icons/cg';
import { useDeleteBookMutation } from '../../app/services/bookApi';
import { showSuccessToast } from '../../utils/toast';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '5px',
    boxShadow: 24,
    p: 2,
};

export const DeleteBookModal = ({deleteItemId} : {deleteItemId : string}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [deleteBook, {isLoading}] = useDeleteBookMutation()

    const handleDelete = async (id:string) => {
        try {
            await deleteBook(id)
            showSuccessToast("Successfully deleted")
            handleClose()
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <IconButton onClick={handleOpen} color="error" size="small">
                <FiTrash2 />
            </IconButton>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography fontWeight="700">Delete a book</Typography>
                            <IconButton onClick={handleClose} size="small">
                                <CgClose />
                            </IconButton>
                        </Box>
                        <Typography>
                            Do you want to delete this book?
                        </Typography>
                        <Box display="flex" justifyContent="end" gap={1} mt={"15px"}>
                            <Button sx={{ px: "20px" }} variant="outlined" onClick={handleClose} size="small">Close</Button>
                            <Button disabled={isLoading} onClick={() => handleDelete(deleteItemId)} sx={{ px: "20px", boxShadow : "none" }} color='error' type="submit" variant="contained" size="small">Delete</Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default DeleteBookModal