document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Retrieve stored user credentials (array of users)
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Find matching user
    let validUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!validUser) {
      alert("Invalid email or password! Please try again.");
      return;
    }

    // Store authentication status
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("currentUser", JSON.stringify(validUser));

    alert("Login successful! Redirecting...");
    window.location.href = "construction.html"; // Redirect to dashboard
  });
});
