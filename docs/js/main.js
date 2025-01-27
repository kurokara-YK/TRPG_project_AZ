const inputField = document.getElementById('input-field');
const programTextElement = document.createElement('div');
programTextElement.id = 'program-text';
document.body.appendChild(programTextElement);

const wordActions = {
    "success": {
        color: "white",
        text: "SUCCESS",
        textColor: "black"
    },
    "shutdown": {
        shutdown: true // シャットダウン用フラグ
    },
    "現実": {
        color: "blue",
        text: "real_world",
        textColor: "white"
    },
    "real": {
        color: "blue",
        text: "real_world",
        textColor: "white"
    },
    "tutorial": {
        color: "white",
        text: "Now loading",
        textColor: "black"
    },
    "Cthulhu": {
        color: "black",
        text: "気づいてしまいましたか…あなたは1d6のSAN値チェックです",
        textColor: "gray"
    },
    "クトゥルフ": {
        color: "black",
        text: "気づいてしまいましたか…あなたは1d6のSAN値チェックです",
        textColor: "gray"
    },
    "クトゥルフ神話": {
        color: "black",
        text: "気づいてしまいましたか…あなたは1d6のSAN値チェックです",
        textColor: "gray"
    },
    "夢": {
        color: "white",
        text: "シナリオ",
        textColor: "red"
    },
    "dream": {
        color: "white",
        text: "シナリオ",
        textColor: "red"
    },
    "a": {
        redirect: "index1.html"
    },
    "b": {
        redirect: "index2.html"
    },
    "c": {
        redirect: "index3.html"
    },
    "d": {
        redirect: "index4.html"
    },
    "e": {
        link: "PDF/1_シナリオ.pdf"
    },
    "f": {
        link: "PDF/2_ミ=ゴと人類との共存報告書.pdf"
    },
    "g": {
        link: "PDF/3_人間の意識と人格の研究記録.pdf"
    },
    "h": {
        link: "PDF/4_SAN値についてミ=ゴの考察.pdf"
    },
    "i": {
        link: "PDF/5_ミ=ゴのVR実験報告書.pdf"
    }
};

// プログラムっぽい文字列を表示
const programTexts = [
    "Initializing system...",
    "Connecting to server...",
    "Access granted.",
    "Running diagnostics...",
    "Compiling code...",
    "Decrypting...",
    "Injection successful.",
    "Code execution in progress...",
    "Data transmission: OK.",
    "Encrypting data..."
];

function updateProgramText() {
    const randomText = programTexts[Math.floor(Math.random() * programTexts.length)];
    programTextElement.textContent = randomText;
}

// 3秒ごとに更新
setInterval(updateProgramText, 3000);

// 初期テキストを設定
updateProgramText();

// 入力フィールドの処理
inputField.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        const userInput = inputField.value.trim();

        if (wordActions[userInput]) {
            const action = wordActions[userInput];

            if (action.shutdown) {
                document.body.style.transition = "background-color 3s ease, opacity 3s ease";
                document.body.style.backgroundColor = "black";
                document.body.style.opacity = "0";

                setTimeout(() => {
                    const shutdownMessage = document.createElement('h1');
                    shutdownMessage.textContent = "シャットダウンしています...";
                    shutdownMessage.style.color = "white";
                    shutdownMessage.style.fontSize = "3em";
                    shutdownMessage.style.textAlign = "center";
                    shutdownMessage.style.position = "absolute";
                    shutdownMessage.style.top = "50%";
                    shutdownMessage.style.left = "50%";
                    shutdownMessage.style.transform = "translate(-50%, -50%)";

                    document.body.innerHTML = "";
                    document.body.appendChild(shutdownMessage);
                }, 3000);

                const audio = new Audio('shutdown.mp3');
                audio.play();
            } else if (action.redirect) {
                document.body.classList.add('fade-out');

                setTimeout(() => {
                    window.location.href = action.redirect;
                }, 1000);
            } else if (action.link) {
                // PDFリンクを新しいタブで開く
                window.open(action.link, '_blank');
            } else {
                document.body.classList.add('fade-out');

                setTimeout(() => {
                    document.body.style.backgroundColor = action.color;
                    document.body.classList.remove('fade-out');

                    const backButton = document.createElement('button');
                    backButton.textContent = "return";
                    backButton.style.padding = "10px 10px";
                    backButton.style.fontSize = "1em";
                    backButton.style.marginTop = "300px";
                    backButton.style.cursor = "pointer";
                    backButton.onclick = () => {
                        location.reload();
                    };

                    const newContent = document.createElement('h1');
                    newContent.textContent = action.text;
                    newContent.style.color = action.textColor;
                    newContent.style.fontSize = "3em";
                    newContent.style.textAlign = "center";

                    document.body.innerHTML = "";
                    document.body.appendChild(newContent);
                    document.body.appendChild(backButton);
                }, 1000);
            }
        } else {
            inputField.classList.add('shake');
            const errorMessage = document.createElement('p');
            errorMessage.textContent = "入力が無効です。正しい単語を入力してください。";
            errorMessage.style.color = "red";
            errorMessage.style.textAlign = "center";
            errorMessage.style.marginTop = "10px";
            document.getElementById('search-container').appendChild(errorMessage);

            setTimeout(() => {
                inputField.classList.remove('shake');
                errorMessage.remove();
            }, 1500);
        }
    }
});
