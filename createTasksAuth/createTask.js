

document.addEventListener("DOMContentLoaded", () => {

    if (localStorage.getItem("token") == "undefined") {
        window.location.href = "http://127.0.0.1:3001/authentication/authentication.html"

    }

    const taskForm = document.getElementById("taskForm")

    taskForm.addEventListener("submit", (event) => {
        event.preventDefault();
        new FormData(taskForm);

        createTask();
    });
})

function createTask() {
    const taskInput = document.getElementById("taskInput");

    let task = {
        title: taskInput.value
    };

        fetch('http://127.0.0.1:3000/auth/jwt/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        body: JSON.stringify(task)
    }).then((response) => {

        return response.json();

    }).then((data) => {
        console.log(data);
    }    
    );
    
    if(taskInput.value == "")
    {
        document.getElementById("message").style.display = "block";
        document.getElementById("message").style.color = "red"
        document.getElementById("message").textContent = "Please enter a title!";
    }
    else{
        document.getElementById("message").style.display = "block";
        document.getElementById("message").style.color = "green"
        document.getElementById("message").textContent = "Task was successfully created!";
    }

    setTimeout(hideElement, 3000);

}

function hideElement(){
    document.getElementById("message").style.display = "none";
}