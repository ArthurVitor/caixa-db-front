import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import Sale from "../../dto/SaleDto";
import SaleService from "../../services/SaleService";
import DateUtils from "../../utils/DateUtils";
import { Button } from "@mui/material";
import TableTemplate, { Column } from "./templates/TableTemplate";

const columns: Column[] = [
  { id: "id", label: "Número", minWidth: 70 },
  { id: "action", label: "Ação", minWidth: 70},
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

  useEffect(() => {}, [rowsPerPage, page]);

  return (
    <div style={{ height: "512px", width: "100%" }}>
      <Paper sx={{ width: "100%" }}>
        <TableContainer sx={{ maxHeight: "100%" }}>
          <Table>
            <TableTemplate columns={columns}/>
            <TableBody>
              {sales
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((sale, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      <TableCell key={"id"}>{sale.id}</TableCell>
                      <TableCell key="action"><Button component={Link} to={"/vendas/" + sale.id} variant="contained">Editar</Button></TableCell>
                      <TableCell key={"resume"}>
                        {(sale.paymentMethod?.name ?? "Dinheiro") +  " - R$ " + sale.subTotal!.toFixed(2).replace(".", ",")}
                      </TableCell>
                      <TableCell key={"type"}>Venda</TableCell>
                      <TableCell key={"date"}>
                        {DateUtils.getFormattedDate(sale.saleDate)}
                      </TableCell>
                      <TableCell key={"hour"}>{DateUtils.getFormattedTime(sale.saleDate)}</TableCell>
                      <TableCell key={"items"}>
                        {
                          sale.items!.map((item, index) => {
                            return <p key={index}>{item.quantity}x {item.product?.name}</p>
                          })
                        }
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
