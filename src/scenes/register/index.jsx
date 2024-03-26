import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log('Registration successful', responseData);
        setSuccessMessage('Account successfully registered. You can now sign in.');
        setOpenSnackbar(true);
        setTimeout(() => {
          window.location.href = '/login';
        }, 3000); // Redirect after 3 seconds
      } else {
        console.error('Registration failed', responseData.error);
        setErrorMessage(responseData.error || 'Registration failed. Email already exists');
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Error during registration:', error.message);
      setErrorMessage('An error occurred during registration. Please try again later.');
      setOpenSnackbar(true);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: '500px',
        margin: 'auto',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        backgroundColor: 'white',
      }}
    >
      <Typography variant="h5" component="div" sx={{ mb: 2 }}>
        Registration Form
      </Typography>
      <TextField
        fullWidth
        label="Name"
        {...register('name', {
          required: 'Name is required',
          minLength: {
            value: 2,
            message: 'Name must be at least 2 characters',
          },
        })}
        error={Boolean(errors.name)}
        helperText={errors.name?.message}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Email"
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Invalid email address',
          },
        })}
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
        margin="normal"
      />
      <TextField
        fullWidth
        type="password"
        label="Password"
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters',
          },
        })}
        error={Boolean(errors.password)}
        helperText={errors.password?.message}
        margin="normal"
      />
      <TextField
        fullWidth
        type="password"
        label="Confirm Password"
        {...register('password_confirmation', {
          required: 'Please confirm your password',
          validate: (value) => value === watch('password') || 'Passwords do not match',
        })}
        error={Boolean(errors.password_confirmation)}
        helperText={errors.password_confirmation?.message}
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Register
      </Button>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity={successMessage ? 'success' : 'error'}
        >
          {successMessage || errorMessage}
        </MuiAlert>
      </Snackbar>
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Link href="#" variant="body2">
          Forgot Password?
        </Link>
        <Box mt={1}>
          <Link href="/login" variant="body2">
            You have an account? Sign In
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default RegistrationForm;