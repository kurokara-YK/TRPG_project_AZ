const inputField = document.getElementById('input-field');
const wordActions = {
    "success": {
        color: "white",
        text: "SUCCESS",
        textColor: "black" // テキスト色を指定
    },
    "現実": {
        color: "blue",
        text: "real_world",
        textColor: "white" // テキスト色を白に
    },
    "夢の中": {
        color: "white",
        text: "TRPGの世界は楽しかったですか？",
        textColor: "black" // デフォルトで黒
    },
    "クトゥルフ神話": {
        color: "black",
        text: "もう一度生まれ直してください",
        textColor: "gray" // テキスト色を白に
    },
    "シナリオ": {
        color: "white",
        text: "シナリオ",
        textColor: "red" // テキスト色を赤に
    }
};

inputField.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const userInput = inputField.value.trim();

        if (wordActions[userInput]) {
            if (userInput === "シナリオ") {
                // シナリオの場合はPDFを直接開く
                // window.location.href = "scenario.pdf";
                // シナリオの場合はPDFを直接ブラウザで表示
                window.open("scenario.pdf", "_blank");
            } else {
                document.body.classList.add('fade-out');
                
                // アニメーション終了後に背景色とテキストを更新
                setTimeout(() => {
                    const action = wordActions[userInput];

                    // 背景色を変更
                    document.body.style.backgroundColor = action.color;

                    // フェードインを再設定するため、フェードアウトクラスを削除
                    document.body.classList.remove('fade-out');

                    // 新しいテキストを表示
                    const newContent = document.createElement('h1');
                    newContent.textContent = action.text;
                    newContent.style.color = action.textColor;
                    newContent.style.fontSize = "3em";
                    newContent.style.textAlign = "center";

                    // 現在のコンテンツをクリアして新しい要素を追加
                    document.body.innerHTML = "";
                    document.body.appendChild(newContent);
                }, 1000); // フェードアウトアニメーションの1秒後に実行
            }
        } else {
            // 無効な入力時に振動アニメーションを実行
            inputField.classList.add('shake');

            // 無効な入力の場合にエラーメッセージを一時表示
            const errorMessage = document.createElement('p');
            errorMessage.textContent = "入力が無効です。正しい単語を入力してください。";
            errorMessage.style.color = "red";
            errorMessage.style.textAlign = "center";
            errorMessage.style.marginTop = "10px";
            document.getElementById('search-container').appendChild(errorMessage);

            setTimeout(() => {
                inputField.classList.remove('shake');
                errorMessage.remove();
            }, 1500); // 1.5秒後にエラーメッセージを削除
        }
    }
});

