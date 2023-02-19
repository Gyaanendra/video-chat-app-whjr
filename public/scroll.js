// Get a reference to the div you want to auto-scroll.
var someElement = document.querySelector('.messages');
// Create an observer and pass it a callback.
var observer = new MutationObserver(scrollToBottom);
// Tell it to look for new children that will change the height.
var config = {childList: true};
observer.observe(someElement, config);


  // First, define a helper function.
  function scrollToBottom() {
    someElement.scrollTop = someElement.scrollHeight;
  }