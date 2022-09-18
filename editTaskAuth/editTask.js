document.addEventListener("DOMContentLoaded", () => {

    if (localStorage.getItem("token") == undefined) {
        window.location.href = "http://127.0.0.1:3001/authentication/authentication.html"

    }
    editTaskForm.addEventListener("submit", (event) => {
        event.preventDefault();
        new FormData(editTaskForm);

        editTask();
    });
});


function editTask() {

    const id = document.getElementById("taskID").value;
    const title = document.getElementById("taskTitle").value;
    const status = document.getElementById("taskStatus").checked;
    let task = {'id' : id,
                'title' : title,
                'completed' : status}

    let response = fetch('http://127.0.0.1:3000/auth/jwt/tasks', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        body: JSON.stringify(task),
        mode: 'cors'
    })
        .then((response) => {
            console.log(response);
            if (response.status == 400) {
                console.log(response)
            }
            return response;
        })
}