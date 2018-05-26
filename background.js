function changeIcon () {
  let data = todays();

  browser.browserAction.setIcon({ path: data.kinImg });
  browser.browserAction.setTitle({ title: data.name });
}

browser.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
  changeIcon();   
  }
})

changeIcon();
