import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './Frontend/styles';
import Auth from './Frontend/Auth';
import TaskForm from './Frontend/TaskForm';
import TaskList from './Frontend/TaskList';
import EditTaskForm from './Frontend/EditTaskForm';
import { fetchTasks } from './Frontend/api';

export default function App() {
    const [username, setUsername] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState('');
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);

    // Load tasks when the user is logged in
    useEffect(() => {
        if (loggedIn) {
            const loadTasks = async () => {
                const data = await fetchTasks();
                if (data) {
                    setTasks(data);
                }
            };
            loadTasks();
        }
    }, [loggedIn]);

    // Handle user logout
    const handleLogout = async () => {
        await AsyncStorage.removeItem('token');
        setLoggedIn(false);
        setToken('');
        setUsername('');
    };

    return (
        <View style={loggedIn ? styles.container : styles.containerAccueil}>
            {!loggedIn ? (
                <>
                    <Text style={styles.titleAccueil}>Todo Planner</Text>
                    <Auth setLoggedIn={setLoggedIn} setToken={setToken} setUsername={setUsername} />
                </>
            ) : (
                <>
                    <Text style={styles.title}>Todo Planner</Text>
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Text style={styles.buttonText}>Logout</Text>
                    </TouchableOpacity>
                    {editingTask ? (
                        <EditTaskForm
                            editingTask={editingTask}
                            setEditingTask={setEditingTask}
                            setTasks={setTasks}
                        />
                    ) : (
                        <>
                            <TaskForm setTasks={setTasks} />
                            <FlatList
                                data={tasks}
                                keyExtractor={(item) => item._id.toString()}
                                renderItem={({ item }) => (
                                    <TaskList
                                        tasks={tasks}
                                        setTasks={setTasks}
                                        setEditingTask={setEditingTask}
                                    />
                                )}
                                ListHeaderComponent={<View style={{ marginTop: 30 }} />}
                            />
                        </>
                    )}
                </>
            )}
        </View>
    );
}
