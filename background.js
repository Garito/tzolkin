function changeIcon () {
  let data = todays();

  chrome.browserAction.setIcon({ path: data.kinImg });
  chrome.browserAction.setTitle({ title: data.name });
}

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
  changeIcon();   
  }
})

changeIcon();
