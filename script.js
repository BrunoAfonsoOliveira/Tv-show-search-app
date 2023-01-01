const form = document.querySelector('.container__form');
const inputTxt = document.querySelector('.input__txt');
const img = document.querySelector('.content__img');
const title = document.querySelector('.content__title');
const description = document.querySelector('.description__output');
const listItems = document.querySelectorAll('.item');
const contentContainer = document.querySelectorAll('.content__container');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    for (let container of contentContainer) {
        container.classList.add('display')
    }
    const searchTerm = inputTxt.value;
    const res = await axios.get(`https://api.tvmaze.com/singlesearch/shows?q=${searchTerm}`);
    title.innerText = res.data.name;
    img.src = res.data.image.medium;
    const descFormat = res.data.summary;
    description.innerText = stripHtml(descFormat);
    for (let item of listItems) {
        if (item.classList.contains('content__web-channel')) {
            if (res.data.webChannel) {
                item.innerText = `Web channel: ${res.data.webChannel.name}`;
            } else {
                item.innerText = '';
            }
        }
        if (item.classList.contains('content__status')) {
            if (res.data.status) {
                item.innerText = `Status: ${res.data.status}`;
            } else {
                item.innerText = '';
            }
        }
        if (item.classList.contains('content__genre')) {
            if (res.data.genres) {
                item.innerText = `Genres: ${res.data.genres}`;
            } else {
                item.innerText = '';
            }
        }
        if (item.classList.contains('content__created')) {
            if (res.data.premiered) {
                item.innerText = `Premiered: ${res.data.premiered}`;
            } else {
                item.innerText = '';
            }
        }
        if (item.classList.contains('content__rating')) {
            if (res.data.rating) {
                item.innerText = `Rating: ${res.data.rating.average}`;
            } else {
                item.innerText = '';
            }
        }
    }
})

function stripHtml(html) {
   let tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}