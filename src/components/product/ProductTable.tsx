import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Product from '../../dto/ProductDto';

interface Column {
  id: 'id' | 'name' | 'price' | 'barcode' | 'discontinuationdate';
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
    format: (value: number) => `R$ ${value.toFixed(2)}`,
  },
  {
    id: 'barcode',
    label: 'Barcode',
    minWidth: 170,
  },
  {
    id: 'discontinuationdate',
    label: 'Discontinuation date',
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
  discontinuationdate: string | null;
}

function createData(
  id: number,
  name: string,
  price: number,
  barcode: string,
  discontinuationdate: string | null,
): Data {
  return { id, name, price, barcode, discontinuationdate };
}

export default function ColumnGroupingTable(props: { productList: Product[] }) {

  const rows: object[] = [];

  props.productList.forEach(p => {
    rows.push(createData(p.id, p.name, p.price, p.barcode, p.discontinuationdate))
  })

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
              {columns.map((column) => (
                <TableCell colSpan={1}
                  key={column.id}
                  style={{ top: 0, minWidth: column.minWidth }}
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
