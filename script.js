document.getElementById("loginForm").addEventListener("submit", async function(e){
    e.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let msg = document.getElementById("msg");

    try {
        let res = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        let data = await res.json();

        if(data.token){
            msg.style.color = "green";
            msg.textContent = "Login Successful";
            localStorage.setItem("token", data.token);
            // redirect dashboard
            setTimeout(()=> window.location.href="dashboard.html", 1000);
        } else {
            msg.style.color = "red";
            msg.textContent = data.error;
        }
    } catch(err){
        msg.style.color = "red";
        msg.textContent = "Server error";
    }
});