// Toggle forms
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
document.getElementById('showSignup').addEventListener('click', () => {
    loginForm.classList.remove('active');
    signupForm.classList.add('active');
});
document.getElementById('showLogin').addEventListener('click', () => {
    signupForm.classList.remove('active');
    loginForm.classList.add('active');
});

// Signup
signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirm = document.getElementById('signupConfirm').value;
    const role = document.getElementById('signupRole').value;

    if (password !== confirm) {
        alert("Passwords do not match!");
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(u => u.username === username || u.email === email)) {
        alert("Username or Email already exists!");
        return;
    }

    users.push({ username, email, password, role });
    localStorage.setItem('users', JSON.stringify(users));
    alert("Signup successful! Please login.");
    signupForm.reset();
    signupForm.classList.remove('active');
    loginForm.classList.add('active');
});

// Login
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const role = document.getElementById('loginRole').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password && u.role === role);

    if (user) {
        alert(`Login successful! Welcome ${user.username} (${user.role})`);
        if (role === 'student') window.location.href = "student.html";
        else if (role === 'company') window.location.href = "company.html";
        else window.location.href = "admin.html";
    } else {
        alert("Invalid username, password, or role!");
    }
});