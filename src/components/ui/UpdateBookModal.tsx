// imports (o'zgartirilmagan)
import { CgClose } from "react-icons/cg";
import * as React from 'react';
import {
    Backdrop, Box, Modal, Fade, Button, Typography,
    FormControl, FormHelperText, FormLabel, IconButton,
    MenuItem, OutlinedInput, Select
} from '@mui/material';
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { showSuccessToast } from "../../utils/toast";
import { useUpdateBookMutation } from "../../app/services/bookApi";
import { BiEditAlt } from "react-icons/bi";
import type { IBook } from "../../utils/types/book.type";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: "350px", sm: "400px" },
    bgcolor: 'background.paper',
    borderRadius: '5px',
    boxShadow: 24,
    p: 2,
};


const validationSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters").max(20, "Title must be at most 20 characters"),
    author: z.string().min(3, "Author must be at least 3 characters").max(20, "Author must be at most 20 characters"),
    published: z.coerce.number().min(1000, "Published year must be >= 1000").max(9999, "Published year must be <= 9999"),
    pages: z.coerce.number().min(10, "Pages must be at least 10").max(999, "Pages must be at most 999"),
    status: z.enum(["new", "reading", "finished"], {
        errorMap: () => ({ message: "Status is required" }),
    }),
    image: z
        .any()
        .optional()  // required emas
        .refine((files) => {
            if (!files || files.length === 0) return true; // file tanlanmagan bo'lsa, o'k
            const allowedTypes = ["image/jpeg", "image/png"];
            return allowedTypes.includes(files[0].type);
        }, {
            message: "Only .jpg and .png formats are allowed",
        })
        .refine((files) => {
            if (!files || files.length === 0) return true;
            return files[0].size <= 1024 * 1024;
        }, {
            message: "Image must be less than or equal to 1MB",
        }),
});


type TValidationSchema = z.infer<typeof validationSchema>;

