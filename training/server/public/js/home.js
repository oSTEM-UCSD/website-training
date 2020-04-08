(() => {
  let postContainerEl = document.getElementById("main");

  API.fetchPosts().then(res => {
    if (res.length > 1) {
      res.sort((a, b) => {
        let ms_a = new Date(a.updated_at).getTime();
        let ms_b = new Date(b.updated_at).getTime();
        return ms_b - ms_a;
      }).forEach(post => {
        buildPost(post, postContainerEl)
      })
    } else {
      buildPost(res[0], postContainerEl)
    }
  })
})();