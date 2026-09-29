const buttonList = document.getElementById("projects-buttons");
const container = document.getElementById("projects-container");

let projects = [];
let currentIndex = 0;

function render () {
    let buttons = '';

    projects.forEach((v, i) => {
        if (i == currentIndex) {
            buttons += `
                <button class="project-button selected" onclick="setIndex(${i})">${v.Name}</button>
            `;
        } else {
            buttons += `
                <button class="project-button" onclick="setIndex(${i})">${v.Name}</button>
            `;
        }
    });

    buttonList.innerHTML = buttons;
    container.innerHTML = projects[currentIndex].Text;
}

function setIndex (index) {
    currentIndex = index;
    render();
}

(async () => {

    const res = await fetch("/projects/list.json");
    const list = await res.json();

    list.forEach(async v => {
        const res = await fetch(`/projects/${v.File}`);
        const text = await res.text();

        projects.push({
            Name: v.Name,
            Text: text
        });

        projects.sort((a, b) => {
            return a.Id - b.Id
        });

        render();
    });

})();