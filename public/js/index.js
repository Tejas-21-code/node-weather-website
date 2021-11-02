// console.log("Client side JavaScript");
const weatherform = document.querySelector("form");
const input = document.querySelector("input");
const messageone = document.querySelector("#message-1");
const messagetwo = document.querySelector("#message-2");

weatherform.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = input.value;
  input.value = "";
  //   input.style.autofocus = false;

  messageone.textContent = "Loading";
  messagetwo.textContent = "";

  fetch(`http://localhost:3000/weather?address=${value}`).then((response) => {
    response.json().then((data) => {
      if (data.error) return (messageone.textContent = data.error);
      messageone.textContent = data.location;
      messagetwo.textContent = data.forcast;
    });
  });
});
