import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';
import { handleLogin, handleRegister } from './api';

const Auth = ({ setLoggedIn, setToken, setUsername }) => {
    const [username, setUsernameLocal] = useState('');
    const [password, setPassword] = useState('');

    // Handle user login
    const login = async () => {
        const data = await handleLogin(username, password);
        if (data) {
            setLoggedIn(true);
            setToken(data.token);
            setUsername(username);
        }
    };

    // Handle user registration
    const register = async () => {
        const data = await handleRegister(username, password);
        if (data) {
            setLoggedIn(true);
            setToken(data.token);
            setUsername(username);
        }
    };

    return (
        <View style={styles.authContainerAccueil}>
            <TextInput
                style={styles.inputAccueil}
                placeholder="Username"
                onChangeText={setUsernameLocal}
                value={username}
                placeholderTextColor="#aaa"
            />
            <TextInput
                style={styles.inputAccueil}
                placeholder="Password"
                secureTextEntry
                onChangeText={setPassword}
                value={password}
                placeholderTextColor="#aaa"
            />
            <View style={styles.buttonContainerAccueil}>
                <TouchableOpacity style={styles.buttonAccueil} onPress={login}>
                    <Text style={styles.buttonTextAccueil}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonAccueil} onPress={register}>
                    <Text style={styles.buttonTextAccueil}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Auth;
