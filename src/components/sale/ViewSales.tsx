import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Paper, Table, TableContainer, Button, TablePagination } from "@mui/material";

import TablePreview, { Column } from "./templates/TablePreview";
import TableRows from "./templates/TableRows";

import Sale from "../../dto/SaleDto";

import SaleService from "../../services/SaleService";

import DateUtils from "../../utils/DateUtils";

const columns: Column[] = [
  { id: "id", label: "Número", minWidth: 70 },
  { id: "action", label: "Ação", minWidth: 70},
  { id: "resume", label: "Resumo", minWidth: 200 },
  { id: "type", label: "Tipo", minWidth: 90 },
  { id: "date", label: "Data", minWidth: 130 },
  { id: "hour", label: "Hora", minWidth: 130 },
  { id: "items", label: "Items do pedido" },
];

function transformSalesToItems(sales: Sale[]) {
  return sales.map((sale) => (
    {
      data: [
        {
          key: "id", value: sale.id!.toString()
        },
        {
          key: "action", value: (<Button component={Link} to={"/vendas/" + sale.id} variant="contained">Editar</Button>)
        },
        {
          key: "resume", value: (sale.paymentMethod?.name ?? "Dinheiro") +  " - R$ " + sale.subTotal!.toFixed(2).replace(".", ",")
        },
        {
          key: "type", value: "Venda"
        },
        {
          key: "date", value: DateUtils.getFormattedDate(sale.saleDate)
        },
        {
          key: "hour", value: DateUtils.getFormattedTime(sale.saleDate)
        },
        {
          key: "items", value: (
            <>
              {sale.items!.map((item, index) => {
                return <p key={index}>{item.quantity}x {item.product?.name}</p>
              })}
            </>
          )
        }
      ]
    }
  ))
}

export default function ViewSales() {
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
    SaleService.getSales(1, rowsPerPage + 20).then((newSales) => {
      setSales([...sales, ...newSales]);
    });
  }, []);

  useEffect(() => {}, [rowsPerPage, page]);

  return (
    <div style={{ height: "512px", width: "100%" }}>
      <Paper sx={{ width: "100%" }}>
        <TableContainer sx={{ maxHeight: "100%" }}>
          <Table>
            <TablePreview columns={columns}/>
            <TableRows page={page} rowsPerPage={rowsPerPage} items={transformSalesToItems(sales)}/>
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
