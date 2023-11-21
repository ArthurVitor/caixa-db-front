import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import Sale from "../../dto/SaleDto";
import SaleService from "../../services/SaleService";

interface Column {
  id: "id" | "action" | "resume" | "type" | "date" | "hour" | "items";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "id", label: "Número", minWidth: 70 },
  { id: "action", label: "Ação", minWidth: 70 },
  { id: "resume", label: "Resumo", minWidth: 200 },
  { id: "type", label: "Tipo", minWidth: 90 },
  { id: "date", label: "Data", minWidth: 130 },
  { id: "hour", label: "Hora", minWidth: 130 },
  { id: "items", label: "Items do pedido" },
];

export default function SaleTable() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(30);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
    
    SaleService.getSales(page + 1, rowsPerPage).then((newSales) => {
      setSales([...sales, ...newSales]);
    });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    SaleService.getSales(1, rowsPerPage).then((newSales) => {
      setSales([...sales, ...newSales]);
    });
  }, []);

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
              {sales
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((sale) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={sale.id}>
                      <TableCell key={"id"}>{sale.id}</TableCell>
                      <TableCell key={"action"}>
                        <Link to={"/vendas/" + sale.id}>Editar</Link>
                      </TableCell>
                      <TableCell key={"resume"}>
                        {"CARTÃO - R$ " + sale.paidAmount}
                      </TableCell>
                      <TableCell key={"type"}>Venda</TableCell>
                      <TableCell key={"date"}>
                        {(sale.saleDate.getDay() < 10
                          ? "0" + sale.saleDate.getDay()
                          : sale.saleDate.getDay()) +
                          "/" +
                          sale.saleDate.getMonth() +
                          "/" +
                          sale.saleDate.getFullYear()}
                      </TableCell>
                      <TableCell key={"hour"}>{"17:37"}</TableCell>
                      <TableCell key={"items"}>
                        <p>- Item 1</p>
                        <p>- Item 2</p>
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
          count={sales.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
