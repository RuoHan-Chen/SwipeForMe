// Author: Cici L
// Time spent: 15 minutes

import React, { useState } from "react";
import {
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  IconButton,
  InputAdornment,
  Grid2,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import EditIcon from "@mui/icons-material/Edit";

interface Transaction {
  id: string;
  name: string;
  email: string;
  diningHall: string;
  date: string;
  time: string;
  status: "completed" | "pending" | "canceled";
  rating?: number;
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    name: "Jane Cooper",
    email: "jane@vanderbilt.edu",
    diningHall: "Rand",
    date: "2025/3/27",
    time: "1:00 PM - 2:00 PM",
    status: "completed",
    rating: 5.0,
  },
  {
    id: "2",
    name: "Floyd Miles",
    email: "floyd@vanderbilt.edu",
    diningHall: "Rand",
    date: "2025/3/27",
    time: "1:00 PM - 2:00 PM",
    status: "pending",
  },
  {
    id: "3",
    name: "Ronald Richards",
    email: "ronald@vanderbilt.edu",
    diningHall: "Rand",
    date: "2025/3/27",
    time: "1:00 PM - 2:00 PM",
    status: "canceled",
  },
  {
    id: "4",
    name: "Steven Yi",
    email: "steven.yi@vanderbilt.edu",
    diningHall: "Rand",
    date: "2025/3/27",
    time: "2:00 PM - 3:00 PM",
    status: "completed",
  },
];

const TransactionHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Calculate completed transactions
  // const completedTransactions = mockTransactions.filter(t => t.status === "completed").length;
  // const totalTransactions = mockTransactions.length;

  const getStatusButtonStyle = (status: Transaction["status"]) => {
    switch (status) {
      case "completed":
        return {
          bgcolor: "#25DAC5",
          color: "#FFFFFF",
          border: "1px solid #25DAC5",
          minWidth: "100px",
          height: "29.15px",
          fontSize: "14.2588px",
        };
      case "pending":
        return {
          bgcolor: "#F4F4F4",
          color: "#757171",
          border: "1px solid #757171",
          minWidth: "100px",
          height: "29.15px",
          fontSize: "14.2588px",
        };
      case "canceled":
        return {
          bgcolor: "rgba(233, 58, 61, 0.7)",
          color: "#FFFFFF",
          border: "1px solid #E93A3D",
          minWidth: "100px",
          height: "29.15px",
          fontSize: "14.2588px",
        };
      default:
        return {};
    }
  };

  const getRateButtonStyle = () => ({
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "4.07393px 12px 4.07393px 12.2218px",
    gap: "5px",
    width: "80px",
    height: "29.15px",
    background: "#FFFFFF",
    border: "1.01848px solid #482BE7",
    borderRadius: "4.07393px",
    textTransform: "none",
    "&:hover": {
      background: "#FFFFFF",
    },
  });

  return (
    <div style={{ paddingTop: "50px" }}>
      <TableContainer
        component={Paper}
        style={{
          width: "80%",
          margin: "0 auto",
          borderRadius: "30px",
          maxHeight: "650px",
          minHeight: "600px",
          overflowY: "auto",
          position: "relative",
        }}
      >
        {/* Header */}
        <Grid2
          container
          alignItems="center"
          justifyContent="space-between"
          style={{ width: "90%", margin: "0 auto", paddingTop: "20px" }}
        >
          <Grid2>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Poppins",
                fontWeight: 600,
                fontSize: "22.4066px",
                lineHeight: "34px",
                color: "#000000",
              }}
            >
              All Students
            </Typography>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: 400,
                fontSize: "14.2588px",
                lineHeight: "21px",
                color: "#16C098",
              }}
            >
              Active Students
            </Typography>
          </Grid2>
          <Grid2>
            <TextField
              placeholder="Search"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      sx={{
                        color: "#7E7E7E",
                        width: "24.59px",
                        height: "21.7px",
                        "& path": {
                          strokeWidth: "2.03697px",
                        },
                      }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                width: "216px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10.1848px",
                  bgcolor: "#F9FBFF",
                  "& fieldset": {
                    borderColor: "#F9FBFF",
                  },
                  "&:hover fieldset": {
                    borderColor: "#F9FBFF",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#F9FBFF",
                  },
                },
                "& .MuiInputBase-input": {
                  fontFamily: "Poppins",
                  fontSize: "12px",
                  color: "#7E7E7E",
                  "&::placeholder": {
                    color: "#7E7E7E",
                    opacity: 1,
                  },
                },
              }}
            />
          </Grid2>
        </Grid2>

        {/* Table */}
        <div
          style={{
            width: "90%",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#B5B7C0", bgcolor: "white" }}>
                  Name & Email
                </TableCell>
                <TableCell
                  sx={{
                    color: "#B5B7C0",
                    bgcolor: "white",
                    textAlign: "center",
                  }}
                >
                  Dining Hall
                </TableCell>
                <TableCell
                  sx={{
                    color: "#B5B7C0",
                    bgcolor: "white",
                    textAlign: "center",
                  }}
                >
                  Date
                </TableCell>
                <TableCell
                  sx={{
                    color: "#B5B7C0",
                    bgcolor: "white",
                    textAlign: "center",
                  }}
                >
                  Time
                </TableCell>
                <TableCell
                  sx={{
                    color: "#B5B7C0",
                    bgcolor: "white",
                    textAlign: "center",
                  }}
                >
                  Status
                </TableCell>
                <TableCell sx={{ color: "#B5B7C0", bgcolor: "white" }}>
                  Rating
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <Box>
                      <Typography
                        sx={{
                          fontFamily: "Poppins",
                          fontWeight: 500,
                          fontSize: "14.2588px",
                          lineHeight: "21px",
                          color: "#292D32",
                        }}
                      >
                        {transaction.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "Poppins",
                          fontSize: "12px",
                          lineHeight: "18px",
                          color: "rgba(41, 45, 50, 0.8)",
                        }}
                      >
                        {transaction.email}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">{transaction.diningHall}</TableCell>
                  <TableCell align="center">{transaction.date}</TableCell>
                  <TableCell align="center">{transaction.time}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Button
                      size="small"
                      sx={{
                        ...getStatusButtonStyle(transaction.status),
                        textTransform: "none",
                        fontFamily: "Poppins",
                        fontWeight: 500,
                      }}
                    >
                      {transaction.status.charAt(0).toUpperCase() +
                        transaction.status.slice(1)}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {transaction.status === "completed" &&
                        !transaction.rating && (
                          <Button size="small" sx={getRateButtonStyle()}>
                            <EditIcon
                              sx={{
                                width: "15px",
                                height: "15px",
                                opacity: 0.6,
                                color: "#482BE7",
                                "& path": {
                                  border: "1.2px solid #482BE7",
                                },
                              }}
                            />
                            <Typography
                              sx={{
                                fontFamily: "Poppins",
                                fontStyle: "normal",
                                fontWeight: 500,
                                fontSize: "14.2588px",
                                lineHeight: "21px",
                                display: "flex",
                                alignItems: "flex-end",
                                letterSpacing: "-0.01em",
                                color: "#482BE7",
                              }}
                            >
                              Rate
                            </Typography>
                          </Button>
                        )}
                      {transaction.rating && (
                        <>
                          <Typography
                            sx={{
                              fontFamily: "Poppins",
                              fontWeight: 500,
                              fontSize: "14.2588px",
                              lineHeight: "21px",
                              color: "#292D32",
                            }}
                          >
                            {transaction.rating}
                          </Typography>
                          <EditIcon sx={{ color: "#482BE7", fontSize: 14 }} />
                        </>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination Info */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              borderBottom: "1px solid #EEEEEE",
              py: 2,
              px: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography
                sx={{
                  color: "#000000",
                  fontFamily: "Poppins",
                  fontSize: "14px",
                }}
              >
                1-2 of 2
              </Typography>
              <IconButton
                size="small"
                sx={{
                  width: "25px",
                  height: "25px",
                  padding: 0,
                  color: "#B5B7C0",
                }}
              >
                <KeyboardArrowDownIcon
                  sx={{
                    transform: "rotate(90deg)",
                    fontSize: "20px",
                  }}
                />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  width: "25px",
                  height: "25px",
                  padding: 0,
                  color: "#B5B7C0",
                }}
              >
                <KeyboardArrowDownIcon
                  sx={{
                    transform: "rotate(-90deg)",
                    fontSize: "20px",
                  }}
                />
              </IconButton>
            </Box>
          </Box>
        </div>
      </TableContainer>
    </div>
  );
};

export default TransactionHistory;
