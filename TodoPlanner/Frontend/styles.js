import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
    // Styles for the home screen
    containerAccueil: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f8f9fa',
        justifyContent: 'center', // center vertically
        alignItems: 'center', // center horizontally
    },
    titleAccueil: {
        fontSize: 40, // significantly increase font size
        fontWeight: 'bold',
        marginBottom: 40, // add space at the bottom
        color: '#333',
        textAlign: 'center', // center the title horizontally
    },
    inputAccueil: {
        height: 35,
        width: 250, // set input width
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        borderRadius: 5,
        paddingHorizontal: 8,
        backgroundColor: '#fff',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    buttonContainerAccueil: {
        flexDirection: 'row',
        justifyContent: 'center', // center buttons horizontally
        marginTop: 20,
    },
    buttonAccueil: {
        backgroundColor: '#007bff',
        paddingVertical: 6,
        paddingHorizontal: 15, // increase horizontal padding
        borderRadius: 5,
        marginHorizontal: 5, // space between buttons
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    buttonTextAccueil: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16, // increase font size
    },
    authContainerAccueil: {
        marginTop: 20, // add space at the top to separate from the title
        alignItems: 'center', // center elements horizontally
    },
    // Styles for the task screen
    container: {
        flex: 1,
        padding: 10, // reduce padding
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 20, // reduce font size
        fontWeight: 'bold',
        marginBottom: 20, // add space at the bottom
        marginTop: 20, // add space at the top
        color: '#333',
        textAlign: 'center', // center the title
    },
    input: {
        height: 35, // reduce height
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15, // reduce margin
        borderRadius: 5,
        paddingHorizontal: 8, // reduce horizontal padding
        backgroundColor: '#fff',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    dateInput: {
        height: 35, // reduce height
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15, // reduce margin
        borderRadius: 5,
        paddingHorizontal: 8, // reduce horizontal padding
        backgroundColor: '#fff',
        justifyContent: 'center',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    dateText: {
        fontSize: 14, // reduce font size
        color: '#333',
    },
    picker: {
        height: 35, // reduce height
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20, // increase margin
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    taskContainer: {
        padding: 15, // reduce padding
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 10, // reduce margin
        elevation: 3,
    },
    taskText: {
        fontSize: 16, // reduce font size
        marginBottom: 8, // reduce margin
        color: '#333',
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 15, // reduce margin
        alignItems: 'center',
    },
    label: {
        margin: 8,
        fontSize: 14, // reduce font size
        color: '#333',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 6, // reduce vertical padding
        paddingHorizontal: 10, // reduce horizontal padding
        borderRadius: 5,
        marginLeft: 8, // reduce left margin
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    wideButton: {
        width: 'auto', // adjust button width
        backgroundColor: '#007bff',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginTop: 10, // add margin at the top
        alignSelf: 'flex-start',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14, // reduce font size
    },
    editContainer: {
        marginBottom: 10,
    },
    editInput: {
        height: 35, // reduce height
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15, // reduce margin
        borderRadius: 5,
        paddingHorizontal: 8, // reduce horizontal padding
        backgroundColor: '#fff',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    logoutButton: {
        alignSelf: 'flex-end', // position the logout button to the right
        backgroundColor: '#007bff',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginBottom: 20, // add space at the bottom
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
            },
            android: {
                elevation: 2,
            },
        }),
    },
});
