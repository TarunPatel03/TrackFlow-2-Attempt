import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Button, Container, Title, List, Loader, Text } from '@mantine/core';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      alert(error.message);
    } else {
      setTasks(data);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Container>
      <Title mb="md">Welcome to TrackFlow Dashboard</Title>
      <Button mb="md" color="red" onClick={handleLogout}>
        Logout
      </Button>

      {loading ? (
        <Loader />
      ) : tasks.length === 0 ? (
        <Text>No tasks found.</Text>
      ) : (
        <List spacing="sm" size="md">
          {tasks.map((task) => (
            <List.Item key={task.id}>{task.title}</List.Item>
          ))}
        </List>
      )}
    </Container>
  );
}
