# Testing

## Rubric Points

### The website must contain a drop-down which lists five users

Manually tested by opening the app and confirming five users appear in the dropdown, populated via `getUserIds()` from `storage.js`.

### Selecting a user must display the list of bookmarks for the relevant user

Manually tested by selecting each user from the dropdown and confirming their bookmarks are displayed.

### If there are no bookmarks for the selected user, a message is displayed

Manually tested by selecting a user with no bookmarks and confirming the message "There are no bookmarks for this user." appears.

### The list of bookmarks must be shown in reverse chronological order

Manually tested by adding multiple bookmarks and confirming the most recently added bookmark appears at the top of the list.

### Each bookmark has a title, description and created at timestamp displayed

Manually tested by adding a bookmark and confirming the title, description and timestamp all appear correctly.

### Each bookmark's title is a link to the bookmark's URL

Manually tested by clicking the title of a bookmark and confirming it opens the correct URL in a new tab.

### Each bookmark's "Copy to clipboard" button must copy the URL of the bookmark

Manually tested by clicking the Copy URL button and pasting into a text editor to confirm the correct URL was copied.

### Each bookmark's like counter works independently and persists across sessions

Manually tested by liking a bookmark, closing the browser, reopening and confirming the like count was preserved.

### The website must contain a form with inputs for URL, title, and description

Manually tested by confirming the form exists with all three inputs and a submit button.

### Submitting the form adds a new bookmark for the relevant user only

Manually tested by adding a bookmark for one user and confirming it does not appear for other users.

### After creating a new bookmark, the list updates to include the new bookmark

Manually tested by submitting the form and confirming the new bookmark immediately appears in the list.

### The website must score 100 for accessibility in Lighthouse

Tested using Lighthouse in Chrome DevTools in Snapshot mode. Score: 100.

### Unit tests must be written for at least one non-trivial function

Unit tests in `bookmark.test.js`. Tests cover the `createBookmark` function:

- Test 1: creates a bookmark object with correct properties (title, url, description, likes)
- Test 2: throws an error when an invalid URL is provided (no http:// or https://)
