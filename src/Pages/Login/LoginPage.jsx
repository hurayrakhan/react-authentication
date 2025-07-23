// src/components/Login.js
import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data)
    try {
      const res = await axios.post('https://dummyjson.com/auth/login', {
        username: data.username,
        password: data.password
      });
      console.log(res.data)

      localStorage.setItem('token', res.data.accessToken);

      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: `Welcome ${res.data.firstName}!`,
        timer: 2000,
        showConfirmButton: false
      });

      navigate('/'); // Or any protected route
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed!',
        text: 'Please check your credentials.',
      });
    }
  };

  const handleSocialLogin = (provider) => {
    Swal.fire({
      icon: 'info',
      title: `${provider} login is not implemented yet.`,
      timer: 2000,
      showConfirmButton: false
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            {...register('username', {
              required: 'Username is required'
            })}
            placeholder="Enter your username"
            defaultValue="emilys"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded px-3 py-2"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              }
            })}
            placeholder="Enter your password"
            defaultValue="emilyspass"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>

        <div className="my-4 text-center text-sm text-gray-500">or continue with</div>

        {/* Social Login (simulated) */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => handleSocialLogin('Google')}
            className="flex items-center justify-center gap-2 w-full bg-blue-100 text-black py-2 rounded hover:bg-blue-200"
          >
            <FcGoogle size={22} />
            Continue with Google
          </button>

          <button
            type="button"
            onClick={() => handleSocialLogin('Facebook')}
            className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            <FaFacebookF size={20} />
            Continue with Facebook
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;



