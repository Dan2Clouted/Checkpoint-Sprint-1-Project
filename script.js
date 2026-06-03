import { getUserIds, getData, setData } from "./storage.js";

const dropdown = document.getElementById("bookmark-user");
const bookmarksList = document.getElementById("bookmark-list");
const noBookmarks = document.getElementById("no-bookmarks");

getUserIds().forEach((userId) => {
  const option = document.createElement("option");
  option.value = userId;
  option.textContent = `User ${userId}`;
  dropdown.appendChild(option);
});

function renderBookmarks() {
  const selectedUser = dropdown.value;
  const bookmarks = getData(selectedUser) || [];

  bookmarksList.innerHTML = "";

  if (bookmarks.length === 0) {
    noBookmarks.textContent = "There are no bookmarks for this user.";
    return;
  }

  noBookmarks.textContent = "";

  [...bookmarks].reverse().forEach((bookmark) => {
    const li = document.createElement("li");

    const title = document.createElement("a");
    title.textContent = bookmark.title;
    title.href = bookmark.url;
    title.target = "_blank";

    const description = document.createElement("p");
    description.textContent = bookmark.description;

    const createdAt = document.createElement("small");
    createdAt.textContent = new Date(bookmark.createdAt).toLocaleString();

    const clipboardButton = document.createElement("button");
    clipboardButton.textContent = "Copy URL";

    const likeButton = document.createElement("button");
    likeButton.textContent = `Likes: ${bookmark.likes || 0}`;

    clipboardButton.addEventListener("click", () => {
      navigator.clipboard.writeText(bookmark.url);
    });

    likeButton.addEventListener("click", () => {
      bookmark.likes = (bookmark.likes || 0) + 1;
      likeButton.textContent = `Likes: ${bookmark.likes}`;
      setData(selectedUser, bookmarks);
    });

    li.append(title, description, createdAt, clipboardButton, likeButton);
    bookmarksList.appendChild(li);
  });
}

function addNewBookmark() {
  const urlInput = document.getElementById("url");
  const titleInput = document.getElementById("title");
  const descriptionInput = document.getElementById("description");

  const url = urlInput.value;
  const title = titleInput.value;
  const description = descriptionInput.value;

  if (!url.trim() || !title.trim() || !description.trim()) {
    alert("Please fill in all fields.");
    return;
  }

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    alert("URL must start with http:// or https://");
    return;
  }

  const bookmarks = getData(dropdown.value) || [];

  bookmarks.push({
    title,
    description,
    url,
    createdAt: Date.now(),
    likes: 0,
  });

  setData(dropdown.value, bookmarks);
  renderBookmarks();

  urlInput.value = "";
  titleInput.value = "";
  descriptionInput.value = "";
}

renderBookmarks();
dropdown.addEventListener("change", renderBookmarks);

const form = document.getElementById("bookmark-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  addNewBookmark();
});
