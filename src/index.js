import initTotals from './totals';

const ENABLE_NOTIFICATIONS = false;
// import initMarkdown from './markdown';

// eslint-disable-next-line
(function () {
  chrome.extension.sendMessage({ action: 'showPageAction' });

  if (window.asanaPlusAttached) {
    return;
  }

  initTotals();

  let s,
    sn,
    i;

  if (location.href.indexOf('asanaPlusNotifications') !== -1) {
    if (ENABLE_NOTIFICATIONS) {
      const sn = document.createElement('script');
      sn.src = chrome.extension.getURL('dist/asana-plus-notifications.js');

      document.body.appendChild(sn);
    }
  } else {
    const s = document.createElement('script');
    let sn;

    s.src = chrome.extension.getURL('dist/asana-plus.js');
    document.body.appendChild(s);

    if (ENABLE_NOTIFICATIONS) {
      const i = document.createElement('iframe');
      i.id = 'asana-notifications-frame';
      i.src = 'https://app.asana.com/0/inbox/?asanaPlusNotifications';

      i.style.cssText = 'position: absolute; right: -20px; top: 0; width: 0px; height: 0px;';

      document.body.appendChild(i);
      document.body.dataset.audioAlertFile = chrome.extension.getURL('door.mp3');
    }

    s.onload = () => {
	    s.parentNode.removeChild(s);

	    if (sn) {
        sn.parentNode.removeChild(sn);
	    }

	    window.asanaPlusAttached = true;

	    // One more is needed
	    // i.src = i.src;
    };
  }
}());
