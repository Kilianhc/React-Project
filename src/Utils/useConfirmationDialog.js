import { useState } from "react";

export default function useConfirmationDialog() {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [selectedMovieId, setSelectedMovieId] = useState(null)

    const handleOpenDialog = (movieId) => {
        setSelectedMovieId(movieId)
        setDialogOpen(true)
    }

    const handleCloseDialog = () => {
        setDialogOpen(false)
        setSelectedMovieId(null)
    }

    return {
        dialogOpen, selectedMovieId, handleOpenDialog, handleCloseDialog
    }
}