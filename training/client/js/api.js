const heroku = "https://peaceful-headland-07359.herokuapp.com/api";
const API = {
  _fetch: (path, method, body) => {
    return fetch(heroku + path, { method: method, body: body });
  },
  fetchPosts: () => {
    return API._fetch('/posts', "GET").then(res => res.json());
  },
  fetchPost: (id) => {
    return API._fetch('/posts/' + id, "GET").then(res => res.json());
  },
  createPost: (post) => {
    return API._fetch('/posts', "POST", post).then(res => res.json());
  },
  updatePost: (id, post) => {
    return API._fetch('/posts/' + id, "PUT", post).then(res => res.json());
  },
  deletePost: (id) => {
    return API._fetch('/posts/' + id, "DELETE");
  }
}

function buildPost(res, containerEl, deleteFlag) {
  let section = document.createElement("section");
  let header = document.createElement("h2");
  let a = document.createElement("a");
  let title = document.createElement("div")
  let date = document.createElement("div");
  let content = document.createElement("p");

  section.id = res._id;
  a.href = "./post_complete.html" + "?id=" + res._id;

  header.classList.add("post-header");
  title.classList.add("title");
  date.classList.add("date");

  title.innerHTML = res.title;
  date.innerHTML = new Date(res.updated_at).toLocaleString();
  content.innerHTML = res.content;

  a.appendChild(title);
  a.appendChild(date);
  header.appendChild(a);
  section.appendChild(header);
  section.appendChild(content);

  if (res.imageUrls) {
    let images = document.createElement("div");
    images.classList.add("img-wrapper");
    res.imageUrls.forEach(url => {
      let image = document.createElement("div");
      let img = document.createElement("img");
      img.src = url;
      image.appendChild(img);
      images.appendChild(image);
    })
    section.appendChild(images);

    if (deleteFlag) {
      let deleteBtn = document.createElement("div");
      deleteBtn.classList.add("form-group");
      deleteBtn.style.justifyContent = "flex-end";
      let btn = document.createElement("button");
      btn.type = "button";
      btn.innerHTML = "Delete Post";

      deleteBtn.appendChild(btn);
      section.appendChild(deleteBtn);

      deleteBtn.addEventListener("click", (e) => {
        API.deletePost(res._id).then(() => {
          alert("Post successfully deleted");
          window.location = "index_complete.html"
        })
      })
    }
  }

  containerEl.append(section);
}