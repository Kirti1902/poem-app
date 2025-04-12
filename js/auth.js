// Helper function to save the user info in localStorage
function saveUser(username, password) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
}

// Helper function to check if user exists
function findUser(username, password) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    return users.find(user => user.username === username && user.password === password);
}

// Handle login functionality
document.getElementById('loginBtn')?.addEventListener('click', () => {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    if (username && password) {
        const user = findUser(username, password);

        if (user) {
            localStorage.setItem('loggedInUser', JSON.stringify(user));  // Store logged-in user
            window.location.href = '../index.html';  // Redirect to main page after login
        } else {
            alert('Invalid login credentials!');
        }
    } else {
        alert('Please enter both username and password.');
    }
});

// Handle signup functionality
document.getElementById('signupBtn')?.addEventListener('click', () => {
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;

    if (username && password) {
        const existingUser = findUser(username);

        if (existingUser) {
            alert('Username already exists. Please try another one.');
        } else {
            saveUser(username, password);
            alert('Signup successful! You can now login.');
            window.location.href = 'login.html';  // Redirect to login page after signup
        }
    } else {
        alert('Please enter both username and password.');
    }
});

// To check if the user is logged in (for future use in the poem app page)
function checkIfLoggedIn() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        return JSON.parse(loggedInUser);
    } else {
        return null;
    }
}
