document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    // Inactivity timer function
    let inactivityTime = function () {
        let time;
        window.onload = resetTimer;
        document.onmousemove = resetTimer;
        document.onkeypress = resetTimer;
        document.ontouchstart = resetTimer; // for mobile devices

        function logout() {
            alert("您已經閒置 10 分鐘，請重新登錄。");
            sessionStorage.removeItem('authenticated');
            window.location.href = 'index.html';
        }

        function resetTimer() {
            clearTimeout(time);
            time = setTimeout(logout, 600000); // 10 minutes in milliseconds
        }
    };

    inactivityTime(); // Initialize inactivity timer

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
        sessionStorage.setItem('authenticated', 'true');
        window.location.href = 'main.html';
    } else {
        alert('無效的賬戶名稱或密碼。');
    }
}
