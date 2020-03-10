document.addEventListener('DOMContentLoaded', () => {
const OK = 200;
const NUMBER_OF_LAST_URLS = 7;
const LAST_URLS_UPDATE_INTERVAL = 10000;

const longUrlField = document.getElementById('long_url_field');
const urlForm = document.getElementById('url_form');
const lastUrlsContainer = document.getElementById('last_urls_container');

urlForm.onsubmit = (e) => {
    e.preventDefault();
    addUrlRequest();
};
updateLastUrls();
setInterval(() => updateLastUrls(), LAST_URLS_UPDATE_INTERVAL);

function addUrlRequest() {
    let longUrl = longUrlField.value;
    let r = new XMLHttpRequest();
    r.open('POST', '/api/add-url', true);
    r.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    r.onreadystatechange = () =>{
        let data;
        try {
            if (r.readyState !== XMLHttpRequest.DONE) return;
            data = JSON.parse(r.responseText);
            if (r.status === OK) {
                alert(`${data.short_url}
Doesn’t it look better?`);
                updateLastUrls();
            } else {
                alert(`There was a problem with the request.
${data.long_url}`);
                console.log(r.responseText);
            }
            longUrlField.value = '';
        }
        catch( e ) {
            alert('Caught Exception: ' + e.description);
        }
    };
    r.send(`long_url=${longUrl}`);
}

function updateLastUrls() {
    let r = new XMLHttpRequest();
    r.open('GET', `/api/get-last-urls?per_page=${NUMBER_OF_LAST_URLS}`, true);
    r.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    r.onreadystatechange = () =>{
        try {
            if (r.readyState !== XMLHttpRequest.DONE) return;
            if (r.status === OK) {
                let page = JSON.parse(r.responseText);
                lastUrlsContainer.innerHTML = '';
                page.data.forEach((urlsPair) => {
                    lastUrlsContainer.appendChild(urlPairBox(urlsPair));
                })
            } else {
                alert('There was a problem with the request.');
                console.log(r.responseText);
            }
        }
        catch( e ) {
            alert('Caught Exception: ' + e.message);
        }
    };
    r.send();
}

function urlPairBox(urlPair) {
    let shortUrlDiv = document.createElement('div');
    shortUrlDiv.classList.add('short-url');
    shortUrlDiv.innerHTML = `<a href="${urlPair.short_url}">${urlPair.short_url}</a>`;

    let longUrlDiv = document.createElement('div');
    longUrlDiv.classList.add('long-url');
    longUrlDiv.innerHTML = `<a href="${urlPair.long_url}">${urlPair.long_url}</a>`;

    let urlPairDiv = document.createElement('div');
    urlPairDiv.classList.add('box');
    urlPairDiv.appendChild(shortUrlDiv);
    urlPairDiv.appendChild(longUrlDiv);

    return urlPairDiv;
}
});
