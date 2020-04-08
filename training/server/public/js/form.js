(() => {
  document.getElementById("form")
    .addEventListener("submit", (e) => {
      const formData = new FormData(e.target);
      e.preventDefault();
      API.createPost(formData)
        .then(post => {
          alert("Post successfully created");
          window.location = `post_complete.html?id=${post._id}`
        });
    })
})();