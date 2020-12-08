import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, type, room, urgency, sbar) {
  return { name, type, room, urgency, sbar };
}

const rows = [
  createData("Mark Savin", "sick", "122B", "yes", 1),
  createData("Maneesh Wathagame", "sick", "300C", "yes", 2),
  createData("Sarah Feroz", "healthy", "290D", "no", 3),
  createData("Samuel On", "healthy", "110A", "no", 4),
  createData("Dhruv Dustpan", "healthy", "402C", "no", 5),
  createData("Brandon Chan", "sick", "300L", "yes", 6),
  createData("Tiffany Alvear", "sick", "101A", "no", 7),
];

export default function BasicTable() {
  const classes = useStyles();

  return (
    <div className="nurse__table">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Room&nbsp;</TableCell>
              <TableCell align="right">Urgency&nbsp;</TableCell>
              <TableCell align="right">SBAR&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.type}</TableCell>
                <TableCell align="right">{row.room}</TableCell>
                <TableCell align="right">{row.urgency}</TableCell>
                <TableCell align="right">{row.sbar}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
