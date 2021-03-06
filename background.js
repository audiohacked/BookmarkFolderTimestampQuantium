var currentBookmarkFolderId;

if (!Date.prototype.BookmarkLocalTimestamp) {
	(function() {
		function pre_pad(number, length) {
			var str = "" + number;
			while (str.length < length) {
				str = '0'+str;
			}
			return str;
		}
		function post_pad(number, length) {
			var str = "" + number;
			while (str.length < length) {
				str = str+'0';
			}
			return str;
		}
		Date.prototype.BookmarkLocalTimestamp = function() {
			var offset = this.getTimezoneOffset();
			var hour_offset = pre_pad(offset/60, 2);
			return this.getUTCFullYear() +
				'-' + pre_pad(this.getUTCMonth() + 1, 2) +
				'-' + pre_pad(this.getUTCDate(), 2) +
				' ' + pre_pad(this.getHours(), 2) +
				':' + pre_pad(this.getUTCMinutes(), 2) +
				':' + pre_pad(this.getUTCSeconds(), 2) +
				' GMT' + (offset<0 ? '+' : '-') + post_pad(hour_offset, 4);
	
		};
	}());
}

function getLang()
{
 if (navigator.languages != undefined) 
 return navigator.languages[0]; 
 else 
 return navigator.language;
}

/*
 *
 */
function timestampFolder(id, bookmarkInfo) {
    if (bookmarkInfo.type == "folder") {
        var myDate = new Date(0);
        myDate.setUTCSeconds(bookmarkInfo.dateAdded/1000);
        browser.bookmarks.update(id, {title: myDate.BookmarkLocalTimestamp()});
    }
}

/* register with events */
browser.bookmarks.onCreated.addListener(timestampFolder)
