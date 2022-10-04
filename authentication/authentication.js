

document.addEventListener("DOMContentLoaded", () => {


    if (localStorage.getItem("token") !== "undefined") {
        window.location.href = "http://127.0.0.1:3001/showTasksAuth/showTasks.html"

    }

    const authenticateForm = document.getElementById("authenticateForm")

    authenticateForm.addEventListener("submit", (event) => {
        event.preventDefault();
        new FormData(authenticateForm);

        authenticate();
    });
})

function authenticate() {
    const emailInput = document.getElementById("emailInput");
    const passwordInput = document.getElementById("passwordInput");

    let auth = {
        email: emailInput.value,
        password: passwordInput.value
    };

        fetch('http://127.0.0.1:3000/auth/jwt/sign', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(auth)
    }).then((response) => {
        if (response.status == 400){
            document.getElementById("errorMessage").style.display = "block";
            document.getElementById("errorMessage").style.color = "red";
            document.getElementById("errorMessage").textContent = "Wrong email or password!";
            setTimeout(hideElement, 3000);
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

function hideElement(){
    document.getElementById("errorMessage").style.display = "none";
}