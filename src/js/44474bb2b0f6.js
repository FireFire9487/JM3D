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
        const response = await fetch('./src/85ce81a6f541/18d27b24.json');
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

    // Check if username is 'root' and password is 'admin'
    if (username === 'root' && password === 'admin') {
        alert('成功登錄到管理介面！');
        sessionStorage.setItem('authenticated', 'true');
        console.log('Admin authenticated, redirecting to admin/index.html');
        window.location.href = 'admin/index.html'; // Redirect to admin page
        return; // Exit the function early since admin is logged in
    }

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
        console.log('User authenticated, redirecting to main.html');
        window.location.href = 'main.html'; // Ensure this is the correct path
    } else {
        alert('無效的賬戶名稱或密碼。');
    }
}
