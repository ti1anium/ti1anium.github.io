const main = document.getElementById('main');
const list = document.getElementById('list');
const intro = document.getElementById('intro');

(async () => {
    let currentPage;

    const data = await (await fetch("/subjects/subjects-data.json")).json();
    const pages = data.pages;

    pages.forEach(v => {
        const element = document.createElement('a');

        element.innerText = v;

        element.onclick = async e => {
            e.preventDefault();
            
            if (currentPage == v)
                return;

            currentPage = v;

            const data = await (await fetch("/subjects/" + v + ".html")).text();
            
            main.innerHTML = data;
        }
        
        list.appendChild(element);
    });

})();