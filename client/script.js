const changeTitle = () => {
  fetch("http://127.0.0.1:7000/api/v1/title")
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      const title = document.getElementById("title");
      if (title && data.title) {
        title.textContent = data.title;
      }
    });
};

const sendPost = () => {
  const textarea = document.getElementById("textarea");
  const btn = document.getElementById("btn");
  if (btn) {
    btn.addEventListener("click", () => {
      if (textarea.value) {
        fetch("http://127.0.0.1:7000/api/v1/comment", {
          method: "POST",
          headers: new Headers({ "Content-Type": "application/json" }),
          body: JSON.stringify({ comment: textarea.value }),
          // body: textarea.value,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            const title = document.getElementById("title");
            if (title && data.title) {
              title.textContent = data.title;
            }
          });
      }

      textarea.value = "";
    });
  }
};

changeTitle();
sendPost();
