




import { Box, Typography, IconButton } from "@mui/material";
import {
  Facebook,

} from "@mui/icons-material";

const socialLinks = [
  {
    name: "Facebook",
    icon: <Facebook />,
    link: "https://www.facebook.com/profile.php?id=100083448092680&mibextid=JRoKGi",
  },

  { name: "WhatsApp", icon: <WhatsApp />, link: "https://wa.me/01096996792" },
  { name: "Telegram", icon: <Telegram />, link: "https://t.me" },
];

const Callme = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        width: "100%",
        maxWidth: "300px",
        margin: "50px auto",
        padding: "20px",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        
      }}
    >
 
      <Typography variant="h5" fontWeight="bold" mb={2} color="primary">
        تواصل معنا
      </Typography>


      <Box sx={{ display: "flex", justifyContent: "center", gap: 4 }}>
        {socialLinks.map((item) => (
          <IconButton
            key={item.name}
            component="a"
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
            sx={{
              backgroundColor: "#fff",
              boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
              "&:hover": { backgroundColor: "#e0e0e0" },
            }}
          >
            {item.icon}
          </IconButton>
        ))}
      </Box>
    </Box>
  );
};

export default Callme;
