let boxes = document.querySelectorAll(".box");
let container = document.querySelector(".container");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#newGame");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //plaer X player Y: will have alternate turns
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    container.classList.remove("hide");
    resetBtn.classList.remove("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {//player O's turn
            box.innerText = "O";
            turnO = false;
        } else {//player X's turn
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    })
});


const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}
const showWinner = (winner) => {
    msg.innerText = `Congratulations 🎉, Winner is ${winner}`;
    msgContainer.classList.remove("hide");/*classList= msg-container hide*/
    container.classList.add("hide");
    resetBtn.classList.add("hide");
    disableBoxes();
}
const draw = () => {
    msg.innerText = `😎,\n It's a Draw`;
    msgContainer.classList.remove("hide");
    container.classList.add("hide");
    resetBtn.classList.add("hide");
};
const checkWinner = () => {
    let isDraw = true;

    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val === "" || pos2Val === "" || pos3Val === "") {
            isDraw = false;
            continue;
        }

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val == pos2Val && pos2Val == pos3Val) {
                showWinner(pos1Val);
                return;
            }
        }
    }
    // If no winner and all boxes are filled, declare a draw
    if (isDraw) {
        draw();
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);