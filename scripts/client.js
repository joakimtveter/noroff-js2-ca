const baseUrl = 'https://api.noroff.dev/api/v1/social';

function accessToken() {
    return localStorage.getItem('auth');
}

function isLoggedIn() {
    return !!accessToken();
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
        const data = await response.json();
        if (data.errors) {
            throw new Error(`${data.statusCode} ${data.status} - ${data.errors[0].message}`);
        }
        console.log(data);
        console.info(data?.name + ' is logged in');
        localStorage.setItem('auth', data.accessToken);
        window.location.pathname = 'index.html';
    } catch (error) {
        console.error(error);
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
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

export { logIn, register, isLoggedIn };
