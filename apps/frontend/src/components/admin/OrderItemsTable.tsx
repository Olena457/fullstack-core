import {
  Paper,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import type { OrderItemType } from "../../types/order";
interface OrderItemsTableProps {
  items: OrderItemType[];
  totalPrice: number;
}

export const OrderItemsTable = ({
  items,
  totalPrice,
}: OrderItemsTableProps) => (
  <Paper variant="outlined" sx={{ borderRadius: 0, borderColor: "divider" }}>
    <Box
      sx={{
        p: 3,
        borderBottom: 1,
        borderColor: "divider",
        display: "flex",
        alignItems: "center",
        gap: 1.5,
      }}
    >
      <ReceiptOutlinedIcon />
      <Typography
        variant="h6"
        sx={{ fontWeight: 800, textTransform: "uppercase" }}
      >
        Order Items
      </Typography>
    </Box>
    <TableContainer>
      <Table>
        <TableHead sx={{ bgcolor: "action.hover" }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 800 }}>PRODUCT</TableCell>
            <TableCell sx={{ fontWeight: 800 }}>ATTRIBUTES</TableCell>
            <TableCell align="center" sx={{ fontWeight: 800 }}>
              QTY
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 800 }}>
              PRICE
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 800 }}>
              TOTAL
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items?.map((item) => (
            <TableRow key={item.id} hover>
              <TableCell>
                <Typography sx={{ fontWeight: 600 }}>
                  {item.product?.title || "Unknown Product"}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  SKU: {item.product?.sku || "—"}
                </Typography>
              </TableCell>
              <TableCell>
                {item.size && (
                  <Typography variant="body2">
                    Size: <strong>{item.size}</strong>
                  </Typography>
                )}
                {item.color && (
                  <Typography variant="body2">
                    Color: <strong>{item.color}</strong>
                  </Typography>
                )}
              </TableCell>
              <TableCell align="center">
                <Typography sx={{ fontWeight: 600 }}>
                  x{item.quantity}
                </Typography>
              </TableCell>
              <TableCell align="right">
                ${Number(item.product?.price || 0).toFixed(2)}
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>
                ${(Number(item.product?.price || 0) * item.quantity).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Box
      sx={{
        p: 3,
        display: "flex",
        justifyContent: "flex-end",
        bgcolor: "action.hover",
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 900 }}>
        TOTAL PAID: ${totalPrice.toFixed(2)}
      </Typography>
    </Box>
  </Paper>
);
