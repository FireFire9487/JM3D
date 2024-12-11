document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    // Move focus to password input on Enter press in username input
    usernameInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            passwordInput.focus();
        }
    });

    // Trigger login on Enter press in password input
    passwordInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            login();
        }
    });
});

async function fetchAccounts() {
    try {
        console.log('Attempting to fetch accounts...');
        const response = await fetch('./src/database/accounts.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const accounts = await response.json();
        console.log('Fetched accounts:', accounts);
        return accounts;
    } catch (error) {
        console.error('Error fetching accounts:', error);
        return null;
    }
}

async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    console.log('Login attempt with:', { username, password });

    const accounts = await fetchAccounts();
    if (!accounts) {
        alert('無法讀取賬戶内容。');
        return;
    }

    let loginSuccess = false;
    for (const key in accounts) {
        if (accounts[key].name === username && accounts[key].password === password) {
            loginSuccess = true;
            break;
        }
    }

    if (loginSuccess) {
        alert('成功登錄！');
        window.location.href = 'main.html';
    } else {
        alert('無效的賬戶名稱或密碼。');
    }
}
