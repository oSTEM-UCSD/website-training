(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  let postContainerEl = document.getElementById("main");

  API.fetchPost(id).then(res => {
    buildPost(res, postContainerEl, true);
  })
})();