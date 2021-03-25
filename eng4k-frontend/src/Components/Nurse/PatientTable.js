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
    id: "patient_name",
    numeric: false,
    disablePadding: true,
    label: "Patient Name",
  },
  { id: "a_problem", numeric: false, disablePadding: false, label: "Type" },
  {
    id: "patient_room_id",
    numeric: true,
    disablePadding: false,
    label: "Room Number",
  },
  { id: "r_priority", numeric: false, disablePadding: false, label: "Urgency" },
  {
    id: "date_created",
    numeric: false,
    disablePadding: false,
    label: "Last Updated (Date and Time)",
  },
  {
    id: "SBAR_history",
    numeric: false,
    disablePadding: false,
    label: "SBAR history",
  },
  {
    id: "update",
    numeric: false,
    disablePadding: false,
    label: "Update",
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
        <TableCell padding="checkbox">
          {/* <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          /> */}
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.id !== "patient_name" ? "center" : "left"}
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
          Patient List
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
  const [patientId, setPatientId] = React.useState(0);
  const [patientRoom, setPatientRoom] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [searchState, setSearchState] = useState([
    {
      patient_name: "-",
      a_problem: "-",
      patient_room_id: "-",
      r_priority: "-",
      update_status: "-",
      last_updated: "-",
      SBAR_history: "-",
      update: "-",
    },
  ]);

  const history = useHistory();

  const [patients, setPatients] = useState([
    {
      patient_name: "-",
      note_patient_id: null,
      date_created: "-",
      a_problem: "-",
      patient_room_id: null,
      r_priority: "-",
      update_status: "-",
      last_updated: "-",
      SBAR_history: "-",
      update: "-",
    },
  ]);

  useEffect(() => {
    fetch(`/nurse/viewPatients/${props.nurseId}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log("network response was bad");
        }
      })
      .then((result) => {
        if (result !== undefined && result.length !== 0) {
          setPatients(result);
          setSearchState(result);
        }
      });
  }, [props]);

  useEffect(() => {
    const searchedPatients = searchState.filter((patient) =>
      patient.patient_name.toLowerCase().startsWith(props.search.toLowerCase())
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

  const handleClick = (event, name, id, room_id) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    setPatientName(name);

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    console.log(name, id, room_id);
    setPatientName(name);
    setPatientId(id);
    setPatientRoom(room_id);
    setSelected(newSelected);
  };

  useEffect(() => {
    if (selected.length > 0) {
      setTimeout(function () {
        //your code to be executed after 1 second
        history.push(`/nurse/${patientName}/${patientId}/${patientRoom}`);
      }, 1000);
    }
  });

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, patients.length - page * rowsPerPage);

  return (
    <div
      style={{
        // position: "absolute",
        margin: "auto",
        marginTop: "15rem",
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
                  (patient, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        role={"checkbox"}
                        tabIndex={-1}
                        key={patient.patient_name}
                      >
                        <TableCell padding="checkbox"></TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="patients"
                          padding="none"
                        >
                          {patient.patient_name}
                        </TableCell>
                        <TableCell align="center">
                          {patient.a_problem}
                        </TableCell>
                        <TableCell align="center">
                          {patient.patient_room_id}
                        </TableCell>
                        <TableCell align="center">
                          {patient.r_priority}
                        </TableCell>
                        <TableCell align="center">
                          {patient.date_created}
                        </TableCell>
                        <TableCell align="center">
                          <Link
                            to={{
                              pathname: `/nurse/SBARHistory/${patient.patient_name}`,
                              patientName: patient.patient_name,
                              patientId: patient.note_patient_id,
                              roomId: patient.patient_room_id,
                            }}
                          >
                            <Button variant="contained" color="primary">
                              View SBAR History
                            </Button>
                          </Link>
                        </TableCell>
                        <TableCell align="center">
                          {patient.update_status !== "Update Required" ? (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={(event) =>
                                handleClick(
                                  event,
                                  patient.patient_name,
                                  patient.note_patient_id,
                                  patient.patient_room_id
                                )
                              }
                            >
                              {patient.update_status}
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={(event) =>
                                handleClick(
                                  event,
                                  patient.patient_name,
                                  patient.note_patient_id,
                                  patient.patient_room_id
                                )
                              }
                            >
                              {patient.update_status}
                            </Button>
                          )}
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
