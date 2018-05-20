var currentBookmarkFolderId;

/*
 *
 */
function timestampFolder(id, bookmarkInfo) {
    if (bookmarkInfo.type == "folder") {
        var myDate = new Date(0);
        myDate.setUTCSeconds(bookmarkInfo.dateAdded/1000);
        browser.bookmarks.update(id, {title: myDate.toISOString()});
    }
}

/* register with events */
browser.bookmarks.onCreated.addListener(timestampFolder)