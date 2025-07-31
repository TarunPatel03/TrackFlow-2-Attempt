import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import '../index.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = isSignup
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert(error.message);
      return;
    }

    if (isSignup) {
      alert('Confirmation email sent. Please verify your email before logging in.');
      return;
    }

    // ✅ After login, check and insert profile if missing
    await insertProfileIfNotExists();

    navigate('/dashboard');
  };

  // ✅ Auto-create profile if it doesn't exist
  const insertProfileIfNotExists = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) return;

    const { data: existingProfile, error: fetchError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (!existingProfile && !fetchError) {
      const { error: insertError } = await supabase.from('profiles').insert([
        {
          id: session.user.id,
          email: session.user.email,
          role: 'user',
        },
      ]);

      if (insertError) {
        console.error('Error inserting profile:', insertError.message);
        alert('Database error creating profile: ' + insertError.message);
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>{isSignup ? 'Create Account' : 'Welcome Back'}</h2>
        <p>{isSignup ? 'Sign up to get started' : 'Login to your account'}</p>

        <label htmlFor="email">Email *</label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password *</label>
        <input
          id="password"
          type="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>

        <p className="signup-text">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? 'Login' : 'Sign Up'}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
