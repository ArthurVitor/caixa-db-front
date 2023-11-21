import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Sale from "../../dto/SaleDto";
import SaleService from "../../services/SaleService";

import Skeleton from "@mui/material/Skeleton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';

interface Column {
  id: "id" | "amount" | "price" | "subtotal" | "remove";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "id", label: "Id", minWidth: 90 },
  { id: "amount", label: "Quantidade", minWidth: 70 },
  { id: "price", label: "Preço", minWidth: 70 },
  { id: "subtotal", label: "Subtotal", minWidth: 70},
  { id: "remove", label: "Remover", minWidth: 70}
];

export default function SalePage() {
  const { id } = useParams();
  const [sale, setSale] = useState<Sale | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(30);

  const handleRemoveItem = (id: number) => {
    if (sale) {
        setSale({...sale, items: sale.items.splice(id, 1)});
    }
  }

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    let idAsNumber = Number(id);

    if (isNaN(idAsNumber)) {
      setLoading(false);
      return;
    }

    SaleService.getSaleById(idAsNumber).then((newSale) => {
      setSale(newSale);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Skeleton variant="rectangular" width={210} height={118} />;
  }

  if (!sale) {
    return <p>Não encontrado!</p>;
  }

  return (
    <div style={{ height: "512px", width: "100%" }}>
      <Paper sx={{ width: "100%" }}>
        <TableContainer sx={{ maxHeight: "100%" }}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ top: 57, minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sale.items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      <TableCell key={"id"}>{index}</TableCell>
                      <TableCell key={"amount"}>
                            <input type="number" value={item.quantity} step={1}/>
                      </TableCell>
                      <TableCell key={"type"}>Venda</TableCell>
                      <TableCell key={"subtotal"}>
                        R$ {(item.product?.price ?? 0) * item.quantity}
                      </TableCell>
                      <TableCell key={"remove"}>
                        <Button variant="contained" color="error" onClick={() => handleRemoveItem(index)}>
                            Remover
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 30, 50]}
          component="div"
          count={sale.items.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
