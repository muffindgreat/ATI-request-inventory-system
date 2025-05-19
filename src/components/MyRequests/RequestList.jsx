import * as React from "react";
import {
  Accordion,
  AccordionDetails,
  Typography,
  Box,
  Stack,
  Chip,
  Divider,
  Button,
} from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DoneIcon from "@mui/icons-material/Done";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import ModalComponent from "../ModalComponent/ModalComponent";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react"; // Combined import
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Checkbox from "@mui/material/Checkbox";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import useToast from "../../components/Toastify/useToast";

const formatQuantity = (num) => new Intl.NumberFormat().format(num);

export default function RequestList({ items, tabIndex }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Reset expanded when tabIndex changes
  useEffect(() => {
    setExpandedIndex(null);
  }, [tabIndex]);

  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      {items.length > 0 ? (
        items.map((item, index) => (
          <Accordion
            key={index}
            expanded={expandedIndex === index}
            onChange={() =>
              setExpandedIndex(expandedIndex === index ? null : index)
            }
            sx={{ my: 1, borderRadius: 2 }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ width: "100%" }}
            >
              <RequestItemSummary item={item} />
            </AccordionSummary>
            <AccordionDetails
              sx={{ p: 2, bgcolor: "#f9f9f9", borderRadius: 2 }}
            >
              {item.materials.length > 1 && (
                <RequestMaterials materials={item.materials.slice(1)} />
              )}
              <RequestDetails item={item} />
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Typography sx={{ textAlign: "center", my: 2, color: "gray" }}>
          No requests found
        </Typography>
      )}
    </Box>
  );
}

function RequestItemSummary({ item }) {
  const firstMaterial = item.materials[0];
  const additionalCount = item.materials.length - 1; // Calculate additional items

  return (
    <Box sx={{ display: "flex", alignItems: "center", p: 1, width: "100%" }}>
      {/* Material Image */}
      {firstMaterial && (
        <Box
          component="img"
          sx={{
            mr: 1,
            width: 60,
            height: 90,
            minWidth: 60,
            minHeight: 90,
            borderRadius: 1,
            flexShrink: 0,
            objectFit: "cover",
          }}
          src={firstMaterial.imageUrl} // ✅ Fix: Use imageUrl instead of image
          alt={firstMaterial.name}
        />
      )}

      {/* Material Info */}
      <Box sx={{ flexGrow: 1, mx: 1 }}>
        <Box>
          <Typography
            component={Link}
            to={`/item-info/${firstMaterial?.id}`}
            variant="body1"
            sx={{
              fontWeight: "bold",
              mb: 0.5,
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden", // Truncate after 2 lines
              color: "inherit",
              textDecoration: "none",
              width: "fit-content",
            }}
          >
            {firstMaterial ? firstMaterial.name : "No materials"}
          </Typography>

          {additionalCount > 0 && (
            <Typography
              component="span"
              sx={{
                color: "gray",
                fontSize: 14,
                display: "block",
                "@media (min-width:600px)": {
                  display: "inline",
                },
              }}
            >
              (+{additionalCount} more)
            </Typography>
          )}
        </Box>
        <Typography variant="body2" color="textSecondary">
          {firstMaterial.type}
        </Typography>

        {/* Programs (if available) */}
        {firstMaterial.bannerProgram?.length > 0 && (
          <Stack
            direction="row"
            sx={{
              mt: 1,
              flexWrap: "wrap",
              gap: 1,
              alignItems: "center",
            }}
          >
            {firstMaterial.bannerProgram.map((program, i) => (
              <Tooltip key={i} title={program}>
                <Chip
                  label={program}
                  color="primary"
                  size="small"
                  sx={{
                    maxWidth: {
                      xs: 90, // ellipsis on small screens
                      sm: "none", // full width on medium and up
                    },
                    textOverflow: {
                      xs: "ellipsis",
                      sm: "initial",
                    },
                    overflow: {
                      xs: "hidden",
                      sm: "visible",
                    },
                    whiteSpace: {
                      xs: "nowrap",
                      sm: "normal",
                    },
                  }}
                />
              </Tooltip>
            ))}
          </Stack>
        )}
      </Box>

      {/* Status & Quantity */}
      <Stack spacing={0.5} alignItems="flex-end">
        <Chip
          label={getStatusLabel(item.status)}
          color={getStatusColor(item.status)}
          size="small"
          sx={{ borderRadius: 2, height: 24, minWidth: 80 }}
        />
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ fontWeight: "bold" }}
        >
          Qty: {formatQuantity(firstMaterial.quantity)}
          {firstMaterial.previousQuantity &&
            firstMaterial.previousQuantity !== firstMaterial.quantity && (
              <span style={{ color: "gray", fontWeight: "normal" }}>
                {" "}
                (Requested: {formatQuantity(firstMaterial.previousQuantity)})
              </span>
            )}
        </Typography>
      </Stack>
    </Box>
  );
}

