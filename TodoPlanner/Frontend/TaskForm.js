import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import { handleAddTask } from './api';

const TaskForm = ({ setTasks }) => {
    const [name, setName] = useState('');
    const [date, setDate] = useState(new Date());
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [priority, setPriority] = useState('low');
    const [done, setDone] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    // Handle date change
    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    // Handle time change
    const handleTimeChange = (event, selectedTime) => {
        setShowTimePicker(false);
        if (selectedTime) {
            const selectedDateTime = new Date(selectedTime);
            setHour(selectedDateTime.getHours());
            setMinute(selectedDateTime.getMinutes());
        }
    };

    // Add a new task
    const addTask = async () => {
        if (name.trim() !== '' && priority.trim() !== '') {
            const newTask = {
                name: name.trim(),
                date: date.toISOString().split('T')[0],
                hour,
                minute,
                priority: priority.trim(),
                done,
            };
            const createdTask = await handleAddTask(newTask);
            if (createdTask) {
                setTasks((prevTasks) => [...prevTasks, createdTask]);
                setName('');
                setDate(new Date());
                setHour(0);
                setMinute(0);
                setPriority('low');
                setDone(false);
            }
        }
    };

    return (
        <View>
            <TextInput
                style={styles.input}
                placeholder="Task name"
                value={name}
                onChangeText={setName}
                placeholderTextColor="#aaa"
            />
            <Text style={styles.label}>Date :</Text>
            <TouchableOpacity style={styles.dateInput} onPress={() => setShowDatePicker(true)}>
                <Text style={styles.dateText}>{date.toDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
                <DateTimePicker value={date} mode="date" display="default" onChange={handleDateChange} />
            )}
            <Text style={styles.label}>Time :</Text>
            <TouchableOpacity style={styles.dateInput} onPress={() => setShowTimePicker(true)}>
                <Text style={styles.dateText}>{`Time: ${hour}:${minute}`}</Text>
            </TouchableOpacity>
            {showTimePicker && (
                <DateTimePicker value={date} mode="time" display="default" onChange={handleTimeChange} />
            )}
            <Text style={styles.label}>Priority:</Text>
            <Picker selectedValue={priority} style={styles.picker} onValueChange={setPriority}>
                <Picker.Item label="Low" value="low" />
                <Picker.Item label="Medium" value="medium" />
                <Picker.Item label="High" value="high" />
            </Picker>
            <TouchableOpacity style={styles.checkboxContainer} onPress={() => setDone(!done)}>
                <Icon name={done ? 'check-box' : 'check-box-outline-blank'} size={30} color="#000" />
                <Text style={styles.label}>Done</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.wideButton} onPress={addTask}>
                <Text style={styles.buttonText}>Add Task</Text>
            </TouchableOpacity>
        </View>
    );
};

export default TaskForm;
