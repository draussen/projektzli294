

document.addEventListener("DOMContentLoaded", () => {



    authenticateForm.addEventListener("submit", (event) => {
        event.preventDefault();
        new FormData(authenticateForm);

        authenticate();
    });
})

function authenticate() {
    const authenticateForm = document.getElementById("authenticateForm");
    const emailInput = document.getElementById("emailInput");
    const passwordInput = document.getElementById("passwordInput");

    let auth = {
        email: emailInput.value,
        password: passwordInput.value
    };

    let response = fetch('http://127.0.0.1:3000/auth/jwt/sign', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(auth)
    }).then((response) => {
        if (response.status == 400){
            console.log("drin", response);
            document.getElementById("errorMessage").textContent = "wrong username or password";
        }
        else{
            return response.json();
        }
    }).then((data) => {
        console.log(data);
        localStorage.setItem("token", data.token);
        window.location.href = "http://127.0.0.1:3001/showTasksAuth/showTasks.html"
    }
    );

}