function RequestMaterials({ materials }) {
  return (
    <>
      {materials.map((material, index) => (
        <Box key={index}>
          {index > 0 && <Divider sx={{ my: 1 }} />}

          <Box sx={{ display: "flex", alignItems: "center", my: 1, p: 1 }}>
            <Box
              component="img"
              sx={{
                borderRadius: 1,
                mr: 2,
                width: 60,
                height: 90,
                minWidth: 60,
                minHeight: 90,
                flexShrink: 0,
                objectFit: "cover",
              }}
              src={material.imageUrl} // ✅ Fix: Use imageUrl
              alt={material.name}
            />
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                component={Link}
                to={`/item-info/${material.id}`}
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  mb: 0.5,
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                {material.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {material.type}
              </Typography>
              {material.bannerProgram?.length > 0 && ( // ✅ Fix: Use bannerProgram (not bannerPrograms)
                <Stack
                  direction="row"
                  sx={{
                    mt: 1,
                    flexWrap: "wrap",
                    gap: 1,
                    alignItems: "center",
                  }}
                >
                  {material.bannerProgram.map((program, i) => (
                    <Tooltip key={i} title={program}>
                      <Chip
                        label={program}
                        color="primary"
                        size="small"
                        sx={{
                          maxWidth: {
                            xs: 90, // ellipsis on small screens
                            sm: "none", // full width on medium and up
                          },
                          textOverflow: {
                            xs: "ellipsis",
                            sm: "initial",
                          },
                          overflow: {
                            xs: "hidden",
                            sm: "visible",
                          },
                          whiteSpace: {
                            xs: "nowrap",
                            sm: "normal",
                          },
                        }}
                      />
                    </Tooltip>
                  ))}
                </Stack>
              )}
            </Box>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ fontWeight: "bold", px: 1, borderRadius: 1 }}
            >
              Qty: {formatQuantity(material.quantity)}
              {material.previousQuantity &&
                material.previousQuantity !== material.quantity && (
                  <span style={{ color: "gray", fontWeight: "normal" }}>
                    {" "}
                    (Requested: {formatQuantity(material.previousQuantity)})
                  </span>
                )}
            </Typography>
          </Box>
        </Box>
      ))}
    </>
  );
}

function getStatusLabel(status) {
  return status === "Received" ? "Completed" : status;
}

function getStatusColor(status) {
  switch (status) {
    case "Pending":
      return "warning";
    case "Accepted":
    case "Approved":
      return "info";
    case "Completed":
    case "Received":
      return "success";
    default:
      return "default";
  }
}

function formatDate(dateString) {
  const date = new Date(dateString); // Parse the string into a Date object
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short", // "Mon", "Tue", etc.
    year: "numeric", // 2025
    month: "short", // "Apr"
    day: "numeric", // 18
  }).format(date);
}

const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />, // Icon for "Poor"
    label: "Poor",
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />, // Icon for "Fair"
    label: "Fair",
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />, // Icon for "Satisfactory"
    label: "Satisfactory",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />, // Icon for "Very Satisfactory"
    label: "Very Satisfactory",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />, // Icon for "Excellent"
    label: "Excellent",
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

