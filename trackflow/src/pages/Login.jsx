import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import {
  TextInput,
  PasswordInput,
  Button,
  Container,
  Title,
  Paper,
  Group,
  Stack,
  Center,
  Text
} from '@mantine/core';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  const handleAuth = async () => {
    const { error } = isSignup
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (error) alert(error.message);
    else window.location.href = '/dashboard';
  };

  return (
    <Center style={{ height: '100vh' }}>
      <Paper shadow="md" p="xl" withBorder style={{ minWidth: 400 }}>
        <Title align="center" order={2} mb="md">
          {isSignup ? 'Create Account' : 'TrackFlow Login'}
        </Title>

        <Stack>
          <TextInput
            label="Email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button fullWidth onClick={handleAuth}>
            {isSignup ? 'Sign Up' : 'Login'}
          </Button>
        </Stack>

        <Group position="center" mt="md">
          <Text size="sm">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <Text
              component="span"
              color="blue"
              style={{ cursor: 'pointer' }}
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup ? 'Login' : 'Sign up'}
            </Text>
          </Text>
        </Group>
      </Paper>
    </Center>
  );
}
