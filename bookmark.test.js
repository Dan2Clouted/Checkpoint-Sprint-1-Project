import { createBookmark } from "./bookmark.js";

test("creates a bookmark with correct properties", () => {
  const bookmark = createBookmark(
    "My Site",
    "https://example.com",
    "A description",
  );
  expect(bookmark.title).toBe("My Site");
  expect(bookmark.url).toBe("https://example.com");
  expect(bookmark.description).toBe("A description");
  expect(bookmark.likes).toBe(0);
});

test("throws error for invalid URL", () => {
  expect(() =>
    createBookmark("Bad Site", "ftp://example.com", "A description"),
  ).toThrow("Invalid URL");
});
