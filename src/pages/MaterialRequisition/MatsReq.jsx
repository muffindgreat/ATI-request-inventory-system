import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Container,
} from '@mui/material';

const MatsReq = () => {
  const [formData, setFormData] = useState({
    reqNo: '',
    dateRequested: '',
    // name: '',
    // section: '',
    // designation: '',
    program: '',
    items: '',
    purpose: '',
    dateNeeded: '',
    remarks: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <Typography 
        variant="h5" 
        component="h2" 
        sx={{ color: 'green', fontWeight: 'bold', textAlign: 'center', mb: 3 }}
      >
        Material Requisition Form
      </Typography>
      <Card sx={{ maxWidth: 2000, margin: 'auto', borderRadius: 4, boxShadow: 7, mb: 4 }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Requisition Form No."
                  variant="outlined"
                  id="reqNo"
                  value={formData.reqNo}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Date Requested"
                  variant="outlined"
                  id="dateRequested"
                  type="date"
                  value={formData.dateRequested}
                  onChange={handleChange}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  label="Name"
                  variant="outlined"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Section"
                  variant="outlined"
                  id="section"
                  value={formData.section}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Designation"
                  variant="outlined"
                  id="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid> */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Program"
                  variant="outlined"
                  id="program"
                  value={formData.program}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Item/s and Quantity"
                  variant="outlined"
                  id="items"
                  value={formData.items}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Purpose"
                  variant="outlined"
                  id="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Date Needed"
                  variant="outlined"
                  id="dateNeeded"
                  type="date"
                  value={formData.dateNeeded}
                  onChange={handleChange}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Remarks"
                  variant="outlined"
                  id="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
            </Grid>
            <CardActions sx={{ justifyContent: 'flex-end', padding: 2 }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#2E7D32',
                  color: 'white',
                  borderRadius: 1,
                  textTransform: 'none',
                }}
                type="submit"
              >
                Submit
              </Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default MatsReq;
