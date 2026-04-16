const API = "http://localhost:5000";

let userId = "";

async function register() {
  const res = await fetch(API + "/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    })
  });

  alert("Registered");
}

async function login() {
  const res = await fetch(API + "/login", {
    method: "
