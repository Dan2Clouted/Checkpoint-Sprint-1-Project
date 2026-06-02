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
  const bookmarks = getData(selectedUser);

  bookmarksList.innerHTML = "";

  if (!bookmarks || bookmarks.length === 0) {
    noBookmarks.textContent = "There are no bookmarks for this user.";
    return;
  }

  noBookmarks.textContent = "";

  bookmarks.reverse().forEach((bookmark) => {
    const li = document.createElement("li");

    const title = document.createElement("a");
    title.textContent = bookmark.title;
    title.href = `https://${bookmark.url}`;
    title.target = "_blank";

    const description = document.createElement("p");
    description.textContent = bookmark.description;

    const timestamp = document.createElement("small");
    timestamp.textContent = new Date(bookmark.timestamp).toLocaleString();

    const clipboardButton = document.createElement("button");
    clipboardButton.textContent = "Copy URL";
    clipboardButton.addEventListener("click", function () {
      navigator.clipboard.writeText(bookmark.url);
    });

    const likeButton = document.createElement("button");
    likeButton.textContent = `Likes: ${bookmark.likes || 0}`;
    likeButton.addEventListener("click", function () {
      bookmark.likes = (bookmark.likes || 0) + 1;
      likeButton.textContent = `Likes: ${bookmark.likes}`;
      setData(selectedUser, bookmarks);
    });

    li.appendChild(link);
    li.appendChild(description);
    li.appendChild(timestamp);
    li.appendChild(clipboardButton);
    li.appendChild(likeButton);
    bookmarksList.appendChild(li);
  });
}

renderBookmarks();
dropdown.addEventListener("change", renderBookmarks);
