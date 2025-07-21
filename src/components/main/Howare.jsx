
import { Box, Typography } from '@mui/material';
import "./Howare.css";
const Howare = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        marginTop: "70px",
        maxWidth: "1200px",
        padding: "20px",
       
        margin: "0 auto",
        overflow: "hidden",
        borderRadius: "8px",
      }}
    >
      <Box style={{ direction: "rtl" }}>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "1.8rem",
            fontWeight: "bold",
            marginBottom: "30px",
          }}
        >
          معرض النور للأدوات الكهربائيه
        </Typography>
        <div className="divider" />

        <Typography
          sx={{
            fontSize: "1.3rem",
            fontWeight: "400",
          }}
        >
          {" "}
          معرض النور لتجارة الأدوات الكهربائه بكفر الديب حيث نتعامل مع كبري
          الشركات (السويدي -المهندسين - الفرنسيه - فينوس - سانشي - فلكس - حجازي
          ستار - عز العرب - ردي رونج .......الخ ونتميز ببيع المنتاجات الاصليه
          فقط والبعد عن المنتجات المقلدة
        </Typography>
      </Box>
    </Box>
  );
}

export default Howare;