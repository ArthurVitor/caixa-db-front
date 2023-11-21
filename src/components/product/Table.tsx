import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

interface Column {
  id: 'id' | 'name' | 'price' | 'barcode' | 'descontinuationdate';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'id', label: 'ID', minWidth: 170, format: (value: number) => value.toLocaleString('en-US'), },
  { id: 'name', label: 'Name', minWidth: 170, },
  {
    id: 'price',
    label: 'Price',
    minWidth: 170,
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'barcode',
    label: 'Barcode',
    minWidth: 170,
  },
  {
    id: 'descontinuationdate',
    label: 'Descontinuation date',
    minWidth: 170,
    align: "right",
    format: (value) => String(value)
  },
];

interface Data {
  id: number;
  name: string;
  price: number;
  barcode: string;
  descontinuationdate: string | null;
}

function createData(
  id: number,
  name: string,
  price: number,
  barcode: string,
  descontinuationdate: string | null,
): Data {
  return { id, name, price, barcode, descontinuationdate };
}

const rows = [
  createData(38, "Pão", 0.75, "7777777777777", null),
  createData(39, "Ovo", 0.50, "8888888888888", null),
  createData(40, "Óleo", 3.80, "9999999999999", null),
  createData(41, "Refrigerante Coca-Cola 2L", 8.0, "1111111111111", null),
  createData(42, "Salsicha 1Kg", 12.99, "2222222222222", null),
  createData(42, "Salsicha 1Kg", 12.99, "2222222222222", null),
  createData(42, "Salsicha 1Kg", 12.99, "2222222222222", null),
  createData(42, "Salsicha 1Kg", 12.99, "2222222222222", null),
  createData(42, "Salsicha 1Kg", 12.99, "2222222222222", null),
];

export default function ColumnGroupingTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={5}>
                
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell colSpan={1}
                  key={column.id}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
