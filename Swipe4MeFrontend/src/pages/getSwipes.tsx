// Author: Steven Yi
// Time spent: around 6 hours

import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import {
  createTheme,
  Grid2,
  TextField,
  ThemeProvider,
  Typography,
  Box,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Checkbox,
  ListItemText,
  Chip,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import SearchIcon from "@mui/icons-material/Search";
import { getAllAvailabilities } from "../clients/availabilityClient";
import { getCurrentUserTransactionsAsBuyer } from "../clients/transactionClient";
import {
  createTransaction,
  TransactionStatus,
  CreateTransactionRequest,
} from "../clients/transactionClient";
import { getCurrentUser } from "../clients/userClient";
import { useSnackbar } from "../context/SnackbarContext";
import { DiningLocation, User, Availability } from "../types";
import { SelectChangeEvent } from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const theme = createTheme({
  palette: {
    primary: {
      main: "#25DAC5",
    },
  },
  typography: {
    fontFamily: "Poppins",
  },
});

const ROWS_PER_PAGE = 6;

const NoStudentsAvailable: React.FC = () => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 1,
    }}
  >
    <InfoIcon color="action" style={{ marginRight: "8px" }} />
    <Typography variant="body1" color="textSecondary">
      No Students are available at this time. Check back later!
    </Typography>
  </Box>
);

