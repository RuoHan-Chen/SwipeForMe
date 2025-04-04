import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";

const Rating = () => {
  const userData = {
    name: "RuoHan Chen",
    email: "Ruohan@gamil.com",
    phone: "+1 7306185390",
    age: 21,
    class: "Sophomore",
    rating: 4.5,
    ratingCount: 256,
  };

  return (
    <Grid size={6}>
      <Paper sx={{ 
        p: 3, 
        borderRadius: 4,
        height: '220px', // Match profile card height
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Your Community Rating
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Based on punctuality, politeness, and overall experience.
        </Typography>

        <Grid container alignItems="flex-start" spacing={2} sx={{ flex: 1 }}>
          <Grid size={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
              {userData.rating}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  sx={{
                    fontSize: "1rem",
                    color: i < Math.floor(userData.rating) ? "#ffc107" : "#e0e0e0",
                  }}
                />
              ))}
            </Box>
            <Typography variant="body2" color="text.secondary">
              {userData.ratingCount} ratings
            </Typography>
          </Grid>
          <Grid size={8} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {[5, 4, 3, 2, 1].map((rating) => (
              <Grid container alignItems="center" key={rating} sx={{ mb: 1 }}>
                <Grid size={1}>
                  <Typography variant="body2">{rating}</Typography>
                </Grid>
                <Grid size={11}>
                  <Box
                    sx={{
                      height: 6,
                      width: "100%",
                      bgcolor: "#e0e0e0",
                      borderRadius: 3,
                      position: "relative",
                      overflow: 'hidden'
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: "100%",
                        width:
                          rating === 5
                            ? "90%"
                            : rating === 4
                            ? "30%"
                            : rating === 3
                            ? "15%"
                            : rating === 2
                            ? "5%"
                            : "10%",
                        bgcolor: "#673ab7",
                        borderRadius: 3,
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Rating;
