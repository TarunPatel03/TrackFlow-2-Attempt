import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import './SignUp.css';
import Navbar from '../components/Navbar';
import FormField from '../components/Formfield';

const SignUp = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { email, password } = formData;

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      alert('Check your email for a verification link.');
      navigate('/login');
    }
  };

  return (
    <>
      <Navbar />
      <div className="signup-page">
        <div className="signup-box">
          <h2>Create Account</h2>
          <form onSubmit={handleSubmit}>
            <FormField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
            <FormField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
            {error && <p className="error-msg">{error}</p>}
            <button type="submit" className="signup-btn">Sign Up</button>
          </form>
          <p className="switch-link">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
