// document.getElementById shorthand
var ID = new Proxy({}, { get: (_,prop) => document.getElementById(prop) });

// use elem.innerHTML as a template for each key set in data-foreach attribute using window.DATA
function applyTemplate(elem) {
    let template = elem.innerHTML;
    let data = window.DATA[elem.dataset.foreach] || [];
    elem.innerHTML = "";
    data.forEach(item => {
        // eval is not evil if not handling unprocessed user input
        eval('with(item) { var result=`'+template+'` }');
        let append = document.createElement("template");
        append.innerHTML = result.trim();
        let content = append.content.firstChild;
        // img src causes the image to load before the data are applied, using data-src instead
        content.querySelectorAll("[data-src]").forEach(el => el.src = el.dataset.src);
        elem.appendChild(content);
    });
    elem.removeAttribute("data-foreach");
    linksToFetch(elem);
}

// transforms links (with rel=noopener attribute) to background fetch
function linksToFetch(root) {
    (root || document).querySelectorAll("[rel=noopener]").forEach(a => a.onclick = e => {
        e.preventDefault();
        let href = a.getAttribute("href");
        // uncomment when back-end responds to the new url (after page reload)
        // history.pushState({}, "", href);
        loadPage(href);
        document.body.id = "body-"+href;
    });
}

// apply templates for data-foreach elements
function loadData() {
    document.querySelectorAll("[data-foreach]").forEach(applyTemplate);
}

// fetch page linked by href
function loadPage(href) {
    fetch(`/pages/${href}.html`)
    .then(r => r.text())
    .then(html => ID.main.innerHTML = html)
    .then(runScripts);
}

// run scripts when fetched page is loaded
function runScripts() {
    let scripts = ID.main.querySelectorAll("script");
    for(s of scripts) {
        let el = document.createElement("script");
        el.type = "text/javascript";
        el.innerHTML = s.innerText;
        ID.main.appendChild(el); // run script
        s.remove(); // remove original script (which was not executed)
    }
}
