export function createBookmark(title, url, description) {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    throw new Error("Invalid URL");
  }
  return {
    title,
    url,
    description,
    likes: 0,
    timestamp: Date.now(),
  };
}
