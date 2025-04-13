import React from "react";
import { Grid, MenuItem, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import { blue } from "@mui/material/colors";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is Required"),
  password: Yup.string().required("Password is required"),
});
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];
const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      dateofBirth: {
        day: "",
        month: "",
        year: "",
      },
    },
    validationSchema,
    onSubmit: (values) => {
      const { day, month, year } = values.dateofBirth;
      const dateofBirth = `${year}-${month}-${day}`;
      values.dateofBirth = dateofBirth;
      console.log("form value", values);
    },
  });

  const handleDateChange = (name) => (event) => {
    formik.setFieldValue("dateofBirth", {
      ...formik.values.dateofBirth,
      [name]: event.target.value,
    });
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Full Name"
            name="fullName"
            variant="outlined"
            size="large"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            variant="outlined"
            size="large"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password" // Added type password for security
            variant="outlined"
            size="large"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid>
        <Grid item xs={4}>
          <InputLabel>Date</InputLabel>
          <Select
            name="day"
            fullWidth
            onChange={handleDateChange("day")}
            onBlur={formik.handleBlur}
            value={formik.values.dateofBirth.day}
          >
            {days.map((day) => (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={4}>
          <InputLabel>Month</InputLabel>
          <Select
            name="month"
            fullWidth
            onChange={handleDateChange("month")}
            onBlur={formik.handleBlur}
            value={formik.values.dateofBirth.month}
          >
            {months.map((month) => (
              <MenuItem key={month.label} value={month.value}>
                {month.label}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={4}>
          <InputLabel>Year</InputLabel>
          <Select
            name="year"
            fullWidth
            onChange={handleDateChange("year")}
            onBlur={formik.handleBlur}
            value={formik.values.dateofBirth.year}
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid className="mt-20" item xs={12}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ borderRadius: "29px", py: "15px", bgcolor: blue[500] }}
            size="large"
          >
            Signup
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
export default SignupForm;
