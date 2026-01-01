document.addEventListener("DOMContentLoaded", () => {
  // 1️⃣ Load footer dynamically
  fetch("partials/footer.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("footer").innerHTML = data;
    })
    .catch(err => console.error("Error loading footer:", err));

  // 2️⃣ Initialize login/profile UI
  setupUserProfile();
});

function setupUserProfile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const loginBtn = document.getElementById("loginBtn");
  const profileContainer = document.getElementById("profileContainer");
  const profileName = document.getElementById("profileName");
  const profileEmail = document.getElementById("profileEmail");
  const logoutBtn = document.getElementById("logoutBtn");
  const dropdown = document.getElementById("profileDropdown");

  if (!loginBtn || !profileContainer) return;

  // If user is logged in
  if (user) {
    loginBtn.classList.add("hidden");
    profileContainer.classList.remove("hidden");

    // Capitalize first name
    const formattedName =
      user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1);
    profileName.textContent = formattedName;
    if (profileEmail) profileEmail.textContent = user.email || "";

    // Toggle dropdown on click
    let dropdownVisible = false;
    profileContainer.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent click from bubbling
      dropdownVisible = !dropdownVisible;
      if (dropdownVisible) {
        dropdown.classList.remove("hidden");
        setTimeout(() => dropdown.classList.add("scale-100", "opacity-100"));
        dropdown.classList.remove("scale-95", "opacity-0");
      } else {
        dropdown.classList.remove("scale-100", "opacity-100");
        dropdown.classList.add("scale-95", "opacity-0");
        setTimeout(() => dropdown.classList.add("hidden"), 150);
      }

    });

    // Hide dropdown when clicking outside
    document.addEventListener("click", () => {
      dropdown.classList.add("hidden");
      dropdownVisible = false;
    });
  } else {
    // If not logged in
    loginBtn.classList.remove("hidden");
    profileContainer.classList.add("hidden");
  }

  // Logout event
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      localStorage.removeItem("user");
      window.location.reload();
    });
  }
}