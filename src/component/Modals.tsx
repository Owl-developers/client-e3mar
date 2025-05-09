
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { useState } from 'react';
import React from 'react';
import { useModalsContext } from '../Root';

interface ErrorModalProps {
    open: boolean;

    title?: string;
    message: string;
}

export function AlertModal() {
    const {open,title,message} = useModalsContext()
    const type = title == 'Error' ? 'error-modal' : 'success-modal'
    return (
        <React.Fragment>
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                color='red'
        >
            <DialogTitle id="alert-dialog-title">
                <div className={`dialog-title ${type}`}>
                    {title}
                </div>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <div className='dialog-content '>
                        {message}
                    </div>
                </DialogContentText>
            </DialogContent>
            {/* <DialogActions>
                <Button onClick={onClose} autoFocus>
                    OK
                </Button>
                </DialogActions> */}
            </Dialog>
        </React.Fragment>
    );
}

// export default function useErrorModal() {
//     const [open, setOpen] = useState(false);
//     const [message, setMessage] = useState('');
//     const [title, setTitle] = useState('Error');

//     const showError = (_message: any, _title: string) => {
//         setMessage(_message);
//         setTitle(_title);
//         setOpen(true);
//     };

//     const hideError = () => {
//         setOpen(false);
//     };

//     return {
//         ErrorModal: () => (
//             <AlertModal 
//                 open={open} 
//                 message={message} 
//                 title={title} 
//             />
//         ),
//         showError,
//         hideError
//     };
// }
function Modals() {
    return (
        <div>
            <h1>Modals</h1>
        </div>
    )
}
