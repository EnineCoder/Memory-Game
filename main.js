let boxs = document.querySelectorAll(".box");
let userName = document.querySelector(".user");
let startBtn = document.querySelector(".btn");
let triesNum = document.querySelector(".tries");

startBtn.addEventListener("click", (e) => {
  let promptMsg = window.prompt("What is your name ?");
  promptMsg === ""
    ? (userName.innerHTML = "Unknown")
    : (userName.innerHTML = promptMsg);
  e.target.parentElement.remove();

  let order = Array.from({ length: boxs.length }, (_, i) => i + 1).sort(
    () => Math.random() - 0.5
  );

  // Apply the order to the boxes
  boxs.forEach((box, i) => {
    box.style.order = order[i];
    startProcess(box);
  });
});

let flippedBoxes = [];
function startProcess(box) {
  box.addEventListener("click", (e) => {
    if (flippedBoxes.length < 2) {
      e.target.parentElement.classList.add("rotate");

      flippedBoxes.push(box);

      if (flippedBoxes.length === 2) {
        let [img1, img2] = flippedBoxes.map((box) => box);

        if (img1.querySelector("img").src !== img2.querySelector("img").src) {
          setTimeout(() => {
            flippedBoxes.map((box) => box.classList.remove("rotate"));
            document.querySelector(".fail").play();
            flippedBoxes = [];
          }, 1000);
        } else {
          flippedBoxes.length = 0;
          document.querySelector(".achieve").play();
          triesNum.innerHTML++;
        }
      }
    }
  });
}
