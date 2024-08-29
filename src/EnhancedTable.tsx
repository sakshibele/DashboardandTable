import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface RowData{
  invoiceId: string,
  vendorName: string,
  amount: number,
  date: string,
  approver: string,
  attachmentLink: string,
  status: string,
  action: any
}




export default function EnhancedTable() {
  const [rows, setRows]= useState<RowData[]>([]);
  const navigate = useNavigate();

//use effect to fetch data from API
useEffect(()=>{
  const employeeId = localStorage.getItem('employeeId');
  axios.get(`http://localhost:8080/employee/getInvoicesByEmployeeId/${employeeId}`)
.then(response=>{
    setRows(response.data);
    console.log(response.data)
    
  }).catch(error=>{
    console.log("error in fetching data",error)
  });
},[]);

//edit button function
function handleEditClick(invoiceId: string){
  navigate(`/edit-invoice/${invoiceId}`)
  }
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return format(date, 'yyyy-MM-dd'); // or use any other desired format
  }
  return (
  

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Sr. No</TableCell>
            <TableCell align="right">Vendor</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Approver</TableCell>
            <TableCell align="right">Attachment</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={row.invoiceId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="right">{row.vendorName}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="right">{formatDate(row.date)}</TableCell>
              <TableCell align="right">{row.approver}</TableCell>
              <TableCell align="right">
              <a href={row.attachmentLink} target="_blank" rel="noopener noreferrer">
              View
              </a>
              </TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => handleEditClick(row.invoiceId)}>
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
