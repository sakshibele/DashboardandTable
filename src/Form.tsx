import React, { useEffect, useState } from 'react';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, Container, Grid, SelectChangeEvent } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
interface FormInvoice {
  vendorName: string;
  amount: number;
  approver: string;
  category: string;
  attachmentLink: string;
  action: any;
}

const Form: React.FC = () => {
    const { invoiceId } = useParams<{ invoiceId: string }>(); // Retrieve invoiceId from URL params
    const [invoice, setInvoice] = useState<FormInvoice>({
      vendorName: '',
      amount: 0,
      approver: '',
      category: '',
      attachmentLink: '',
      action: null,
    });
  
    useEffect(() => {
      if (invoiceId) {
        axios.get(`http://localhost:8080/employee/invoices/${invoiceId}`)
          .then(response => {
            setInvoice(response.data);
          })
          .catch(error => {
            console.log('Error fetching data', error);
          });
      }
    }, [invoiceId]);

  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setInvoice({
      ...invoice,
      [name]: value,
    });
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setInvoice({
      ...invoice,
      category: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted', invoice);
  };

  const handleCancel = () => {
    // Handle cancel logic here (e.g., reset form or navigate away)
    console.log('Form cancelled');
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Vendor Name"
              name="vendorName"
              value={invoice.vendorName}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Amount"
              name="amount"
              type="number"
              value={invoice.amount}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Approver"
              name="approver"
              value={invoice.approver}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Category</InputLabel>
              <Select
                value={invoice.category}
                onChange={handleSelectChange}
                name="category"
              >
                <MenuItem value="Category1">Category1</MenuItem>
                <MenuItem value="Category2">Category2</MenuItem>
                <MenuItem value="Category3">Category3</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Attachment Link"
              name="attachmentLink"
              value={invoice.attachmentLink}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Action"
              name="action"
              value={invoice.action}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              onClick={handleCancel}
              style={{ marginLeft: '16px' }}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Form;
