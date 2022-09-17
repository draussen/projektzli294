document.addEventListener("DOMContentLoaded", () => {



    deleteTaskForm.addEventListener("submit", (event) => {
        event.preventDefault();
        new FormData(deleteTaskForm);

        deleteTask();
    });
});


function deleteTask() {

    const id = document.getElementById("deleteTaskInput").value;

    let response = fetch('http://127.0.0.1:3000/task/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        mode: 'cors'
    })
        .then((response) => {
            if (response.status == 400) {
                console.log(response)
            }
            return response;
        })
}