// logout.js

const logoutBtn = document.getElementById('logoutBtn');

// Function to handle logout process
function logoutHandler() {
    localStorage.removeItem('currentUser'); // Clear user session from localStorage
    window.location.href = 'login/login.html'; // Redirect to login page
}

// Check login status and show/hide logout button
window.onload = function() {
    const loggedInUser = localStorage.getItem('currentUser');
    if (loggedInUser) {
        // Show the Logout button if logged in
        logoutBtn.style.display = 'inline-block'; 
    } else {
        // Hide the Logout button if not logged in
        logoutBtn.style.display = 'inline-block'; 
    }

    // Add event listener for the Logout button
    logoutBtn.addEventListener('click', logoutHandler);
};
