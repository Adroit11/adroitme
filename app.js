if ('serviceWorker' in navigator) {
  console.log('Service worker registration in progress.');
  navigator.serviceWorker.register('/adroitme/sw.js', {scope: '/adroitme'})
  .then(function() {
    console.log('Service worker registration complete.');
  }, function() {
    console.log('Service worker registration failure.');
  });
} else {
  console.log('Service worker is not supported.');
}