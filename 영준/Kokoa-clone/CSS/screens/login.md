# Detail of login.css

## Basic of CSS

- [index.html](https://github.com/dudwns9331/WebStudy/blob/master/kokoa-clone/Details/detail_html/index.md) 파일을 통해서 [styles.css](https://github.com/dudwns9331/WebStudy/blob/master/kokoa-clone/Details/detail_css/styles.md) 파일을 `@import` 하기 때문에 모든 CSS 파일은 `stylesheet`가 적용되려면 `@import` 되어야 한다.

- CSS 파일은 html의 class 혹은 id를 통해서 연결이 가능하고 해당 값을 수정한 후 `;` 세미콜론으로 마무리 해야한다.

---

```css
/* 상태바 밑에 헤더 */
.welcome-header {
  /* 위 아래 동일하게 90px 적용 */
  margin: 90px 0px;
  text-align: center; /* 모든 텍스트들이 중앙으로 오게 배치 */
  display: flex; /* 박스 형태의 것들을 inline의 속성으로 */
  flex-direction: column; /* 수평말고 수직으로 배열 */
  align-items: center; /* 안에 있는 요소들 전부 중앙으로 배치 */
}

.welcome-header__title {
  margin-bottom: 20px;
  font-size: 25px;
  font-weight: 600;
}

.welcome-header__text {
  width: 60%;
  opacity: 0.7;
}

/* login-form으로 지정된 form id에 있는 요소 전부 적용 */
#login-form {
  display: flex;
  flex-direction: column;
  margin: 0px 30px;
}

/* login-form에 있는 input태그들만 적용 */
#login-form input {
  padding: 15px 0px;
  border: none;
  font-size: 18px;
  margin-bottom: 25px;
  /* 0.3초동안 focus되면 색이 변한다 */
}

/* not을 이용해서 특정 속성만 attribute selector [type = "value"] */
#login-form input:not([type="submit"]) {
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  transition: border-color 0.3s ease-in-out;
}

/* input의 attribute selector가 submit이면 cursor:pointer */
#login-form input[type="submit"] {
  background-color: var(--yellow);
  /* not allowed or pointer or progress로 마우스 포인터 지정 가능 */
  cursor: pointer;
  padding: 20px 0px;
  border-radius: 5px;
}

/* input 안에 있는 hint의 색 지정 Email or phtone number, Password*/
#login-form input::placeholder {
  color: rgba(0, 0, 0, 0.4);
}

/* status가 적용됐기 때문에 transisiton으로 애니메니이션 적용 가능 */
#login-form input:focus {
  border-color: var(--yellow);
}

/* find Kokoa Account or Password 링크*/
#login-form a {
  /* 텍스트 센터로 */
  text-align: center;
  /* 링크로 변하는 색 없애기 */
  text-decoration: none;
  /* 상속받은 색으로 */
  color: inherit;
  font-size: 13px;
}
```

<br/>

<p align="center">
<img src="https://github.com/dudwns9331/WebStudy/blob/master/kokoa-clone/Details/images/screen_login.PNG" height="300px" width="500px">
</p>
