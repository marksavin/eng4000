import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import Button from "@material-ui/core/Button";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "nurse_name",
    numeric: false,
    disablePadding: true,
    label: "Nurse Incharge",
  },
  {
    id: "date_created",
    numeric: false,
    disablePadding: false,
    label: "Date Created",
  },
  {
    id: "note_room_id",
    numeric: true,
    disablePadding: false,
    label: "Room Number",
  },
  { id: "s_problem", numeric: false, disablePadding: false, label: "Urgency" },
  {
    id: "view_sbar",
    numeric: false,
    disablePadding: false,
    label: "SBAR",
  },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.id !== "nurse_name" ? "center" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(5),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.primary.main,
          backgroundColor: lighten(theme.palette.primary.main, 0.85),
        }
      : {
          color: theme.palette.text.secondary,
          backgroundColor: theme.palette.primary.dark,
        },
  title: {
    flex: "1 1 100%",
    fontSize: "2rem",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, name } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          Loading {name} SBAR...
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          SBAR History
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    fontSize: "5rem",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
    fontSize: "5rem",
    tableLayout: "fixed",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("patient_name");
  const [selected, setSelected] = React.useState([]);
  const [patientName, setPatientName] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [searchState, setSearchState] = useState([
    {
      sbar_note_archive_patient_id: "-",
      nurse_name: "-",
      sbar_note_archive_date_created: "-",
      sbar_note_archive_room_id: "-",
      s_problem: "-",
    },
  ]);

  const [patients, setPatients] = useState([
    {
      sbar_note_archive_patient_name: "-",
      sbar_note_archive_patient_id: "-",
      nurse_name: "-",
      sbar_note_archive_date_created: "-",
      sbar_note_archive_room_id: "-",
      s_problem: "-",
    },
  ]);

  useEffect(() => {
    console.log(props.nurseId, props.patientId);
    fetch(`/nurse/SBARHistory/${props.patientId}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log("network response was bad");
        }
      })
      .then((result) => {
        if (result !== undefined && result.length !== 0) {
          console.log(result);
          setPatients(result);
          setSearchState(result);
        }
      });
  }, []);

  useEffect(() => {
    const searchedPatients = searchState.filter((patient) =>
      patient.nurse_name.toLowerCase().startsWith(props.search.toLowerCase())
    );
    setPatients(searchedPatients);
  }, [props.search]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = patients.map((n) => n.patient_name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, patients.length - page * rowsPerPage);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        heigh: "100%",
        top: "300px",
      }}
    >
      <div
        style={{
          width: "80%",
        }}
      >
        <Paper className={classes.paper} elevation={4}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            name={patientName}
          />
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={"medium"}
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={patients.length}
              />
              <TableBody>
                {stableSort(patients, getComparator(order, orderBy)).map(
                  (patients, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        role={"checkbox"}
                        tabIndex={-1}
                        key={index}
                      >
                        <TableCell padding="checkbox"></TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="patients"
                          padding="none"
                        >
                          {patients.nurse_name}
                        </TableCell>
                        <TableCell align="center">
                          {patients.sbar_note_archive_date_created}
                        </TableCell>
                        <TableCell align="center">
                          {patients.sbar_note_archive_room_id}
                        </TableCell>
                        <TableCell align="center">
                          {patients.s_problem}
                        </TableCell>
                        <TableCell align="center">
                          <Link
                            to={{
                              pathname: "/nurse/viewSBAR",
                              patientName:
                                patients.sbar_note_archive_patient_name,
                              nurseName: patients.nurse_name,
                              patientId: patients.sbar_note_archive_patient_id,
                              dateCreated:
                                patients.sbar_note_archive_date_created,
                            }}
                          >
                            <Button variant="contained" color="primary">
                              View SBAR
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  }
                )}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 25 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </div>
  );
}
