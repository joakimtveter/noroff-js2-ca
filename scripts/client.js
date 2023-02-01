const baseUrl = 'https://api.noroff.dev/api/v1/social';
let loggedInUser;

function setLoggedInUser() {
    loggedInUser = JSON.parse(localStorage.getItem('user'));
}

function getAccessToken() {
    if (!loggedInUser) {
        setLoggedInUser();
    }
    return loggedInUser?.accessToken;
}

function isLoggedIn() {
    return !!getAccessToken();
}

async function logIn(email, password) {
    try {
        const response = await fetch(baseUrl + '/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        if (!response.ok) {
            const data = await response.json();
            throw new Error(`${data.statusCode} ${data.status} - ${data.errors[0].message}`);
        }
        const data = await response.json();
        const user = JSON.stringify(data);
        console.info(data?.name + ' is logged in');
        localStorage.setItem('user', user);
        window.location.pathname = 'index.html';
    } catch (error) {
        console.error(error);
        // showToast('error', error);
    }
}

async function register(name, email, password) {
    try {
        const response = await fetch(baseUrl + '/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(`${error.statusCode} ${error.status} - ${error.errors[0].message}`);
        }
        const data = await response.json();
        console.log(data);
        // showToast('success', ` ${data.name} have successfully registered`);
        window.location.pathname = 'login.html';
    } catch (error) {
        console.error(error);
        // showToast('error', error);
    }
}

export { logIn, register, isLoggedIn, getAccessToken, loggedInUser };
