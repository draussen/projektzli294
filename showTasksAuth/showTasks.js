document.addEventListener("DOMContentLoaded", () => {

    if (localStorage.getItem("token") == "undefined") {
        window.location.href = "http://127.0.0.1:3001/authentication/authentication.html"

    }

    fetch('http://127.0.0.1:3000/auth/jwt/tasks', {
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (datas) {
            let placeholder = document.querySelector("#data-output");
            let out = "";
            for (let data of datas) {
                out += `
            <tr>
                <td>${data.id}</td>
                <td>${data.title}</td>
                <td>${data.completed}</td>
            </tr>

        `;
            }

            placeholder.innerHTML = out;
        })
})