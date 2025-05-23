// Author: Cici L
// Time spent: 15 minutes

import React, { useEffect, useState } from "react";
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
  IconButton,
  Grid2,
  FormControl,
  Select,
  OutlinedInput,
  MenuItem,
  InputLabel,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import EditIcon from "@mui/icons-material/Edit";
import { Transaction } from "../types";
import {
  awaitReviewTransaction,
  TransactionStatus,
} from "../clients/transactionClient";
import { getCurrentUserTransactionsAsSeller } from "../clients/transactionClient";
import { getCurrentUserTransactionsAsBuyer } from "../clients/transactionClient";
import { mapLocationsToEnum, mapStatusToEnum } from "../utils/enumUtils";
import { useNavigate } from "react-router-dom";
import { SelectChangeEvent } from "@mui/material";

const TransactionHistory: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<TransactionStatus | "">(
    ""
  );
  const [selectedType, setSelectedType] = useState<"all" | "buyer" | "seller">(
    "all"
  );
  const rowsPerPage = 6;
  const navigate = useNavigate();

  const handleTransactionsWithExpiredAvailabilities = (
    transactions: Transaction[]
  ) => {
    const currentTime = new Date();
    transactions.forEach(async (transaction) => {
      if (
        transaction.status === TransactionStatus.IN_PROGRESS &&
        new Date(transaction.availability.endTime) < currentTime
      ) {
        await awaitReviewTransaction(transaction.id);
      }
    });
  };

  const handleStatusFilterChange = (
    event: SelectChangeEvent<TransactionStatus | "">
  ) => {
    setSelectedStatus(event.target.value as TransactionStatus | "");
  };

  // Fetch data only once when component mounts
  useEffect(() => {
    const fetchTransactions = async () => {
      const buyerTransactions = await getCurrentUserTransactionsAsBuyer();
      const sellerTransactions = await getCurrentUserTransactionsAsSeller();
      const mappedTransactions = mapLocationsToEnum(
        buyerTransactions.concat(sellerTransactions)
      );
      const mappedStatusTransactions = mapStatusToEnum(mappedTransactions);

      handleTransactionsWithExpiredAvailabilities(mappedStatusTransactions);

      // Sort by most recent
      const sortedTransactions = mappedStatusTransactions.sort((a, b) => {
        return (
          new Date(b.availability.startTime).getTime() -
          new Date(a.availability.startTime).getTime()
        );
      });

      setTransactions(sortedTransactions);
      setFilteredTransactions(sortedTransactions);
    };
    fetchTransactions();
  }, []);

  // Filter transactions whenever status or type filter changes
  useEffect(() => {
    let filtered = transactions;

    // Apply status filter
    if (selectedStatus) {
      filtered = filtered.filter(
        (transaction) => transaction.status === selectedStatus
      );
    }

    // Apply type filter
    if (selectedType !== "all") {
      const currentUserId = parseInt(localStorage.getItem("userId")!!);
      filtered = filtered.filter((transaction) => {
        if (selectedType === "buyer") {
          return transaction.buyer.id === currentUserId;
        } else {
          return transaction.seller.id === currentUserId;
        }
      });
    }

    setFilteredTransactions(filtered);
  }, [selectedStatus, selectedType, transactions]);

  // Calculate pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstRow,
    indexOfLastRow
  );
  const totalPages = Math.ceil(filteredTransactions.length / rowsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const displayTransactionRating = (transaction: Transaction) => {
    if (!transaction.rating) {
      return null;
    }
    const currentUserId = localStorage.getItem("userId")!!;
    if (transaction.buyer.id === parseInt(currentUserId)) {
      return transaction.rating.toSellerRating;
    }

    return transaction.rating.toBuyerRating;
  };

  const displayUserInfo = (transaction: Transaction) => {
    const currentUserId = localStorage.getItem("userId")!!;
    if (transaction.buyer.id === parseInt(currentUserId)) {
      return transaction.seller.firstName + " " + transaction.seller.lastName;
    }

    return transaction.buyer.firstName + " " + transaction.buyer.lastName;
  };

  const formatTimeAsDate = (time: string) => {
    const date = new Date(time);
    return date.toLocaleDateString();
  };

  const formatDuration = (startTime: string, endTime: string) => {
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    const duration = `${startDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })} - ${endDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
    return duration;
  };

  // TODO: Add a style for pending transactions and awaiting review transactions
  const getStatusButtonStyle = (status: TransactionStatus) => {
    switch (status) {
      case TransactionStatus.COMPLETED:
        return {
          bgcolor: "#25DAC5",
          color: "#FFFFFF",
          border: "1px solid #25DAC5",
          minWidth: "100px",
          height: "29.15px",
          fontSize: "14.2588px",
        };
      case TransactionStatus.IN_PROGRESS:
      case TransactionStatus.PENDING:
        return {
          bgcolor: "#F4F4F4",
          color: "#757171",
          border: "1px solid #757171",
          minWidth: "100px",
          height: "29.15px",
          fontSize: "14.2588px",
        };
      case TransactionStatus.REJECTED:
        return {
          bgcolor: "rgba(233, 58, 61, 0.7)",
          color: "#FFFFFF",
          border: "1px solid #E93A3D",
          minWidth: "100px",
          height: "29.15px",
          fontSize: "14.2588px",
        };
      case TransactionStatus.AWAITING_REVIEW:
        return {
          bgcolor: "rgba(72, 43, 231, 0.7)",
          color: "#FFFFFF",
          border: "1px solid #482BE7",
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
          height: "calc(100vh - 200px)",
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
              Transaction History
            </Typography>
            {/* <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: 400,
                fontSize: "14.2588px",
                lineHeight: "21px",
                color: "#16C098",
              }}
            >
              Active Students
            </Typography> */}
          </Grid2>
          <Grid2 container spacing={2} alignItems="center">
            <Grid2>
              <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                <InputLabel>Status</InputLabel>
                <Select
                  value={selectedStatus}
                  onChange={handleStatusFilterChange}
                  input={<OutlinedInput label="Status" />}
                >
                  <MenuItem value="">
                    <em>All</em>
                  </MenuItem>
                  {Object.values(TransactionStatus).map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>
            <Grid2>
              <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                <InputLabel>Type</InputLabel>
                <Select
                  value={selectedType}
                  onChange={(e) =>
                    setSelectedType(
                      e.target.value as "all" | "buyer" | "seller"
                    )
                  }
                  input={<OutlinedInput label="Type" />}
                >
                  <MenuItem value="all">As Buyer & Seller</MenuItem>
                  <MenuItem value="buyer">As Buyer</MenuItem>
                  <MenuItem value="seller">As Seller</MenuItem>
                </Select>
              </FormControl>
            </Grid2>
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
                  {selectedType === "all"
                    ? "Name & Email"
                    : selectedType === "buyer"
                    ? "Seller & Email"
                    : "Buyer & Email"}
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
              {currentTransactions.map((transaction) => (
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
                        {displayUserInfo(transaction)}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "Poppins",
                          fontSize: "12px",
                          lineHeight: "18px",
                          color: "rgba(41, 45, 50, 0.8)",
                        }}
                      >
                        {transaction.buyer.email}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    {transaction.availability.location}
                  </TableCell>
                  <TableCell align="center">
                    {formatTimeAsDate(transaction.availability.startTime)}
                  </TableCell>
                  <TableCell align="center">
                    {formatDuration(
                      transaction.availability.startTime,
                      transaction.availability.endTime
                    )}
                  </TableCell>
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
                      {transaction.status}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {transaction.status ===
                        TransactionStatus.AWAITING_REVIEW &&
                        !transaction.rating && (
                          <Button
                            size="small"
                            sx={getRateButtonStyle()}
                            onClick={() => {
                              navigate(`/rating/${transaction.id}`);
                            }}
                          >
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
                            {displayTransactionRating(transaction)}
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
                {indexOfFirstRow + 1}-
                {Math.min(indexOfLastRow, filteredTransactions.length)} of{" "}
                {filteredTransactions.length}
              </Typography>
              <IconButton
                size="small"
                sx={{
                  width: "25px",
                  height: "25px",
                  padding: 0,
                  color: "#B5B7C0",
                }}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
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
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
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
