document.addEventListener("DOMContentLoaded", () => {

    if (localStorage.getItem("token") == "undefined") {
        window.location.href = "http://127.0.0.1:3001/authentication/authentication.html"

    }

    const deleteTaskForm = document.getElementById("deleteTaskForm")

    deleteTaskForm.addEventListener("submit", (event) => {
        event.preventDefault();
        new FormData(deleteTaskForm);

        deleteTask();
    });
});


function deleteTask() {

    const id = document.getElementById("deleteTaskInput").value;

    fetch('http://127.0.0.1:3000/auth/jwt/task/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        mode: 'cors'
    })
        .then((response) => {
            if (response.status == 400) {
                console.log(response)
            }
            return response;
        })
        .then((data) => {
            if (data.status == 404) {
                document.getElementById("message").style.display = "block";
                document.getElementById("message").style.color = "red";
                document.getElementById("message").textContent = "ID wasn't found. Please enter a valid ID.";

                setTimeout(hideElement, 3000);
            }
            else {
                document.getElementById("message").style.display = "block";
                document.getElementById("message").style.color = "green";
                document.getElementById("message").textContent = "Task was successfully deleted!";

                setTimeout(hideElement, 3000);

            }
        })


}

function hideElement() {
    document.getElementById("message").style.display = "none";
}