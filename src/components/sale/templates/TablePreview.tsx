import { TableCell, TableRow, TableHead } from "@mui/material";

interface Column {
    id: string;
    label: string;
    minWidth?: number;
    align?: "right";
    format?: (value: number) => string;
}

interface TableTemplateProps {
    columns: Column[];
}

export type {
    Column
}

export default function TablePreview({ columns }: TableTemplateProps) {
    return (
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
    )
}