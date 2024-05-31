import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import { handleEditTask } from './api';

const EditTaskForm = ({ editingTask, setEditingTask, setTasks }) => {
    const [name, setName] = useState(editingTask.name);
    const [date, setDate] = useState(new Date(editingTask.date));
    const [hour, setHour] = useState(editingTask.hour);
    const [minute, setMinute] = useState(editingTask.minute);
    const [priority, setPriority] = useState(editingTask.priority);
    const [done, setDone] = useState(editingTask.done);
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

    // Save changes to the task
    const saveTask = async () => {
        const updatedTask = {
            name,
            date: date.toISOString().split('T')[0],
            hour,
            minute,
            priority,
            done,
        };
        const result = await handleEditTask(editingTask._id, updatedTask);
        if (result) {
            setTasks((prevTasks) =>
                prevTasks.map((task) => (task._id === editingTask._id ? result : task))
            );
            setEditingTask(null);
        }
    };

    return (
        <View style={styles.editContainer}>
            <TextInput
                style={styles.editInput}
                placeholder="Edit task name"
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
            <TouchableOpacity style={styles.button} onPress={saveTask}>
                <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
        </View>
    );
};

export default EditTaskForm;
