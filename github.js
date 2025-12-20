const URL = "https://api.github.com/repos/dedfishy/dedfishy.github.io/branches/main";

fetch(URL)
    .then(response => response.json())
    .then(response => {
        let date = new Date(response.commit.commit.author.date);
        var dateEl = document.createElement("div");
        dateEl.id = "last-updated";
        dateEl.innerText = "Last updated " + (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();

        document.body.appendChild(dateEl);
    })