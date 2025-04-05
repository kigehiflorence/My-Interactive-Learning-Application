// This file contains the JavaScript code for the application. It handles user interactions, communicates with Firebase for data storage and retrieval, and implements the core functionality of the app.

document.addEventListener('DOMContentLoaded', function() {
    const db = firebase.firestore();
    const userForm = document.getElementById('user-form');
    const userList = document.getElementById('user-list');

    // Function to add a user
    userForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = userForm.username.value;

        db.collection('users').add({
            username: username
        }).then(() => {
            userForm.reset();
            loadUsers();
        }).catch(error => {
            console.error("Error adding user: ", error);
        });
    });

    // Function to load users from Firestore
    function loadUsers() {
        userList.innerHTML = '';
        db.collection('users').get().then(snapshot => {
            snapshot.forEach(doc => {
                const li = document.createElement('li');
                li.textContent = doc.data().username;
                userList.appendChild(li);
            });
        }).catch(error => {
            console.error("Error loading users: ", error);
        });
    }

    // Initial load of users
    loadUsers();
});