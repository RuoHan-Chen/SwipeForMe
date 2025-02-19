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

const ROWS_PER_PAGE = 8;

const buySwipes: React.FC = () => {
  const [page, setPage] = useState(0);

  return (
    <div className="filler-container">
      <TableContainer
        component={Paper}
        style={{ width: "80%", margin: "0 auto" }}
      >
        <Table stickyHeader style={{ paddingTop: "50px" }}>
          <TableHead>
            <TableRow>
              <TableCell>Student Name</TableCell>
              <TableCell>Dining Hall</TableCell>
              <TableCell>Available Time</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyData
              .slice(page * ROWS_PER_PAGE, page * ROWS_PER_PAGE + ROWS_PER_PAGE)
              .map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.hall}</TableCell>
                  <TableCell>{row.time}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.rating}</TableCell>
                  <TableCell>
                    <Button>{row.action}</Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[8]}
                count={dummyData.length}
                rowsPerPage={8}
                page={page}
                onPageChange={(_, newPage) => {
                  setPage(newPage);
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};

export default buySwipes;
