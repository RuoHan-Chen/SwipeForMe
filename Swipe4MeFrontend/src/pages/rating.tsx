// Author: RuoHan Chen
// Time spent: 15 minutes

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/rating.css";
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Stack,
  Rating as MuiRating,
} from "@mui/material";

interface RatingCategory {
  label: string;
  description: string;
  name: string;
}

const categories: RatingCategory[] = [
  {
    name: "punctuality",
    label: "Punctuality",
    description:
      "Did the user arrive on time and complete the transaction as agreed?",
  },
  {
    name: "friendliness",
    label: "Friendliness & Politeness",
    description: "Was the user respectful and pleasant during the exchange?",
  },
  {
    name: "satisfaction",
    label: "Overall Satisfaction",
    description: "Would you choose to transact with this person again?",
  },
];

const Rating: React.FC = () => {
  const navigate = useNavigate();
  const [ratings, setRatings] = useState<Record<string, number>>({
    punctuality: 0,
    friendliness: 0,
    satisfaction: 0,
  });

  const handleRatingChange = (category: string, value: number) => {
    setRatings((prev) => ({ ...prev, [category]: value }));
  };

  const handleSubmit = () => {
    console.log("Submitted ratings:", ratings);
    // Submit logic here
  };

  return (
    <Box className="rating-background">
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Stack spacing={3} alignItems="center">
          <Typography
            variant="h4"
            color="white"
            fontWeight="bold"
            textAlign="center"
            sx={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
          >
            Success! Your Swipe Found a Match
          </Typography>

          <Typography
            variant="body1"
            color="white"
            textAlign="center"
            sx={{
              minWidth: 600,
              textShadow: "0 1px 2px rgba(0,0,0,0.3)",
              lineHeight: 1.6,
            }}
          >
            Help us build trust in the community with your quick feedback. Your
            ratings help others feel safe and confident when exchanging swipes —
            and they keep our community respectful, reliable, and kind.
          </Typography>

          <Paper
            elevation={3}
            sx={{
              p: 3,
              width: "100%",
              maxWidth: 480,
              borderRadius: 2,
              backgroundColor: "white",
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              textAlign="center"
              gutterBottom
              sx={{ color: "#333" }}
            >
              Rate Your Experience!
            </Typography>

            <Stack spacing={3} sx={{ mt: 2 }}>
              {categories.map((cat) => (
                <Box key={cat.name}>
                  <Typography
                    variant="h6"
                    fontWeight="medium"
                    sx={{ color: "#333" }}
                  >
                    {cat.label}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {cat.description}
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <MuiRating
                      value={ratings[cat.name]}
                      onChange={(_, value) =>
                        handleRatingChange(cat.name, value || 0)
                      }
                      size="large"
                    />
                  </Box>
                </Box>
              ))}
            </Stack>

            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              sx={{ mt: 4 }}
            >
              <Button
                variant="outlined"
                onClick={() => navigate("/dashboard")}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 1,
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 1,
                  bgcolor: "#25DAC5",
                  "&:hover": {
                    bgcolor: "#10b981",
                  },
                }}
              >
                Submit
              </Button>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
};

export default Rating;
