import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Button,
  Grid,
  Container,
} from "@mui/material";
import CustomCardHeader from "../../components/UI/CustomCardHeader";

const MatsReq = () => {
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    reqNo: "AUTO-12345",
    dateRequested: today,
    program: "",
    items: "",
    purpose: "",
    dateNeeded: "",
    remarks: "",
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
      <Card sx={{ maxWidth: 2000, margin: "auto", borderRadius: 4, boxShadow: 7, mb: 4 }}>
        <CustomCardHeader title="Material Requisition Form" showBackButton />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Requisition Form No."
                  variant="outlined"
                  id="reqNo"
                  value={formData.reqNo}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Date Requested"
                  variant="outlined"
                  id="dateRequested"
                  type="date"
                  value={formData.dateRequested}
                  fullWidth
                  disabled
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
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
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Date Needed"
                  variant="outlined"
                  id="dateNeeded"
                  type="date"
                  value={formData.dateNeeded}
                  onChange={handleChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
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
            <CardActions sx={{ justifyContent: "flex-end", padding: 2 }}>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#2E7D32", color: "white", borderRadius: 1, textTransform: "none" }}
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