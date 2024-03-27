import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [notification, setNotification] = useState({ open: false, message: '', severity: 'error' });
  const [showPassword, setShowPassword] = useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setNotification({ ...notification, open: false });
  };

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        console.log('Login successful', responseData);
        localStorage.setItem('token', responseData.access_token);
        setNotification({ open: true, message: 'Login successful. Redirecting...', severity: 'success' });
        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
      } else {
        console.error('Login failed', responseData.error);
        if (response.status === 401) {
          if (responseData.error === 'Email not found. Please sign up.') {
            setNotification({ open: true, message: 'Email not found. Please sign up.', severity: 'error' });
          } else {
            setNotification({ open: true, message: 'Invalid email or password.', severity: 'error' });
          }
        } else {
          setNotification({ open: true, message: responseData.error || 'Login failed. Please try again.', severity: 'error' });
        }
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      setNotification({ open: true, message: 'An error occurred during login. Please try again later.', severity: 'error' });
    }
  };       

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: '500px',
        margin: 'auto',
        padding: '60px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        backgroundColor: 'white',
      }}
    >
      <Typography variant="h3" component="div" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
        Sign In
      </Typography>
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
        type={showPassword ? 'text' : 'password'}
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
        InputProps={{
          endAdornment: (
            <IconButton
              onClick={() => setShowPassword((prev) => !prev)}
              edge="end"
              aria-label="toggle password visibility"
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          ),
        }}
        sx={{ mt: 2 }}
      />
      <FormControlLabel
        control={<Checkbox {...register('rememberMe')} color="primary" />}
        label="Remember Me"
        sx={{ mt: 1, textAlign: 'left' }}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Login
      </Button>
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity={notification.severity}
        >
          {notification.message}
        </MuiAlert>
      </Snackbar>
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Link href="#" variant="body2">
          Forgot Password?
        </Link>
        <Box mt={1}>
          <Typography variant="body2" component="span">
            Don't have an account?{' '}
            <Link href="/register" variant="body2">
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;