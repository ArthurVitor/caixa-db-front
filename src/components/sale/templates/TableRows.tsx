import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

interface TableRowsProps {
    page: number;
    rowsPerPage: number;
    items: Item[];
}

interface Item {
    data: Data[];
}

interface Data {
    key: string;
    value: JSX.Element | string
}

export default function TableRows({page, rowsPerPage, items}: TableRowsProps) {
    return (
        <TableBody>
            {items
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => {
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                            {item.data.map((item) => {
                                return <TableCell key={item.key}>{item.value}</TableCell>
                            })}
                        </TableRow>
                    );
            })}
        </TableBody>
    )
}