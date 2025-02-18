import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

export default function ConfirmationDialog({open, onClose, onConfirm, title, message}) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{message}</DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={onConfirm} color="error">
                    Aceptar
                </Button>
            </DialogActions>
        </Dialog>
    )
}