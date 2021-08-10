# 이벤트 핸들링

### 이벤트를 사용할 때의 주의 사항

<br>

1. 이벤트의 이름은 카멜 표기법으로 작성한다.
2. 이벤트에 실행할 자바스크립트 코드를 전달하는 것이 아니라, 함수 형태의 값을 전달한다.
3. DOM 요소에만 이벤트를 설정할 수 있다.

<br>

## 클래스 컴포넌트 이벤트 핸들링

<br>

```js
import React, { Component } from "react";

class EventPractice extends Component {
    state = {
        username: "",
        message: "",
    };

    // constructor(props) {  화살표 함수를 이용하여 메서드를 지정하면 constructer 메서드 바인딩을 따로 할 팔요가 없다.
    //     super(props);
    //     this.handleChange = this.handleChange.bind(this);
    //     this.handleClick = this.handleClick.bind(this);
    // }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            // 객체 안에서 key를 []로 감싸면 그 안에 넣은 레퍼런스가 가리키는 실제 값이 key 값으로 사용된다.
            //이렇게 이용하면 메소드를 여러개 만들지 않고도 인풋의 name이 다른 input을 render()에 추가하여 간단하게 구축할 수 있다.
        });
    };

    handleClick = (e) => {
        alert(this.state.username + " : " + this.state.message);
        this.setState({ username: " ", message: "" });
    };

    handleKeyPress = (e) => {
        if (e.key === "Enter") {
            this.handleClick();
        }
    };

    render() {
        return (
            <div>
                <h1>이벤트 연습</h1>
                <input type="text" name="username" placeholder="사용자명" vlaue={this.state.username} onChange={this.handleChange} />
                <input type="text" name="message" placeholder="아무거나 입력해 보세요" value={this.state.message} onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
                <button onClick={this.handleClick}>확인</button>
            </div>
        );
    }
}

export default EventPractice;
```

<br>

여기서 e 객체는 SyntheticEvent로 웹 브라우저 네이티브 이벤트를 감싸는 객체이다. 네이티브 이벤트와 인터페이스가 같으므로 순수 자바스크립트에서 HTML 이벤트를 다룰 때와 똑같이 사용하면 된다.
<br>
그러나 이벤트가 끝나고 나면 초기화 되므로 정보를 참조할 수 없다.

---

<br>

## 함수형 컴포넌트 이벤트 핸들링

<br>

```js
import React, { useState } from "react";

const EventPractice = () => {
    const [form, setForm] = useState({
        username: "",
        message: "",
    });
    const { username, message } = form;
    const onChange = (e) => {
        const nextform = {
            ...form, //기존의 form 내용을 이 자리에 복사한 뒤
            [e.target.name]: e.target.value, //원하는 값을 덮어 씌우기
        };
        setForm(nextform);
    };
    const onClick = () => {
        alert(username + " : " + message);
        setForm({
            Username: "",
            Message: "",
        });
    };

    const onKeyPress = (e) => {
        if (e.key === "Enter") {
            onClick();
        }
    };

    return (
        <div>
            <h1>이벤트 연습</h1>
            <input type="text" name="username" placeholder="사용자명" value={username} onChange={onChange} />
            <input type="text" name="message" placeholder="아무거나 입력해 보세요" value={message} onChange={onChange} onKeyPress={onKeyPress} />
            <button onClick={onClick}>확인</button>
        </div>
    );
};

export default EventPractice;
```

useState를 통해 문자열만이 아닌 객체로 넣어 작성한 코드

---
