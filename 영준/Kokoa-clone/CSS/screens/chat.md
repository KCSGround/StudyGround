# Detail of chat.css

## Basic of CSS

- [index.html](https://github.com/dudwns9331/WebStudy/blob/master/kokoa-clone/Details/detail_html/index.md) 파일을 통해서 [styles.css](https://github.com/dudwns9331/WebStudy/blob/master/kokoa-clone/Details/detail_css/styles.md) 파일을 `@import` 하기 때문에 모든 CSS 파일은 `stylesheet`가 적용되려면 `@import` 되어야 한다.

- CSS 파일은 html의 class 혹은 id를 통해서 연결이 가능하고 해당 값을 수정한 후 `;` 세미콜론으로 마무리 해야한다.

---

- ## chat.css

```css
.chat-status {
  background-color: #abc1d1;
}

.chat-screen {
  background-color: #abc1d1;
  height: 500vh;
}

.chat-screen .status-bar {
  /* div 레이어의 몇 번째에 해당하는지 설정한다. layer 설정 개념 */
  z-index: 2;
}

.chat-screen .alt-header {
  top: 0%;
  margin-top: 15px;
  position: fixed;
  width: 100%;
  box-sizing: border-box;
  background-color: #abc1d1;
  z-index: 1;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    transform: none;
    opacity: 1;
  }
}

.main-chat {
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadeIn 0.8s linear;
}

.chat__timestamp {
  color: white;
  background-color: #92a4b2;
  padding: 12px;
  border-radius: 22px;
  font-size: 14px;
  margin-bottom: 25px;
}

.message-row {
  width: 100%;
  display: flex;
  margin-bottom: 25px;
}

.message-row img {
  width: 55px;
  height: 55px;
  border-radius: 45%;
  margin-right: 10px;
}

.message__author {
  margin-bottom: 5px;
  display: block;
}

.message__info {
  display: flex;
  align-items: flex-end;
}

.message__bubble {
  background-color: white;
  padding: 10px;
  font-size: 18px;
  border-radius: 12px;
  border-top-left-radius: 0px;
  margin-right: 5px;
}

.message__author,
.message__time {
  opacity: 0.8;
  font-size: 14px;
}

.message-row--own {
  justify-content: flex-end;
}

.message-row--own .message__bubble {
  background-color: var(--yellow);
  border-top-right-radius: 0;
  border-top-left-radius: 15px;
  margin-right: 0px;
  margin-left: 5px;
}

/* order의 기능은 flex children 에게만 적용이 된다. */
/* .message-row--own .message__bubble {
  order: 1;
}

.message-row--own .message__time {
  order: 0;
} */

.message-row--own .message__info {
  flex-direction: row-reverse;
}

.reply {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 25px;
  box-sizing: border-box;
  transition: transform 0.3s ease-in;
}

.reply i {
  opacity: 0.5;
}

.reply .reply__column:first-child {
  display: flex;
  text-align: center;
  font-size: 20px;
  width: 10%;
}

.reply .reply__column:last-child {
  width: 90%;
  position: relative;
}
.reply input {
  padding: 12px;
  width: 100%;
  border: var(--main-border);
  border-radius: 25px;
  box-sizing: border-box;
  transition: all 0.3s ease-in;
}

.reply__column:last-child > i,
.reply__column:last-child button {
  position: absolute;
  right: 3px;
  top: 5px;
}
.reply__column:last-child > i {
  display: flex;
  text-align: center;
  right: 38px;
  top: 14px;
}

.reply__column button {
  background-color: var(--yellow);
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.reply__column button:focus,
.reply__column button:active {
  outline: none;
}

.reply__column button i {
  opacity: 1;
}

.reply__column input {
  font-size: 15px;
}

.reply .reply__column:first-child,
.reply .fa-smile-wink,
.reply button {
  transition: opacity 0.3s ease-in-out;
}

.reply:focus-within .reply__column:first-child,
.reply:focus-within .fa-smile-wink,
.reply:focus-within button {
  opacity: 0;
}

.reply input:focus {
  width: 95vw;
  transform: translateX(-13.5%) translateY(-80px);
}

.reply:focus-within {
  transform: translateY(80px);
}
```

<br/>

<p align="center">
<img src="https://github.com/dudwns9331/WebStudy/blob/master/kokoa-clone/Details/images/screen_chat.PNG" height="300px" width="500px">
<img src="https://github.com/dudwns9331/WebStudy/blob/master/kokoa-clone/Details/images/screen_chat2.PNG" height="300px" width="500px">
</p>
