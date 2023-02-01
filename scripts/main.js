const logoutButton = document.getElementById('logout-button');

function logOut() {
    localStorage.removeItem('user');
    window.location.pathname = 'login.html';
}

logoutButton.addEventListener('click', logOut);
