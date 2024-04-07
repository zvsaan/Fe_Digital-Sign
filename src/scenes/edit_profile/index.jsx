import React, { useState } from 'react';
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";

const EditProfile = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    phoneNumber: '',
    address: '',
    country: '',
    profilePicture: null,
  });

  // eslint-disable-next-line no-unused-vars
const handleChange = (e) => {
  const { name, value } = e.target;
  setProfileData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileData((prevData) => ({
      ...prevData,
      profilePicture: file,
    }));
  };

  const handleSubmit = (values) => {
    console.log(values);
    // Implementasi penyimpanan data ke backend bisa dilakukan di sini
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    phoneNumber: yup.string().required("Phone Number is required"),
    address: yup.string().required("Address is required"),
    country: yup.string().required("Country is required"),
  });

  return (
    <Box m="20px">
      <Header title="Edit Profile" subtitle="Sesuaikan data dirimu" />
      <Formik
        initialValues={profileData}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              variant="filled"
              label="Name"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
              sx={{ marginBottom: '16px' }}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Phone Number"
              name="phoneNumber"
              value={values.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.phoneNumber && Boolean(errors.phoneNumber)}
              helperText={touched.phoneNumber && errors.phoneNumber}
              sx={{ marginBottom: '16px' }}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Address"
              name="address"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.address && Boolean(errors.address)}
              helperText={touched.address && errors.address}
              sx={{ marginBottom: '16px' }}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Country"
              name="country"
              value={values.country}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.country && Boolean(errors.country)}
              helperText={touched.country && errors.country}
              sx={{ marginBottom: '16px' }}
            />
            <Box display="flex" flexDirection="column" alignItems="center">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ marginBottom: '12px' }}
                />
                <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    sx={{ width: '200px' }} // Lebar tombol disesuaikan
                >Save
                </Button>
                </Box>

          </form>
        )}
      </Formik>
    </Box>
  );
};

export default EditProfile;