function RequestDetails({ item }) {
  const [openModal, setOpenModal] = useState(false); // State to control modal visibility
  const [feedback, setFeedback] = useState("");
  const [feedbackResearch, setFeedbackResearch] = useState(""); // State for research feedback
  const [feedbackPurpose, setFeedbackPurpose] = useState("");
  const [serviceRating, setServiceRating] = useState(0);
  const [courtesyRating, setCourtesyRating] = useState(0);
  const [timelinessRating, setTimelinessRating] = useState(""); // Default value
  const [researchChecked, setResearchChecked] = useState(false); // Default unchecked
  const [purposeChecked, setPurposeChecked] = useState(false); // Default unchecked
  const [respondentName, setRespondentName] = useState(""); // Default empty
  const [respondentAgency, setRespondentAgency] = useState("");
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add loading state

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const showToast = useToast();

  const handleCloseModal = () => {
    // Reset all input fields
    setRespondentName(""); // Clear name field
    setRespondentAgency(""); // Clear agency/school field
    setFeedbackResearch(""); // Clear research feedback
    setFeedbackPurpose(""); // Clear purpose feedback
    setServiceRating(0); // Reset service rating
    setCourtesyRating(0); // Reset courtesy rating
    setTimelinessRating(""); // Reset timeliness rating
    setFeedback(""); // Clear comments

    // Close the modal
    setOpenModal(false);
  };

  const handleSubmitFeedback = async () => {
    // Validation for required fields
    if (
      !feedbackResearch.trim() ||
      !feedbackPurpose.trim() ||
      !timelinessRating ||
      !serviceRating ||
      !courtesyRating
    ) {
      showToast("Please fill in all required fields.", "error");
      return;
    }

    // Prepare feedback data
    const feedbackData = {
      respondentName, // Optional
      respondentAgency, // Optional
      feedbackResearch, // Required
      feedbackPurpose, // Required
      serviceRating, // Required
      courtesyRating, // Required
      timelinessRating, // Required
      feedback, // Optional
      date: new Date().toISOString(), // Add current timestamp
    };

    try {
      setIsSubmitting(true); // Set loading state to true
      // Dynamically update the document in the "Request" collection
      const requestDocRef = doc(db, "Request", item.id); // Use dynamic ID from item
      await updateDoc(requestDocRef, { rate: feedbackData });
      showToast("Feedback submitted successfully!", "success");
      setIsFeedbackSubmitted(true); // Disable the feedback button
      handleCloseModal(); // Close the modal
    } catch (error) {
      console.error("Error submitting feedback:", error);
      showToast("Failed to submit feedback. Please try again.", "error");
    } finally {
      setIsSubmitting(false); // Reset loading state
    }

    // Reset form fields
    setRespondentName(""); // Reset name field
    setRespondentAgency(""); // Reset agency/school field
    setFeedbackResearch(""); // Clear the research feedback input
    setFeedbackPurpose(""); // Clear the purpose feedback input
    setServiceRating(null); // Reset the rating
    setCourtesyRating(null); // Reset the courtesy rating
    setTimelinessRating(""); // Reset timeliness
    setFeedback(""); // Clear comments
  };

  const statusStages = [
    {
      key: "date",
      label: "Requested",
      icon: <AccessTimeIcon sx={{ fontSize: 18, mr: 1 }} />,
    },
    {
      key: "acceptedDate",
      label: "Accepted",
      icon: <HourglassEmptyIcon sx={{ fontSize: 18, mr: 1 }} />,
      show: item.status !== "Pending",
    },
    {
      key: "approvedDate",
      label: "Approved",
      icon: <CheckCircleIcon sx={{ fontSize: 18, mr: 1 }} />,
      show: ["Approved", "Completed", "Received"].includes(item.status),
    },
    {
      key: "receivedDate",
      label: "Received",
      icon: <DoneIcon sx={{ fontSize: 18, mr: 1 }} />,
      show: item.status === "Received",
    },
  ];

  return (
    <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: 2 }}>
      <Stack spacing={1}>
        {statusStages.map(({ key, label, icon, show }) =>
          show !== false ? (
            <Typography key={key} variant="body2" color="textSecondary">
              {icon} <strong>{label}:</strong> {item[key] || "Not yet recorded"}
            </Typography>
          ) : null
        )}
      </Stack>
      <Divider sx={{ my: 2 }} />

      {/* Display Remarks if Status is Accepted, Approved, Received, or Completed */}
      {["Accepted", "Approved", "Received", "Completed"].includes(
        item.status
      ) &&
        item.remarks && (
          <Typography variant="body2">
            <strong>Remarks:</strong> {item.remarks || "No remarks available"}
          </Typography>
        )}

      <Typography variant="body2">
        <strong>Purpose:</strong> {item.purpose || "No purpose provided"}
      </Typography>
      <Typography variant="body2">
        <strong>Date Needed:</strong>{" "}
        {item.dateNeeded ? formatDate(item.dateNeeded) : "Not specified"}
      </Typography>
      <Typography variant="body2">
        <strong>Program:</strong> {item.program || "Not specified"}
      </Typography>

      {console.log(item)}

      {/* Feedback Button */}
      {item.status === "Received" && (
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleOpenModal}
          disabled={item.rate !== undefined}
        >
          {item.rate !== undefined ? "Feedback Submitted" : "Provide Feedback"}
        </Button>
      )}

      {/* Feedback Modal */}
      <ModalComponent
        open={openModal}
        handleClose={handleCloseModal}
        title="Feedback Form"
        content={
          <div sx={{ my: 10 }}>
            <Typography variant="body1" sx={{ mt: 2, mb: 1 }}>
              Respondent's Contact Information: (Optional)
            </Typography>
            <TextField
              label="Name"
              autoComplete="off"
              value={respondentName}
              onChange={(e) => setRespondentName(e.target.value)} // Update state
              placeholder="Enter your name"
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <TextField
              label="Agency/School"
              autoComplete="off"
              value={respondentAgency}
              onChange={(e) => setRespondentAgency(e.target.value)} // Update state
              placeholder="Enter your agency or school"
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
            />

            <Typography variant="body1" sx={{ mb: 1, mt: 1 }}>
              Please provide your feedback for this request:
            </Typography>
            <Typography variant="body1" sx={{ mb: 1, mt: 1 }}>
              Research on (Topic)*
            </Typography>
            <TextField
              value={feedbackResearch}
              onChange={(e) => setFeedbackResearch(e.target.value)}
              autoComplete="off"
              placeholder="Enter your feedback here..."
              fullWidth
              variant="standard"
              required
            />

            <Typography variant="body1" sx={{ mb: 1, mt: 2 }}>
              Avail information material distributed by ATI
            </Typography>
            <Typography>Purpose:</Typography>
            <TextField
              value={feedbackPurpose}
              onChange={(e) => setFeedbackPurpose(e.target.value)}
              autoComplete="off"
              placeholder="Enter your feedback here..."
              fullWidth
              variant="standard"
              required
            />

            <Typography variant="body1" sx={{ mb: 1, mt: 3 }}>
              Quality of service*
            </Typography>
            <StyledRating
              name="highlight-selected-only"
              value={serviceRating}
              onChange={(event, newValue) => setServiceRating(newValue)} // Update rating state
              IconContainerComponent={IconContainer}
              getLabelText={(value) => customIcons[value]?.label}
              highlightSelectedOnly
            />

            <Typography variant="body1" sx={{ mt: 1 }}>
              Timeliness of service*
            </Typography>
            <RadioGroup
              row
              value={timelinessRating}
              onChange={(e) => setTimelinessRating(e.target.value)} // Update timeliness state
              sx={{ gap: 1 }} // Add spacing between radio buttons
            >
              <FormControlLabel
                value="On time"
                control={<Radio />}
                label="On time"
              />
              <FormControlLabel value="Late" control={<Radio />} label="Late" />
            </RadioGroup>

            <Typography variant="body1" sx={{ mb: 1, mt: 1 }}>
              Courtesy of service*
            </Typography>
            <StyledRating
              name="courtesy-rating"
              value={courtesyRating}
              onChange={(event, newValue) => setCourtesyRating(newValue)} // Update courtesy rating state
              IconContainerComponent={IconContainer}
              getLabelText={(value) => customIcons[value]?.label}
              highlightSelectedOnly
            />
            <Typography variant="body1" sx={{ mt: 2, mb: 1 }}>
              Do you have any comments/Suggestions on improving our service
              delivery? If yes, please state below
            </Typography>
            <TextField
              multiline
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
              autoComplete="off"
              placeholder="Write your comments or suggestions here..."
              fullWidth
            />

            <div style={{ marginTop: "16px", textAlign: "right" }}>
              <Button
                variant="outlined"
                sx={{ mr: 2 }}
                onClick={handleCloseModal}
                disabled={isSubmitting} // Disable Cancel button while submitting
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmitFeedback}
                loading={isSubmitting}
                loadingPosition="start"
              >
                {isSubmitting ? "Submitting..." : "Submit"}{" "}
              </Button>
            </div>
          </div>
        }
      />
    </Box>
  );
}
