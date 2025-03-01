import { Container, Typography, Button, Card, CardMedia, CardContent, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import img1 from '../assets/images/background.jpeg'

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="md" sx={{ textAlign: "center", py: 4 }}>
      <Box sx={{ bgcolor: "primary.main", color: "white", py: 4, borderRadius: 2 }}>
        <Typography variant="h3" gutterBottom>
          Welcome to the Student Management System
        </Typography>
        <Typography variant="h6">Manage and view student records with ease.</Typography>
      </Box>
      
      <Card sx={{ mt: 4, position: "relative" }}>
        <CardMedia
          component="img"
          height="400"
          image={img1}
          alt="Student Management"
        />
        <CardContent sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", bgcolor: "rgba(0, 0, 0, 0.6)", color: "white", p: 2, borderRadius: 2 }}>
          <Typography variant="h4">Efficient. Secure. User-Friendly.</Typography>
          <Typography>Seamlessly manage student data with our intuitive interface.</Typography>
        </CardContent>
      </Card>
      
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 4 }}>
        <Button variant="contained" color="primary" size="large" onClick={()=>navigate('/students')}>View Students</Button>
      </Box>
    </Container>
  );
};

export default HomePage;