import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { useEffect, useState } from "react";
import { getRatings } from "../../clients/ratingClients";

const Rating = () => {
  const [ratings, setRatings] = useState<number[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);

  useEffect(() => {
    const fetchRatings = async () => {
      const ratings = await getRatings();
      console.log(ratings);
      setRatings(ratings);
      setAverageRating(Math.round(ratings.reduce((acc: number, curr: number) => acc + curr, 0) / ratings.length * 100) / 100);
      for (let i = 0; i < ratings.length; i++) {
        ratings[i] = Math.round(ratings[i]);
      }
    };
    fetchRatings();

  }, []);

  const calculateStarBarWidth = (targetRating: number) => {
    let count = 0;
    ratings.forEach((rating) => {
      if (rating == targetRating) {
        count++;
      }
    });
    const percentage = Math.round(count / ratings.length * 100);
    return String(percentage)+"%";
  }

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
            {ratings.length == 0 ? (
              <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
                No ratings
              </Typography>
            ) : (
              <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
                {averageRating}
              </Typography>
            )}
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  sx={{
                    fontSize: "1rem",
                    color: i < Math.floor(averageRating) ? "#ffc107" : "#e0e0e0",
                  }}
                />
              ))}
            </Box>
            <Typography variant="body2" color="text.secondary">
              {ratings.length} ratings
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
                        width: calculateStarBarWidth(rating),
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
