import React, { useState, useEffect } from 'react';
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import axios from 'axios';

const EditProfile = ({ userId }) => {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    no_tlfn: '',
    alamat: '',
    ttd: null,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/users/${userId}`);
        const userData = response.data.user;
        setProfileData(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileData((prevData) => ({
      ...prevData,
      ttd: file,
    }));
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('no_tlfn', values.no_tlfn);
      formData.append('alamat', values.alamat);
      formData.append('ttd', values.ttd);

      await axios.put(`http://localhost:8000/api/usersupdate/${userId}`, formData);

      console.log("User data updated successfully!");
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().required("Email is required"),
    no_tlfn: yup.string().required("Phone Number is required"),
    alamat: yup.string().required("Alamat is required"),
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
              label="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ marginBottom: '16px' }}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Phone Number"
              name="no_tlfn"
              value={values.no_tlfn}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.no_tlfn && Boolean(errors.no_tlfn)}
              helperText={touched.no_tlfn && errors.no_tlfn}
              sx={{ marginBottom: '16px' }}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Alamat"
              name="alamat"
              value={values.alamat}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.alamat && Boolean(errors.alamat)}
              helperText={touched.alamat && errors.alamat}
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
                sx={{ width: '200px' }}
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