export const UpdateBookModal = ({ updateItem }: { updateItem: IBook }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        watch,
        control
    } = useForm<TValidationSchema>({
        resolver: zodResolver(validationSchema),
        defaultValues: {
            title: updateItem.title,
            author: updateItem.author,
            published: updateItem.published,
            pages: updateItem.pages,
            status: updateItem.status,
        },
    });

    React.useEffect(() => {
        if (updateItem) {
            reset({
                title: updateItem.title,
                author: updateItem.author,
                published: updateItem.published,
                pages: updateItem.pages,
                status: updateItem.status,
            });
        }
    }, [updateItem]);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        reset()
    };

    const [updateBook] = useUpdateBookMutation();

    const onSubmit = async (data: TValidationSchema) => {
        try {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("author", data.author);
            formData.append("published", data.published.toString());
            formData.append("pages", data.pages.toString());
            formData.append("status", data.status);


            if (data.image && data.image.length > 0) {
                formData.append("image", data.image[0]);
            } else {
                formData.append("imageUrl", updateItem.image || "");
            }

            await updateBook({ id: updateItem.id, formData });
            showSuccessToast("Book updated successfully");
            handleClose();
        } catch (error) {
            console.error("Update error:", error);
        }
    };

    return (
        <>
            <IconButton onClick={handleOpen} color="info" size="small">
                <BiEditAlt />
            </IconButton>
            <Modal open={open} onClose={handleClose} closeAfterTransition slots={{ backdrop: Backdrop }} slotProps={{ backdrop: { timeout: 500 } }}>
                <Fade in={open}>
                    <Box sx={style}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography fontWeight="700">Update a book</Typography>
                            <IconButton onClick={handleClose} size="small">
                                <CgClose />
                            </IconButton>
                        </Box>

                        <Box mt={1}>
                            {!watch("image")?.length && updateItem.image && (
                                <Box textAlign="center">
                                    <img
                                        src={updateItem.image}
                                        alt="Current book cover"
                                        style={{ width: "100%", maxHeight: 100, objectFit: "cover", borderRadius: "5px", border: "1px solid #999999" }}
                                    />
                                    <Typography variant="caption" display="block">Current image</Typography>
                                </Box>
                            )}

                            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                                <Box display="flex" flexDirection="column">

                                    <FormControl fullWidth error={!!errors.title}>
                                        <FormLabel sx={{ fontSize: "14px" }}>Title</FormLabel>
                                        <OutlinedInput sx={{ fontSize: "14px" }} {...register("title")} placeholder="Enter the title" size="small" />
                                        <FormHelperText sx={{ m: "0", minHeight: "10px", fontSize: "12px" }}>{errors.title?.message}</FormHelperText>
                                    </FormControl>


                                    <FormControl fullWidth error={!!errors.author}>
                                        <FormLabel sx={{ fontSize: "14px" }}>Author</FormLabel>
                                        <OutlinedInput sx={{ fontSize: "14px" }} {...register("author")} placeholder="Enter the author" size="small" />
                                        <FormHelperText sx={{ m: "0", minHeight: "10px", fontSize: "12px" }}>{errors.author?.message}</FormHelperText>
                                    </FormControl>


                                    <Box display={"flex"} gap={"10px"}>
                                        <FormControl fullWidth error={!!errors.published}>
                                            <FormLabel sx={{ fontSize: "14px" }}>Published Year</FormLabel>
                                            <OutlinedInput sx={{ fontSize: "14px" }} type="number" {...register("published")} placeholder="e.g. 2023" size="small" />
                                            <FormHelperText sx={{ m: "0", minHeight: "10px", fontSize: "12px" }}>{errors.published?.message}</FormHelperText>
                                        </FormControl>


                                        <FormControl fullWidth error={!!errors.pages}>
                                            <FormLabel sx={{ fontSize: "14px" }}>Pages</FormLabel>
                                            <OutlinedInput sx={{ fontSize: "14px" }} type="number" {...register("pages")} placeholder="e.g. 250" size="small" />
                                            <FormHelperText sx={{ m: "0", minHeight: "10px", fontSize: "12px" }}>{errors.pages?.message}</FormHelperText>
                                        </FormControl>
                                    </Box>


                                    <FormControl fullWidth error={!!errors.status}>
                                        <FormLabel sx={{ fontSize: "14px" }}>Status</FormLabel>
                                        <Controller
                                            name="status"
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    {...field}
                                                    sx={{ fontSize: "14px" }}
                                                    size="small"
                                                >
                                                    <MenuItem sx={{ fontSize: "14px" }} value="new">New</MenuItem>
                                                    <MenuItem sx={{ fontSize: "14px" }} value="reading">Reading</MenuItem>
                                                    <MenuItem sx={{ fontSize: "14px" }} value="finished">Finished</MenuItem>
                                                </Select>
                                            )}
                                        />
                                        <FormHelperText sx={{ m: "0", minHeight: "10px", fontSize: "12px" }}>
                                            {errors.status?.message}
                                        </FormHelperText>
                                    </FormControl>



                                    <FormControl fullWidth error={!!errors.image}>
                                        <FormLabel sx={{ fontSize: "14px" }}>Image</FormLabel>
                                        <OutlinedInput sx={{ fontSize: "14px" }}
                                            type="file"
                                            {...register("image")}
                                            inputProps={{ accept: "image/jpeg, image/png" }} // <-- format filter
                                            size="small"
                                        />
                                        <FormHelperText sx={{ m: "0", minHeight: "10px", fontSize: "12px" }}>
                                            {typeof errors.image?.message === "string" ? errors.image.message : ""}
                                        </FormHelperText>
                                    </FormControl>


                                    <Box display="flex" justifyContent="end" gap={1}>
                                        <Button sx={{ px: "20px" }} variant="outlined" onClick={handleClose} size="small">Close</Button>
                                        <Button sx={{ px: "20px" }} type="submit" variant="contained" size="small" disabled={isSubmitting}>Update</Button>
                                    </Box>
                                </Box>
                            </form>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
};

export default UpdateBookModal;
