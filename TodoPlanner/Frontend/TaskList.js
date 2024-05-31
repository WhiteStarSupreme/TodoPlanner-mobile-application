import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import { handleDeleteTask, handleEditTask } from './api';

const TaskList = ({ tasks, setTasks, setEditingTask }) => {
    // Toggle the 'done' status of a task
    const toggleDone = async (task) => {
        const updatedTask = { ...task, done: !task.done };
        const result = await handleEditTask(task._id, updatedTask);
        if (result) {
            setTasks((prevTasks) => prevTasks.map((t) => (t._id === task._id ? result : t)));
        }
    };

    // Delete a task
    const deleteTask = async (taskId) => {
        const success = await handleDeleteTask(taskId);
        if (success) {
            setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
        }
    };

    return tasks.map((item) => (
        <View style={styles.taskContainer} key={item._id.toString()}>
            <Text style={styles.taskText}>{item.name || 'No Name'}</Text>
            <Text style={styles.taskText}>{item.date ? new Date(item.date).toDateString() : 'No Date'}</Text>
            <Text style={styles.taskText}>{`Time: ${item.hour !== undefined ? item.hour : '00'}:${item.minute !== undefined ? item.minute : '00'}`}</Text>
            <Text style={styles.taskText}>{`Priority: ${item.priority || 'low'}`}</Text>
            <TouchableOpacity style={styles.checkboxContainer} onPress={() => toggleDone(item)}>
                <Icon name={item.done ? 'check-box' : 'check-box-outline-blank'} size={30} color="#000" />
                <Text style={styles.label}>Done</Text>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => setEditingTask(item)}>
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => deleteTask(item._id)}>
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    ));
};

export default TaskList;
