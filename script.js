import { getUserIds, getData } from "./storage.js";

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
  const bookmarks = getData(selectedUser);

  bookmarksList.innerHTML = "";

  if (!bookmarks || bookmarks.length === 0) {
    noBookmarks.textContent = "There are no bookmarks for this user.";
    return;
  }

  noBookmarks.textContent = "";

  bookmarks.forEach((bookmark) => {
    const li = document.createElement("li");

    const title = document.createElement("a");
    title.textContent = bookmark.title;
    title.href = `https://${bookmark.url}`;
    title.target = "_blank";

    const description = document.createElement("p");
    description.textContent = bookmark.description;

    const timestamp = document.createElement("small");
    const date = new Date(bookmark.timestamp * 1000);
    timestamp.textContent = date.toLocaleString();

    li.appendChild(title);
    li.appendChild(description);
    li.appendChild(timestamp);

    bookmarksList.appendChild(li);
  });
}

renderBookmarks();

dropdown.addEventListener("change", renderBookmarks);
