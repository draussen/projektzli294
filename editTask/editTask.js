document.addEventListener("DOMContentLoaded", () => {

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

    let response = fetch('http://127.0.0.1:3000/tasks', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
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