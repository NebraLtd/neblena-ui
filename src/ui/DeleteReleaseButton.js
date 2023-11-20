import React from "react";
import { useNotify, useRedirect } from 'react-admin';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Form } from 'react-final-form';
import { useDeleteRelease, useDeleteReleaseBulk } from "../lib/release";

export const DeleteReleaseButton = ({basePath, ...props}) => {
    
    const [open, setOpen] = React.useState(false);
    const notify = useNotify();
    const redirect = useRedirect();
    const deleteRelease = useDeleteRelease();
    const deleteReleaseBulk = useDeleteReleaseBulk();

    const handleSubmit = async values => {
        if (props.selectedIds) {
            await deleteReleaseBulk(props.selectedIds);
        } else {
            await deleteRelease(props.record);
        }
        setOpen(false);
        notify('Release(s) successfully deleted');
        redirect(props.redirect, basePath);    
    };
    
    return (
        <>
        <Button onClick={() => setOpen(true)} variant={props.variant || "contained"} color="inherit" size={props.size} sx={props.sx}>
            <DeleteIcon sx={{ mr: '4px' }} size={props.size}/> { props.children }
        </Button> 
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="form-dialog-title"
        >
        <DialogTitle id="form-dialog-title"> Delete Release(s) </DialogTitle>
        <DialogContent>
            Note: this action will be irreversible<br/><br/>
            <Form
                onSubmit={handleSubmit}
                render={({handleSubmit, form, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit}>
                        <Button variant="contained" color="primary" type="submit" disabled={submitting}>
                            Confirm Delete
                        </Button>
                    </form>
                )}
            />
        </DialogContent>        
        </Dialog>
        </>        
    );
}

export default DeleteReleaseButton;