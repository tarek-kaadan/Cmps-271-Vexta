import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PasswordInput from './subcomponents/passwordInput';
import SignupInput from './subcomponents/signupInput';

const SignupForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!username || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/api/auth/signup', {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        setSuccess('Signup successful! Redirecting...');
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.user._id);
        localStorage.setItem('username', response.data.user.username);
        setTimeout(() => navigate('/choose-categories'), 1500);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Signup failed. Try again.');
    }
  };

  return (
    <>
      <h2 style={{ marginBottom: '1.5rem', fontSize: '2rem', fontWeight: 600, color: '#fff' }}>
        Sign Up
      </h2>

      {error && (
        <p
          style={{
            background: 'rgba(255, 0, 0, 0.1)',
            color: '#ff5555',
            padding: '0.5rem',
            borderRadius: '6px',
            marginBottom: '1rem',
          }}
        >
          {error}
        </p>
      )}
      {success && (
        <p
          style={{
            background: 'rgba(0, 255, 150, 0.1)',
            color: '#00ffa1',
            padding: '0.5rem',
            borderRadius: '6px',
            marginBottom: '1rem',
          }}
        >
          {success}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <SignupInput type="text" placeholder="Username" value={username} onChange={setUsername} />
        <SignupInput type="email" placeholder="Email" value={email} onChange={setEmail} />
        <PasswordInput
          placeholder="Password"
          value={password}
          onChange={setPassword}
          show={showPassword}
          toggleShow={() => setShowPassword(!showPassword)}
        />
        <PasswordInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          show={showPassword}
          toggleShow={() => setShowPassword(!showPassword)}
        />

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '0.8rem',
            border: 'none',
            borderRadius: '8px',
            background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
            fontWeight: 600,
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background 0.3s ease',
          }}
        >
          Sign Up
        </button>
      </form>

      <p style={{ marginTop: '1rem', fontSize: '0.95rem' }}>
        Already have an account?{' '}
        <Link
          to="/login"
          style={{
            background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Log in
        </Link>
      </p>
    </>
  );
};

export default SignupForm;
