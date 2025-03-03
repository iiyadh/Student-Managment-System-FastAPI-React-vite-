import { useState, useRef, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import './styles/StudentList.scss';
import axios from 'axios';

const columns = [
  { id: 'id', label: 'ID', minWidth: 75 },
  { id: 'first_name', label: 'First Name', minWidth: 75 },
  { id: 'last_name', label: 'Last Name', minWidth: 75, align: 'right' },
  { id: 'email', label: 'E-mail', minWidth: 75, align: 'right' },
  { id: 'age', label: 'Age', minWidth: 75, align: 'right' },
  { id: 'major', label: 'Major', minWidth: 75, align: 'right' },
  { id: 'options', label: '', minWidth: 75, align: 'right' },
];

function createData(id, first_name, last_name, email, age, major) {
  return { id, first_name, last_name, email, age, major };
}

const initialRows = [
  createData(1, "Alice", "Johnson", "alice@example.com", 22, "Math"),
  createData(2, "Bob", "Smith", "bob@example.com", 24, "Physics"),
  createData(3, "Charlie", "Brown", "charlie@example.com", 21, "Computer Science"),
  createData(4, "David", "Williams", "david@example.com", 23, "Biology"),
  createData(5, "Emma", "Davis", "emma@example.com", 22, "Chemistry"),
  createData(6, "Frank", "Miller", "frank@example.com", 25, "Engineering"),
  createData(7, "Grace", "Taylor", "grace@example.com", 20, "History"),
  createData(8, "Hannah", "Anderson", "hannah@example.com", 22, "Literature"),
  createData(9, "Ian", "Thomas", "ian@example.com", 23, "Philosophy"),
  createData(10, "Julia", "Martinez", "julia@example.com", 21, "Economics"),
];

const StudentList = () => {

  axios.defaults.baseURL = "http://127.0.0.1:8000";

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/students');
      setRows(response.data);
    }
    fetchData()
  }, []);
  const tableBodyRef = useRef();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [toEditRow, setToEditRow] = useState(null);
  const [rows, setRows] = useState([]);
  const [editRow, setEditRow] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    age: "",
    major: "",
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setToEditRow(null);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEditRow = (row) => {
    setToEditRow(toEditRow === row.id ? null : row.id);
    setEditRow(row);
  };

  const handleInputChange = (e, column) => {
    setEditRow({ ...editRow, [column]: e.target.value });
  };

  const handleAddRow = async () => {
    const newRow = {
      first_name: "",
      last_name: "",
      email: "",
      age: 0,
      major: "",
    };
  
    try {
      const response = await axios.post("/students", newRow);
      const savedStudent = response.data;
      const updatedRows = [...rows, savedStudent];
      setRows(updatedRows);
      handleEditRow(savedStudent);
      setPage(Math.ceil(updatedRows.length / rowsPerPage) - 1);
    } catch (e) {
      console.log(e);
    }
  };
  
  const handleSaveRow = async () => {
    if (!editRow.id) return;
  
    try {
      await axios.put(`/students/${editRow.id}`, editRow); // Send data in request body
      const updatedRows = rows.map((row) => (row.id === editRow.id ? editRow : row));
      setRows(updatedRows);
      setToEditRow(null);
    } catch (e) {
      console.log(e);
    }
  };
  
  const handleDeleteRow = async (id) => {
    try {
      await axios.delete(`/students/${id}`);
      const updatedRows = rows.filter((row) => row.id !== id);
      setRows(updatedRows);
      const lastPage = Math.ceil(updatedRows.length / rowsPerPage) - 1;
      if (page > lastPage) {
        setPage(lastPage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [mousePOS, setMousePOS] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseOver = (e) => {
    setMousePOS({ x: e.clientX, y: e.clientY });
    setShowTooltip(true);
  };

  const handleMouseOut = () => {
    setShowTooltip(false);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Student List</h1>
        <Button variant="contained" endIcon={<AddIcon />} onClick={handleAddRow}>
          Add Student
        </Button>
      </div>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }} ref={tableBodyRef} className="table-container">
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    key={column.id || index}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                  onDoubleClick={() => handleEditRow(row)}
                  onMouseOver={(e) => handleMouseOver(e)}
                  onMouseOut={handleMouseOut}
                >
                  {columns.map((column) => {
                    if (column.id === 'options') {
                      return (
                        <TableCell key="options" align="right">
                          {row.id === toEditRow ? (
                            <Button onClick={handleSaveRow} color="primary">
                              Save
                            </Button>
                          ) : (
                            <IconButton onClick={() => handleDeleteRow(row.id)} color="error">
                              <DeleteIcon />
                            </IconButton>
                          )}
                        </TableCell>
                      );
                    }
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {row.id === toEditRow && column.id !== 'id' ? (
                          <TextField
                            hiddenLabel
                            value={editRow[column.id]}
                            onChange={(e) => handleInputChange(e, column.id)}
                            variant="filled"
                            size="small"
                          />
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {showTooltip && toEditRow === null && (
        <div
          style={{
            position: "fixed",
            top: mousePOS.y + 10,
            left: mousePOS.x + 10,
            backgroundColor: "black",
            color: "white",
            padding: "5px 10px",
            borderRadius: "5px",
            fontSize: "12px",
            zIndex: 1000,
          }}
        >
          Double click to edit
        </div>
      )}
    </div>
  );
};

export default StudentList;