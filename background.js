let data = todays();

chrome.browserAction.setIcon({ path: data.kinImg });
chrome.browserAction.setTitle({ title: data.name });
