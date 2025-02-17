import React from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const buySwipes: React.FC = () => {
  return (
    <div className="filler-container">
      <Table style={{ width: "80%", margin: "0 auto" }}>
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
      </Table>
    </div>
  );
};

export default buySwipes;
