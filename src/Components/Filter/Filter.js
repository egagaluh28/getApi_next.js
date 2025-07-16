const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open(
  "GET",
  "https://youtube138.p.rapidapi.com/auto-complete/?q=desp&hl=en&gl=US"
);
xhr.setRequestHeader(
  "x-rapidapi-key",
  "5831ceba48mshbb759bb9ab4da82p1add27jsn6b3f38ad958f"
);
xhr.setRequestHeader("x-rapidapi-host", "youtube138.p.rapidapi.com");

xhr.send(data);
