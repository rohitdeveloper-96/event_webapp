/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Header from "../components/Header";
import "../assets/css/home.css";
import {
  deleteUsersList,
  getUserList,
  postUsers,
  updateUsersList,
} from "../services/userApi";
import CircularProgress from "@mui/joy/CircularProgress";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import EnhancedTableHead from "../components/TableHead";
import { Alert, Typography } from "@mui/material";
import CreateDialog from "../components/CreateDialog";
import DeleteDialog from "../components/DeleteDialog";
import { useForm } from "react-hook-form";
import EditDialog from "../components/EditDialog";
import { getAdminUserList } from "../services/signInapi";

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
  const stabilizedThis = Array.isArray(array)
    ? array.map((el, index) => [el, index])
    : [];
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const HomeScreen = () => {
  const navigate = useNavigate();
  const [userLists, setUserLists] = useState([]);
  const [loader, setLoader] = useState(false);
  const { userList, loading } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [openModel, setOpenModel] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [toastmessage, setToastMessage] = useState("");
  const [toastbool, setToastbool] = useState(false);
  const [index, setIndexOfUser] = useState();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setopenEditDialog] = useState(false);
  const [username, setUsername] = useState("");
  const { reset } = useForm();
  useEffect(() => {
    getUserList(dispatch);
    getAdminUserList(dispatch);
  }, []);
  useEffect(() => { 
    if (!localStorage.getItem("email")) {
      navigate("/Login");
    }
    setUsername(localStorage.getItem("name"));
  }, []);

  useEffect(() => {
    getUserList(dispatch);
  }, [openModel]);
  useEffect(() => {
    if (loading === true) {
      setLoader(true);
      setUserLists([]);
    } else {
      setLoader(false);
      setUserLists(userList);
    }
  }, [userList, loading]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userLists.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(userLists, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, userLists]
  );

  const onClickCreateUser = () => {
    setOpenModel(true);
  };
  const onCloseModel = () => {
    setOpenModel(false);
  };
  const onSubmit = (data) => {
    postUsers(data);
    reset();
    setOpenModel(false);
    setToastbool(true);
    setToastMessage("Event has been created Successfully");
  };
  const onSubmitForUpdate = (data) => {
    let id = index.id;
    updateUsersList(dispatch, data, id);
    reset();
    setopenEditDialog(false);
    setToastbool(true);
    setToastMessage("Event has been Updated Successfully");
  };
  const onDeleteHandler = (row) => {
    let findIndex = userLists.find((item) => item.id === row.id);
    setIndexOfUser(findIndex);
    setOpenDeleteDialog(true);
  };
  const handleDelete = () => {
    let id = index.id;
    deleteUsersList(dispatch, id);
    setToastbool(true);
    setToastMessage("Event has been Deleted Successfully");
    setOpenDeleteDialog(false);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  const onCloseUpdateModel = () => {
    setopenEditDialog(false);
  };
  const onUpdateHandler = (row) => {
    let findIndexUser = userLists.find((item) => item.id === row.id);
    setopenEditDialog(true);
    if (findIndexUser) {
      setIndexOfUser(findIndexUser);
    } else {
      return "";
    }
  };
  const onClickeViewDetails = (row) => {
    let findIndexUser = userLists.find(item => item.id === row.id)
    console.log(findIndexUser)
    navigate(`/EventDetails/${findIndexUser.id}`);
}
  return (
    <div>
      <Header username={username} />
      {toastbool && (
        <Alert
          severity="success"
          color="success"
          onClose={() => {
            setToastbool(false);
          }}
        >
          {toastmessage}
        </Alert>
      )}
      {loader && (
        <div className="loader">
          <CircularProgress variant="solid" color="success" />
        </div>
      )}
      <div className="tableContainerStyles">
        <div className="btnContainer">
          <button className="btnStyles" onClick={onClickCreateUser}>
            Create Event
          </button>
        </div>
        <Box className="datagridStyles">
          <Paper>
            <TableContainer>
              <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                <EnhancedTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={userLists.length}
                />
                <TableBody>
                  {visibleRows.length !== 0 ? (
                    visibleRows.map((row, index) => {
                      return (
                        <TableRow hover key={row.id}>
                          <TableCell align="left">{row.id}</TableCell>
                          <TableCell align="left">{row.name}</TableCell>
                          <TableCell align="left">{row.email}</TableCell>
                          <TableCell align="left">{row.event}</TableCell>
                          <TableCell align="left">
                            {row.primaryskills}
                          </TableCell>
                          <TableCell>
                            <Tooltip title="Update">
                              <IconButton>
                                <ModeEditIcon
                                  onClick={() => onUpdateHandler(row)}
                                />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                          <TableCell>
                            <Tooltip title="Delete">
                              <IconButton>
                                <DeleteIcon
                                  onClick={() => onDeleteHandler(row)}
                                />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                          <TableCell>
                            <Tooltip title="Details">
                              <Typography style={{ cursor: "pointer" }} onClick={() => onClickeViewDetails(row)}>
                                View Details
                              </Typography>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableCell>No records found!</TableCell>
                  )}
                  {emptyRows > 0 && (
                    <TableRow>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={userLists.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      </div>
      {openModel && (
        <CreateDialog
          onClose={onCloseModel}
          openModel={openModel}
          onSubmit={onSubmit}
        />
      )}
      {openEditDialog && (
        <EditDialog
          user={index}
          onClose={onCloseUpdateModel}
          openModel={openEditDialog}
          onSubmitForUpdate={onSubmitForUpdate}
        />
      )}
      {openDeleteDialog && (
        <DeleteDialog
          openDialog={openDeleteDialog}
          onDialogClose={handleCloseDeleteDialog}
          onClickDeleteHandler={handleDelete}
        />
      )}
    </div>
  );
};
export default HomeScreen;
