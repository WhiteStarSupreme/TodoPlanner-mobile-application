import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the base URL for the API
const BASE_URL = `http://192.168.42.124:5000/api`;

// Fetch tasks for the logged-in user
export const fetchTasks = async () => {
    try {
        const storedToken = await AsyncStorage.getItem('token');
        if (!storedToken) {
            throw new Error('Token not found');
        }
        const response = await fetch(`${BASE_URL}/tasks`, {
            headers: {
                'Authorization': `Bearer ${storedToken}`,
            },
        });
        if (response.ok) {
            return await response.json();
        } else {
            console.log(`Failed to fetch tasks. HTTP status: ${response.status}`);
        }
    } catch (error) {
        console.log('Error fetching tasks:', error.message);
    }
};

// Handle user login
export const handleLogin = async (username, password) => {
    try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        if (response.ok) {
            const data = await response.json();
            await AsyncStorage.setItem('token', data.token); // Store the token
            console.log(`Login successful, token: ${data.token}`);
            return data;
        } else {
            console.log(`Failed to login. HTTP status: ${response.status}`);
        }
    } catch (error) {
        console.log('Error logging in:', error.message);
    }
};

// Handle user registration
export const handleRegister = async (username, password) => {
    try {
        const response = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        if (response.ok) {
            const data = await response.json();
            await AsyncStorage.setItem('token', data.token); // Store the token
            console.log(`Registration successful, token: ${data.token}`);
            return data;
        } else {
            const data = await response.json();
            console.log(`Failed to register user: ${data.error}`);
        }
    } catch (error) {
        console.log('Error registering user:', error.message);
    }
};

// Add a new task for the user
export const handleAddTask = async (task) => {
    try {
        const storedToken = await AsyncStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${storedToken}`,
            },
            body: JSON.stringify(task),
        });
        if (response.ok) {
            const data = await response.json();
            console.log('Task added successfully:', data);
            return data;
        } else {
            console.log(`Failed to add task. HTTP status: ${response.status}`);
        }
    } catch (error) {
        console.log('Error adding task:', error.message);
    }
};

// Edit an existing task for the user
export const handleEditTask = async (taskId, updatedTask) => {
    try {
        const storedToken = await AsyncStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${storedToken}`,
            },
            body: JSON.stringify(updatedTask),
        });
        if (response.ok) {
            const data = await response.json();
            console.log('Task edited successfully:', data);
            return data;
        } else {
            const errorData = await response.json();
            console.log(`Failed to edit task. HTTP status: ${response.status}`, errorData);
        }
    } catch (error) {
        console.log('Error editing task:', error.message);
    }
};

// Delete a task for the user
export const handleDeleteTask = async (taskId) => {
    try {
        const storedToken = await AsyncStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${storedToken}`,
            },
        });
        if (response.ok) {
            console.log('Task deleted successfully');
            return true;
        } else {
            console.log(`Failed to delete task. HTTP status: ${response.status}`);
        }
    } catch (error) {
        console.log('Error deleting task:', error.message);
    }
};
