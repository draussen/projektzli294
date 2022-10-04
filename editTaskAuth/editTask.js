
document.addEventListener("DOMContentLoaded", () => {

    if (localStorage.getItem("token") == undefined) {
        window.location.href = "http://127.0.0.1:3001/authentication/authentication.html"

    }

    //URL muss folgendermassen eingegeben werden um id direkt zu bearbeiten: 127.0.0.1:3001/editTaskAuth/editTask.html#/id/2
    document.getElementById("taskID").addEventListener("change", (event) => loadWithId(event.target.value));

    const url = window.location.hash
    console.log(url);
    const strs = url.split('/');
    const id = strs[2]

    loadWithId(id)

    const editTaskForm = document.getElementById("editTaskForm")

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

    let task = {
        'id': id,
        'title': title,
        'completed': status
    }

    fetch('http://127.0.0.1:3000/auth/jwt/tasks', {
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
                document.getElementById("message").style.display = "block";
                document.getElementById("message").style.color = "red";
                document.getElementById("message").textContent = "Please fill out all fields.";
                setTimeout(hideElement, 3000);
            }
            else if(response.status == 404)
            {
                document.getElementById("message").style.display = "block";
                document.getElementById("message").style.color = "red";
                document.getElementById("message").textContent = "ID wasn't found.";
                setTimeout(hideElement, 2000)
            }
            else {
                document.getElementById("message").style.display = "block";
                document.getElementById("message").style.color = "green";
                document.getElementById("message").textContent = "Task was successfully edited.";
                setTimeout(hideElement, 3000);
            }
            return response;
        })
}

function hideElement() {
    document.getElementById("message").style.display = "none";
}

function loadWithId(id) {
    if (!isNaN(id)) {
        document.getElementById("taskID").value = id;

        fetch('http://127.0.0.1:3000/auth/jwt/task/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                if (data.statusCode == 404) {
                    document.getElementById("message").style.display = "block";
                    document.getElementById("message").style.color = "red";
                    document.getElementById("message").textContent = "ID wasn't found.";
                    setTimeout(hideElement, 2000)
                }
                else {
                    document.getElementById("message").style.display = "none";
                    document.getElementById("taskTitle").value = data.title;
                }
            })
    }
}