const TableHeader: React.FC<{
  onDiningHallFilterChange: (selected: DiningLocation[]) => void;
  onDateFilterChange: (date: Date | null) => void;
}> = ({ onDiningHallFilterChange, onDateFilterChange }) => {
  const [selectedDiningHalls, setSelectedDiningHalls] = useState<
    DiningLocation[]
  >([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDiningHallChange = (
    event: SelectChangeEvent<DiningLocation[]>
  ) => {
    const value = event.target.value as DiningLocation[];
    setSelectedDiningHalls(value);
    onDiningHallFilterChange(value);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    onDateFilterChange(date);
  };

  return (
    <Grid2
      container
      alignItems="center"
      justifyContent="space-between"
      style={{ width: "90%", margin: "0 auto", paddingTop: "20px" }}
    >
      <Grid2>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, fontSize: "22.4066px", lineHeight: "34px" }}
        >
          All Students
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: "#16C098",
            fontWeight: 400,
            fontSize: "14.2588px",
            lineHeight: "21px",
          }}
        >
          Active Students
        </Typography>
      </Grid2>
      <Grid2 container spacing={2} alignItems="center">
        <Grid2>
          <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
            <InputLabel>Dining Halls</InputLabel>
            <Select
              multiple
              value={selectedDiningHalls}
              onChange={handleDiningHallChange}
              input={<OutlinedInput label="Dining Halls" />}
              renderValue={(selected) => (
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 0.5,
                    maxWidth: "120px",
                    maxHeight: "25px",
                    overflowY: "auto",
                  }}
                >
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {Object.values(DiningLocation).map((location) => (
                <MenuItem key={location} value={location}>
                  <Checkbox
                    checked={selectedDiningHalls.indexOf(location) > -1}
                  />
                  <ListItemText primary={location} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid2>
        <Grid2>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date"
              value={selectedDate}
              onChange={handleDateChange}
              slotProps={{
                textField: {
                  size: "small",
                  sx: { width: 200 },
                },
              }}
            />
          </LocalizationProvider>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

const buySwipes: React.FC = () => {
  // State variables
  const [page, setPage] = useState(0);
  const [allAvailabilities, setAllAvailabilities] = useState<Availability[]>(
    []
  );
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [
    currentUserPendingAvailabilityIds,
    setCurrentUserPendingAvailabilityIds,
  ] = useState<Set<number>>(new Set());
  const [loadingAvailabilityId, setLoadingAvailabilityId] = useState<
    number | null
  >(null);
  const [filteredDiningHalls, setFilteredDiningHalls] = useState<
    DiningLocation[]
  >([]);
  const [filteredDate, setFilteredDate] = useState<Date | null>(null);

  const { snackbar } = useSnackbar();

  // Fetch all availabilities
  useEffect(() => {
    const fetchAvailabilities = async () => {
      try {
        const response = await getAllAvailabilities();

        // Filter out past availabilities
        const currentTime = new Date();
        const futureAvailabilities = response.filter(
          (availability) => new Date(availability.startTime) > currentTime
        );

        // Sort the availabilities by start time
        futureAvailabilities.sort((a, b) => {
          return (
            new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
          );
        });

        // If the user is logged in, filter out their own availability
        const userId = localStorage.getItem("userId");
        if (!!userId) {
          const filteredAvailabilities = futureAvailabilities.filter(
            (availability) => availability.user.id !== parseInt(userId)
          );
          setAllAvailabilities(filteredAvailabilities);
          setAvailabilities(filteredAvailabilities);
        } else {
          // If the user is not logged in, show all availabilities
          setAllAvailabilities(futureAvailabilities);
          setAvailabilities(futureAvailabilities);
        }
      } catch (error) {
        console.error("Error fetching availabilities:", error);
      }
    };

    fetchAvailabilities();
  }, []);

  // Fetch all transactions for the current user
  useEffect(() => {
    const fetchCurrentUserTransactions = async () => {
      const response = await getCurrentUserTransactionsAsBuyer();
      setCurrentUserPendingAvailabilityIds(
        new Set(
          response
            .filter(
              (transaction) => transaction.status === TransactionStatus.PENDING
            )
            .map((transaction) => transaction.availability.id)
        )
      );
      console.log(currentUserPendingAvailabilityIds);
    };

    fetchCurrentUserTransactions();
  }, []);

  // Update the filtering useEffect
  useEffect(() => {
    let filtered = allAvailabilities;

    // Apply dining hall filter
    if (filteredDiningHalls.length > 0) {
      filtered = filtered.filter((availability) =>
        filteredDiningHalls.includes(
          convertEnumStringToDiningLocation(availability.location)
        )
      );
    }

    // Apply date filter
    if (filteredDate) {
      filtered = filtered.filter((availability) => {
        const availabilityDate = new Date(availability.startTime);
        return (
          availabilityDate.getFullYear() === filteredDate.getFullYear() &&
          availabilityDate.getMonth() === filteredDate.getMonth() &&
          availabilityDate.getDate() === filteredDate.getDate()
        );
      });
    }

    setAvailabilities(filtered);
  }, [filteredDiningHalls, filteredDate, allAvailabilities]);

  /**
   * Formats the available time of the availability
   * @param startTime - The start time of the availability
   * @param endTime - The end time of the availability
   * @returns The formatted available time
   */
  const formatAvailableTime = (startTime: string, endTime: string) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    return `${start.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/Chicago",
    })} - ${end.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/Chicago",
    })}`;
  };

  /**
   * Formats the date of the availability
   * @param date - The date of the availability
   * @returns The formatted date
   */
  const formatDate = (date: string) => {
    const start = new Date(date);
    return start.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
    });
  };

  const convertEnumStringToDiningLocation = (location: string) => {
    return DiningLocation[location as keyof typeof DiningLocation];
  };

  /**
   * Handles the sending of an invite
   * @param availabilityId - The id of the availability
   * @param sellerId - The id of the seller
   */
  const handleSendInvite = async (availabilityId: number, sellerId: number) => {
    const currentUser: User = await getCurrentUser();

    const createTransactionRequest: CreateTransactionRequest = {
      availabilityId: availabilityId,
      buyerId: currentUser.id,
      sellerId: sellerId,
    };

    setLoadingAvailabilityId(availabilityId);

    try {
      await createTransaction(createTransactionRequest);
      snackbar.success("Invite sent!");
      setCurrentUserPendingAvailabilityIds(
        new Set(currentUserPendingAvailabilityIds.add(availabilityId))
      );
    } catch (err) {
      snackbar.error("Failed to send invite");
    } finally {
      setLoadingAvailabilityId(null);
    }
  };

  /**
   * Checks if a transaction with the given availabilityId is pending
   * @param availabilityId - The id of the availability
   * @returns True if the transaction is pending, false otherwise
   */
  const isTransactionPending = (availabilityId: number) => {
    return currentUserPendingAvailabilityIds.has(availabilityId);
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ paddingTop: "50px" }}>
        <TableContainer
          component={Paper}
          style={{
            width: "80%",
            margin: "0 auto",
            borderRadius: "30px",
            maxHeight: "650px",
            minHeight: "600px",
            overflowY: "auto",
            position: "relative",
          }}
        >
          {/* If there are no availabilities, show the NoStudentsAvailable component */}
          {availabilities.length === 0 && <NoStudentsAvailable />}

          <TableHeader
            onDiningHallFilterChange={setFilteredDiningHalls}
            onDateFilterChange={setFilteredDate}
          />

          {/* Table body */}
          <div
            style={{
              width: "90%",
              margin: "0 auto",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell align="left">
                    <span style={{ color: "#B5B7C0" }}>Student Name</span>
                  </TableCell>
                  <TableCell align="center">
                    <span style={{ color: "#B5B7C0" }}>Dining Hall</span>
                  </TableCell>
                  <TableCell align="center">
                    <span style={{ color: "#B5B7C0" }}>Available Time</span>
                  </TableCell>
                  <TableCell align="center">
                    <span style={{ color: "#B5B7C0" }}>Date</span>
                  </TableCell>
                  <TableCell align="left">
                    <span style={{ color: "#B5B7C0" }}>Email</span>
                  </TableCell>
                  <TableCell align="center">
                    <span style={{ color: "#B5B7C0" }}>Rating</span>
                  </TableCell>
                  <TableCell align="center">
                    <span style={{ color: "#B5B7C0" }}>Action</span>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {availabilities.length > 0 &&
                  availabilities
                    .slice(
                      page * ROWS_PER_PAGE,
                      page * ROWS_PER_PAGE + ROWS_PER_PAGE
                    )
                    .map((row, index) => (
                      <TableRow key={index}>
                        <TableCell align="left">
                          {row.user.firstName} {row.user.lastName}
                        </TableCell>
                        <TableCell align="center">
                          {convertEnumStringToDiningLocation(row.location)}
                        </TableCell>
                        <TableCell align="center">
                          {formatAvailableTime(row.startTime, row.endTime)}
                        </TableCell>
                        <TableCell align="center">
                          {formatDate(row.startTime)}
                        </TableCell>
                        <TableCell align="left">{row.user.email}</TableCell>
                        <TableCell align="center">
                          {row.user.rating || "N/A"}
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            variant="contained"
                            color="primary"
                            fullWidth={true}
                            style={{
                              width: "120px",
                              whiteSpace: "nowrap",
                              minWidth: "fit-content",
                              boxShadow: "none",
                              ...(isTransactionPending(row.id)
                                ? {
                                    backgroundColor: "#F4F4F4",
                                    border: "1px solid #757171",
                                  }
                                : {}),
                            }}
                            onClick={() =>
                              handleSendInvite(row.id, row.user.id)
                            }
                            disabled={isTransactionPending(row.id)}
                            loading={loadingAvailabilityId === row.id}
                          >
                            <div
                              style={{
                                color: isTransactionPending(row.id)
                                  ? "#757171"
                                  : "white",
                              }}
                            >
                              {isTransactionPending(row.id)
                                ? "Pending"
                                : "Send Invite"}
                            </div>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
              <TableFooter>
                {availabilities.length > 0 && (
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[ROWS_PER_PAGE]}
                      count={availabilities.length}
                      rowsPerPage={ROWS_PER_PAGE}
                      page={page}
                      onPageChange={(_, newPage) => {
                        setPage(newPage);
                      }}
                    />
                  </TableRow>
                )}
              </TableFooter>
            </Table>
          </div>
        </TableContainer>
      </div>
    </ThemeProvider>
  );
};

export default buySwipes;
