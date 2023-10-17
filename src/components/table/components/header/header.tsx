import { TableCell, TableHead, TableRow } from "@mui/material";

type Properties = {
  headers: string[];
  isVisible: boolean;
};

const Header: React.FC<Properties> = ({ headers, isVisible }) => {
  return (
    <TableHead>
      <TableRow>
        {isVisible &&
          headers.map((header, index) => (
            <TableCell
              key={index}
              style={{
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {header}
            </TableCell>
          ))}
      </TableRow>
    </TableHead>
  );
};

export { Header };
