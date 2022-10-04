document.addEventListener("DOMContentLoaded", () => {

    if (localStorage.getItem("token") == "undefined") {
        window.location.href = "http://127.0.0.1:3001/authentication/authentication.html"

    }

    //URL muss folgendermassen eingegeben werden: http://127.0.0.1:3001/showSingleTaskAuth/showSingleTask.html#/id/2
    const url = window.location.hash
    console.log(url);
    const strs = url.split('/');
    const id = strs[2]

    fetch('http://127.0.0.1:3000/auth/jwt/task/' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let placeholder = document.querySelector("#data-output-singleTask");
            if (data.id == null) {
                document.getElementById("errorMessage").style.color = "red"
                document.getElementById("errorMessage").textContent = "ID wasn't found.";
            }
            else {
                let out = "";
                out += `
            <tr>
                <td>${data.id}</td>
                <td>${data.title}</td>
                <td>${data.completed}</td>
            </tr>

        `;

                placeholder.innerHTML = out;
            }
        })
})