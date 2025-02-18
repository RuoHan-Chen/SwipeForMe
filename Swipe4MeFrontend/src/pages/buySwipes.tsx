import React from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";

const dummyData = [
  {
    name: "Jane Cooper",
    hall: "Rand",
    time: "12:30-13:30",
    email: "jane@vanderbilt.edu",
    rating: 5.0,
    action: "Send Invite",
  },
  {
    name: "Floyd Miles",
    hall: "Rand",
    time: "10:00-12:00",
    email: "floyd@vanderbilt.edu",
    rating: 4.0,
    action: "Pending",
  },
  {
    name: "Ronald Richards",
    hall: "Rand",
    time: "10:00-12:00",
    email: "ronald@vanderbilt.edu",
    rating: 4.7,
    action: "Pending",
  },
  {
    name: "Marvin McKinney",
    hall: "Rothchild",
    time: "12:30-13:30",
    email: "marvin@vanderbilt.edu",
    rating: 4.8,
    action: "Send Invite",
  },
  {
    name: "Jerome Bell",
    hall: "Commons",
    time: "10:00-12:00",
    email: "jerome@vanderbilt.edu",
    rating: 4.5,
    action: "Send Invite",
  },
  {
    name: "Kathryn Murphy",
    hall: "Commons",
    time: "12:30-13:30",
    email: "kathryn@vanderbilt.edu",
    rating: 2.9,
    action: "Send Invite",
  },
  {
    name: "Jacob Jones",
    hall: "Rand",
    time: "12:30-13:30",
    email: "jacob@vanderbilt.edu",
    rating: 3.0,
    action: "Send Invite",
  },
];

const buySwipes: React.FC = () => {
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
            {dummyData.map((row, index) => (
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
        </Table>
      </TableContainer>
    </div>
  );
};

export default buySwipes;
