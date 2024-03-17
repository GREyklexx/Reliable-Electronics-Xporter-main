const image = document.getElementById("source");
const iimage = document.getElementById("source").src;

function turn(state) {
  if (state === "on") {
    image.src =
      "https://i.etsystatic.com/21588727/r/il/5a5e1b/2856407530/il_570xN.2856407530_5ex8.jpg";
  } else if (state === "off") {
    image.src = iimage;
  }
}

function mode() {
  const lowerpart = document.querySelector(".grid-container");
  const upperpart = document.getElementById("live-feed");

  if (document.getElementById("check").checked) {
    lowerpart.style.background = "linear-gradient(#080f19, #040351)";
    upperpart.style.background = "black";
  } else {
    lowerpart.style.background = "linear-gradient(#171bee, #d318d0)";
    upperpart.style.background = "white";
  }
}
