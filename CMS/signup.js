document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById("signupForm");

  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document
      .getElementById("confirmPassword")
      .value.trim();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Retrieve existing users or create an empty array
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email is already registered
    if (users.some((user) => user.email === email)) {
      alert("Email is already registered! Try logging in.");
      return;
    }

    // Save new user
    const newUser = { fullName, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful! Redirecting to login...");
    window.location.href = "index.html"; // Redirect to login
  });
});
