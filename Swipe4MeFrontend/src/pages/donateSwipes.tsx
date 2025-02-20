import React, { useState } from "react";
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
} from "@mui/material";

const dummyData = [
  {
    id: 1,
    name: "Jane Cooper",
    hall: "Rand",
    time: "12:30-13:30",
    email: "jane@vanderbilt.edu",
    rating: 5.0,
    action: "Send Invite",
  },
  {
    id: 2,
    name: "Floyd Miles",
    hall: "Rand",
    time: "10:00-12:00",
    email: "floyd@vanderbilt.edu",
    rating: 4.0,
    action: "Pending",
  },
  {
    id: 3,
    name: "Ronald Richards",
    hall: "Rand",
    time: "10:00-12:00",
    email: "ronald@vanderbilt.edu",
    rating: 4.7,
    action: "Pending",
  },
  {
    id: 4,
    name: "Marvin McKinney",
    hall: "Rothchild",
    time: "12:30-13:30",
    email: "marvin@vanderbilt.edu",
    rating: 4.8,
    action: "Send Invite",
  },
  {
    id: 5,
    name: "Jerome Bell",
    hall: "Commons",
    time: "10:00-12:00",
    email: "jerome@vanderbilt.edu",
    rating: 4.5,
    action: "Send Invite",
  },
  {
    id: 6,
    name: "Kathryn Murphy",
    hall: "Commons",
    time: "12:30-13:30",
    email: "kathryn@vanderbilt.edu",
    rating: 2.9,
    action: "Send Invite",
  },
  {
    id: 7,
    name: "Jacob Jones",
    hall: "Rand",
    time: "12:30-13:30",
    email: "jacob@vanderbilt.edu",
    rating: 3.0,
    action: "Send Invite",
  },
  {
    id: 8,
    name: "Savannah Nguyen",
    hall: "Rand",
    time: "14:00-15:00",
    email: "savannah@vanderbilt.edu",
    rating: 4.2,
    action: "Send Invite",
  },
  {
    id: 9,
    name: "Cameron Williamson",
    hall: "Rothchild",
    time: "11:00-12:00",
    email: "cameron@vanderbilt.edu",
    rating: 3.8,
    action: "Pending",
  },
  {
    id: 10,
    name: "Leslie Alexander",
    hall: "Commons",
    time: "09:00-10:00",
    email: "leslie@vanderbilt.edu",
    rating: 4.9,
    action: "Send Invite",
  },
  {
    id: 11,
    name: "Courtney Henry",
    hall: "Rand",
    time: "13:00-14:00",
    email: "courtney@vanderbilt.edu",
    rating: 3.5,
    action: "Pending",
  },
  {
    id: 12,
    name: "Arlene McCoy",
    hall: "Rothchild",
    time: "15:00-16:00",
    email: "arlene@vanderbilt.edu",
    rating: 4.6,
    action: "Send Invite",
  },
  {
    id: 13,
    name: "Guy Hawkins",
    hall: "Commons",
    time: "10:30-11:30",
    email: "guy@vanderbilt.edu",
    rating: 3.9,
    action: "Pending",
  },
  {
    id: 14,
    name: "Kristin Watson",
    hall: "Rand",
    time: "12:00-13:00",
    email: "kristin@vanderbilt.edu",
    rating: 4.3,
    action: "Send Invite",
  },
];

const theme = createTheme({
  palette: {
    primary: {
      main: "#16C098",
    },
  },
});

const ROWS_PER_PAGE = 6;

const buySwipes: React.FC = () => {
  const [page, setPage] = useState(0);

  return (
    <ThemeProvider theme={theme}>
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
          }}
        >
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
                {dummyData
                  .slice(
                    page * ROWS_PER_PAGE,
                    page * ROWS_PER_PAGE + ROWS_PER_PAGE
                  )
                  .map((row, index) => (
                    <TableRow key={index}>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="center">{row.hall}</TableCell>
                      <TableCell align="center">{row.time}</TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="center">{row.rating}</TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth={true}
                          style={{ width: "75%" }}
                        >
                          <div style={{ color: "white" }}>{row.action}</div>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[ROWS_PER_PAGE]}
                    count={dummyData.length}
                    rowsPerPage={ROWS_PER_PAGE}
                    page={page}
                    onPageChange={(_, newPage) => {
                      setPage(newPage);
                    }}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </TableContainer>
      </div>
    </ThemeProvider>
  );
};

export default buySwipes;
