const inputField = document.getElementById('input-field');
const wordActions = {
    "success": {
        color: "white",
        text: "SUCCESS",
        textColor: "black"
    },
    "return": {
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
    }
};

inputField.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        const userInput = inputField.value.trim();

        if (wordActions[userInput]) {
            if (wordActions[userInput].shutdown) {
                // シャットダウン演出
                document.body.style.transition = "background-color 3s ease, opacity 3s ease";
                document.body.style.backgroundColor = "black"; // 背景を黒に
                document.body.style.opacity = "0"; // 徐々にフェードアウト

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

                    // 画面をリセットしてメッセージのみ表示
                    document.body.innerHTML = "";
                    document.body.appendChild(shutdownMessage);
                }, 3000); // フェードアウトが完了する3秒後

                // 効果音を再生
                const audio = new Audio('shutdown.mp3'); // shutdown.mp3を事前に用意
                audio.play();
            } else if (wordActions[userInput].redirect) {
                // フェードアウトを適用してからリダイレクト
                document.body.classList.add('fade-out');

                setTimeout(() => {
                    // フェードアウト完了後にリダイレクト
                    window.location.href = wordActions[userInput].redirect;
                }, 1000); // フェードアウト時間に合わせる
            } else {
                document.body.classList.add('fade-out');

                setTimeout(() => {
                    const action = wordActions[userInput];
                    document.body.style.backgroundColor = action.color;
                    document.body.classList.remove('fade-out');

                    // 元の入力ページに戻るボタンを作成
                    const backButton = document.createElement('button');
                    backButton.textContent = "return";
                    backButton.style.padding = "10px 10px";
                    backButton.style.fontSize = "1em";
                    backButton.style.marginTop = "300px";
                    backButton.style.cursor = "pointer";
                    backButton.onclick = () => {
                        // 元のページに戻る処理
                        location.reload(); // ページをリロードして初期状態に戻す
                    };

                    const newContent = document.createElement('h1');
                    newContent.textContent = action.text;
                    newContent.style.color = action.textColor;
                    newContent.style.fontSize = "3em";
                    newContent.style.textAlign = "center";

                    // 現在のコンテンツをクリアして、新しいテキストとボタンを表示
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
