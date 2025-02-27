import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import {
  createTheme,
  Grid2,
  TextField,
  ThemeProvider,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import {
  AvailabilityResponse,
  getAllAvailabilities,
} from "../clients/availabilityClient";
import { Transaction } from "../clients/transactionClient";
import {
  createTransaction,
  TransactionStatus,
} from "../clients/transactionClient";
import { getCurrentUser, User } from "../clients/userClient";
import Snackbar from "@mui/material/Snackbar";

const dummyData = [
  {
    id: 1,
    name: "Jane Cooper",
    hall: "Rand",
    time: "12:30-13:30",
    email: "jane@vanderbilt.edu",
    rating: 5.0,
    pending: false,
  },
  {
    id: 2,
    name: "Floyd Miles",
    hall: "Rand",
    time: "10:00-12:00",
    email: "floyd@vanderbilt.edu",
    rating: 4.0,
    pending: true,
  },
  {
    id: 3,
    name: "Ronald Richards",
    hall: "Rand",
    time: "10:00-12:00",
    email: "ronald@vanderbilt.edu",
    rating: 4.7,
    pending: true,
  },
  {
    id: 4,
    name: "Marvin McKinney",
    hall: "Rothchild",
    time: "12:30-13:30",
    email: "marvin@vanderbilt.edu",
    rating: 4.8,
    pending: false,
  },
  {
    id: 5,
    name: "Jerome Bell",
    hall: "Commons",
    time: "10:00-12:00",
    email: "jerome@vanderbilt.edu",
    rating: 4.5,
    pending: false,
  },
  {
    id: 6,
    name: "Kathryn Murphy",
    hall: "Commons",
    time: "12:30-13:30",
    email: "kathryn@vanderbilt.edu",
    rating: 2.9,
    pending: false,
  },
  {
    id: 7,
    name: "Jacob Jones",
    hall: "Rand",
    time: "12:30-13:30",
    email: "jacob@vanderbilt.edu",
    rating: 3.0,
    pending: false,
  },
  {
    id: 8,
    name: "Savannah Nguyen",
    hall: "Rand",
    time: "14:00-15:00",
    email: "savannah@vanderbilt.edu",
    rating: 4.2,
    pending: false,
  },
  {
    id: 9,
    name: "Cameron Williamson",
    hall: "Rothchild",
    time: "11:00-12:00",
    email: "cameron@vanderbilt.edu",
    rating: 3.8,
    pending: true,
  },
  {
    id: 10,
    name: "Leslie Alexander",
    hall: "Commons",
    time: "09:00-10:00",
    email: "leslie@vanderbilt.edu",
    rating: 4.9,
    pending: false,
  },
  {
    id: 11,
    name: "Courtney Henry",
    hall: "Rand",
    time: "13:00-14:00",
    email: "courtney@vanderbilt.edu",
    rating: 3.5,
    pending: true,
  },
  {
    id: 12,
    name: "Arlene McCoy",
    hall: "Rothchild",
    time: "15:00-16:00",
    email: "arlene@vanderbilt.edu",
    rating: 4.6,
    pending: false,
  },
  {
    id: 13,
    name: "Guy Hawkins",
    hall: "Commons",
    time: "10:30-11:30",
    email: "guy@vanderbilt.edu",
    rating: 3.9,
    pending: true,
  },
  {
    id: 14,
    name: "Kristin Watson",
    hall: "Rand",
    time: "12:00-13:00",
    email: "kristin@vanderbilt.edu",
    rating: 4.3,
    pending: false,
  },
];

const theme = createTheme({
  palette: {
    primary: {
      main: "#16C098",
    },
  },
  typography: {
    fontFamily: "Poppins",
  },
});

const ROWS_PER_PAGE = 6;

const buySwipes: React.FC = () => {
  const [page, setPage] = useState(0);
  const [activeUsers, setActiveUsers] = useState<AvailabilityResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [sendInviteSuccess, setSendInviteSuccess] = useState(false);

  useEffect(() => {
    const fetchActiveUsers = async () => {
      setLoading(true);
      try {
        const response = await getAllAvailabilities();
        setActiveUsers(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching active users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchActiveUsers();
  }, []);

  const formatAvailableTime = (startTime: string, endTime: string) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    return `${start.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/Chicago",
    })} - ${end.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/Chicago",
    })}`;
  };

  const formatDate = (date: string) => {
    const start = new Date(date);
    return start.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
    });
  };

  const handleSendInvite = async (availabilityId: number, sellerId: number) => {
    const currentUser: User = await getCurrentUser();

    const transaction: Transaction = {
      availabilityId: availabilityId,
      buyerId: currentUser.id,
      sellerId: sellerId,
      status: TransactionStatus.PENDING,
    };

    try {
      await createTransaction(transaction);
      setSendInviteSuccess(true);
    } catch (error) {
      setSendInviteSuccess(false);
    }

    setOpen(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert
          severity={sendInviteSuccess ? "success" : "error"}
          onClose={() => setOpen(false)}
          sx={{ width: "100%" }}
        >
          {sendInviteSuccess ? "Invite sent!" : "Failed to send invite"}
        </Alert>
      </Snackbar>

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
          {activeUsers.length === 0 && (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 1,
              }}
            >
              <InfoIcon color="action" style={{ marginRight: "8px" }} />
              <Typography variant="body1" color="textSecondary">
                No Students are available at this time. Check back later!
              </Typography>
            </Box>
          )}
          <Grid2
            container
            alignItems="center"
            justifyContent="space-between"
            style={{ width: "90%", margin: "0 auto", paddingTop: "20px" }}
          >
            <Grid2>
              <Typography variant="h6">All Students</Typography>
              <Typography variant="subtitle1" color="#16C098">
                Active Students
              </Typography>
            </Grid2>
            <Grid2>
              <TextField variant="outlined" placeholder="Search" size="small" />
            </Grid2>
          </Grid2>
          <div
            style={{
              width: "90%",
              margin: "0 auto",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell align="left">
                    <span style={{ color: "#B5B7C0" }}>Student Name</span>
                  </TableCell>
                  <TableCell align="center">
                    <span style={{ color: "#B5B7C0" }}>Dining Hall</span>
                  </TableCell>
                  <TableCell align="center">
                    <span style={{ color: "#B5B7C0" }}>Available Time</span>
                  </TableCell>
                  <TableCell align="center">
                    <span style={{ color: "#B5B7C0" }}>Date</span>
                  </TableCell>
                  <TableCell align="left">
                    <span style={{ color: "#B5B7C0" }}>Email</span>
                  </TableCell>
                  <TableCell align="center">
                    <span style={{ color: "#B5B7C0" }}>Rating</span>
                  </TableCell>
                  <TableCell align="center">
                    <span style={{ color: "#B5B7C0" }}>Action</span>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activeUsers.length > 0 &&
                  activeUsers
                    .slice(
                      page * ROWS_PER_PAGE,
                      page * ROWS_PER_PAGE + ROWS_PER_PAGE
                    )
                    .map((row, index) => (
                      <TableRow key={index}>
                        <TableCell align="left">
                          {row.firstName} {row.lastName}
                        </TableCell>
                        <TableCell align="center">{row.location}</TableCell>
                        <TableCell align="center">
                          {formatAvailableTime(row.startTime, row.endTime)}
                        </TableCell>
                        <TableCell align="center">
                          {formatDate(row.startTime)}
                        </TableCell>
                        <TableCell align="left">{row.email}</TableCell>
                        <TableCell align="center">
                          {row.rating || "N/A"}
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            variant="contained"
                            color="primary"
                            fullWidth={true}
                            style={{ width: "80%" }}
                            onClick={() => handleSendInvite(row.id, row.userId)}
                            disabled={false}
                          >
                            <div style={{ color: "white" }}>
                              {false ? "Pending" : "Send Invite"}
                            </div>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
              <TableFooter>
                {activeUsers.length > 0 && (
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[ROWS_PER_PAGE]}
                      count={activeUsers.length}
                      rowsPerPage={ROWS_PER_PAGE}
                      page={page}
                      onPageChange={(_, newPage) => {
                        setPage(newPage);
                      }}
                    />
                  </TableRow>
                )}
              </TableFooter>
            </Table>
          </div>
        </TableContainer>
      </div>
    </ThemeProvider>
  );
};

export default buySwipes;
