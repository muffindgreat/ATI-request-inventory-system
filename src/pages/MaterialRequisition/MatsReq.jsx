import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  TextField,
  Button,
  Divider,
  Grid,
  Container,
} from "@mui/material";
import CustomCardHeader from "../../components/UI/CustomCardHeader";
import BackgroundImage from "../../components/UI/BackgroundImage";
import { useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../config/firebaseConfig";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const MatsReq = () => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const [dateError, setDateError] = useState("");
  const location = useLocation();
  const { selectedItems } = location.state || {};
  const [formData, setFormData] = useState({
    reqNo: "AUTO-12345",
    date: today,
    program: "",
    materialRequested: selectedItems,
    purpose: "",
    dateNeeded: "",
    remarks: "",
    status: "Pending",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "User", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          setFormData({
            ...formData,
            userID: user.uid,
            firstName: data.firstName,
            lastName: data.lastName,
            designation: data.designation || "",
            email: data.email,
            phoneNumber: data.phoneNumber || "",
            section: data.section || "",
          });
        } else {
          console.log("No user data found");
        }
      } else {
        setFormData(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { userID, ...formDataWithoutUserID } = formData;

      const trimmedData = {
        ...formDataWithoutUserID,
        program: formData.program.trim(),
        purpose: formData.purpose.trim(),
        remarks: formData.remarks ? formData.remarks.trim() : "",
      };

      // Add new request to "Request" collection and get the new document ID
      const requestRef = await addDoc(collection(db, "Request"), trimmedData);
      const reqID = requestRef.id; // Ensure reqID is available

      // Reference to the user document
      const userRef = doc(db, "User", userID);
      const userDoc = await getDoc(userRef);
      const userData = userDoc.exists() ? userDoc.data() : {};

      // Ensure `myOrders` is an array before updating
      const updatedMyOrders = userData.myOrders ? arrayUnion(reqID) : [reqID];

      // Update the user document with the new `myOrders` array
      await updateDoc(userRef, { myOrders: updatedMyOrders });

      console.log("Request successfully created and added to user's myOrders!");
    } catch (error) {
      console.error("Error processing request:", error);
    } finally {
      navigate("/my-requests");
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <BackgroundImage />
      <Container
        maxWidth="lg"
        sx={{
          pt: { xs: 12, sm: 14, md: 16 }, // Adjust padding top based on screen size
          mb: 10,
        }}
      >
        <Card
          sx={{
            maxWidth: 2000,
            margin: "auto",
            borderRadius: 2,
            boxShadow: 7,
            mb: 4,
          }}
        >
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
                    id="date"
                    type="date"
                    value={formData.date}
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
                    autoComplete="off"
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Date Needed"
                      value={
                        formData.dateNeeded ? dayjs(formData.dateNeeded) : null
                      }
                      onChange={(newValue) => {
                        if (newValue && newValue.isBefore(dayjs(), "day")) {
                          setDateError("Please select today or a future date.");
                          handleChange({
                            target: { id: "dateNeeded", value: "" }, // Reset invalid date
                          });
                        } else {
                          setDateError("");
                          handleChange({
                            target: {
                              id: "dateNeeded",
                              value: newValue.format("MM-DD-YYYY"),
                            },
                          });
                        }
                      }}
                      disablePast
                      format="MM-DD-YYYY"
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          required: true,
                          error: !!dateError,
                          helperText: dateError,
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Purpose"
                    variant="outlined"
                    id="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Remarks (Optional)"
                    variant="outlined"
                    id="remarks"
                    value={formData.remarks}
                    onChange={handleChange}
                    fullWidth
                    autoComplete="off"
                    multiline
                    rows={4}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ width: "100%", my: 2 }} />
              </Grid>

              <CardActions sx={{ justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  loading={loading}
                  loadingPosition="start"
                  sx={{
                    backgroundColor: "#2E7D32",
                    color: "white",
                    borderRadius: 1,
                    textTransform: "none",
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
    </Box>
  );
};

export default MatsReq;
