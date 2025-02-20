import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
    const navigate = useNavigate();

    return (
        <Button variant="contained" color="primary" startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} // Regresa a la página anterior
            sx={{ mt: 2, height: 37 }}>Volver</Button>
    );
};

export default BackButton;