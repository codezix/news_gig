const apiKey = "97848aa34e4e46c6a28dcabf3632e285";
let keyword = "business";
let url = `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${apiKey}`;

const container = document.querySelector(".container");

const getNews = link => {
  console.log(link);
  fetch(link)
    .then(response => response.json())
    .then(data => addContent(data))
    .catch(err => console.log(`Error: ${err}`));
};

const changeUrl = searchString =>
  `https://newsapi.org/v2/everything?q=${searchString}&apiKey=${apiKey}`;

const addContent = data => {
  const { articles } = data;
  console.log(articles[0]);
  articles.forEach(article => createPost(article));
};

const createPost = newsItem => {
  newsItem.author = newsItem.author == null ? "Unknown" : newsItem.author;
  const container = document.querySelector(".container");
  let post = `
      <section class="post">
        <img src="${newsItem.urlToImage}" alt="" />
        <h1 class="title">${newsItem.title}</h1>
        <p class="author"><strong>Written by:</strong> <em>${newsItem.author}</em></p>
        <p>${newsItem.description}</p>
        <a href="${newsItem.url}" class="read-more">read more</a>
      </section>
  `;

  container.innerHTML += post;
};

const searchForm = document.querySelector("#search");

searchForm.addEventListener("submit", event => {
  event.preventDefault();
  let searchString = searchForm.querySelector("[data-search-bar]").value;
  let searchPhrase = !!searchString ? searchString : "coding";
  searchString = "";
  console.log(searchPhrase);

  url = changeUrl(searchPhrase);

  document.querySelector(".container").innerHTML = "";
  newsApp();
});

const newsApp = () => {
  getNews(url);
};

newsApp();
