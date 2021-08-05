# ref:DOM에 이름달기

## ref가 이용되는 상황

-   ref는 DOM을 직접적으로 건드려야될 때 사용된다.

<br>

## DOM을 꼭 사용해야되는 상황

-   특정 input에 포커스 주기
-   스크롤 박스 조작하기
-   Canvas 요소에 그림 그리기

<br>

리액트에서 컴포넌트에도 ref를 달 수 있다. 이 방법은 주로 컴포넌트 내부에 있는 DOM을 컴포넌트 외부에서 사용할 때 사용한다.

## 클래스 컴포넌트에서 ref 사용 예제

```js
import React, { Component } from "react";
import "./ValidationSample.css";

class ValidationSample extends Component {
    state = {
        password: "",
        clicked: false,
        validation: false,
    };

    handleChange = (e) => {
        this.setState({
            password: e.target.value,
        });
    };

    handleButtonClick = () => {
        this.setState({
            clicked: true,
            validation: this.state.password === "0000",
        });
    };

    render() {
        return (
            <div>
                <input type="password" value={this.state.password} onChange={this.handleChange} className={this.state.clicked ? (this.state.validation ? "success" : "failure") : ""} />
                <button onClick={this.handleButtonClick}>검증하기</button>
            </div>
        );
        //clicked와 validation에 따라 클래스 네임을 success, failure로 지정하여 input의 background-color가 바뀐다.
    }
}
export default ValidationSample;
```

<br>

## ref를 이용한 ScrollBox 예제

```js
import React, { Component } from "react";

class ScrollBox extends Component {
    scrollToBottom = () => {
        const { scrollHeight, clientHeight } = this.box;
        /* 앞 코드에는 비구조화 할당 문법을 사용했다.
           다음 코드와 같은 의미이다.
           const scrollHeight = this.box.scrollHeight;
           const clientHeight = this.box.clientHeight;
        */
        this.box.scrollTop = scrollHeight - clientHeight;
    };

    render() {
        const style = {
            border: "1px solid black",
            height: "300px",
            width: "300px",
            overflow: "auto",
            position: "relative",
        };

        const innerStyle = {
            width: "100%",
            height: "650px",
            background: "linear-gradient(white, black)",
        };

        return (
            <div
                style={style}
                ref={(ref) => {
                    this.box = ref;
                }}
            >
                <div style={innerStyle} />
            </div>
        );
    }
}

export default ScrollBox;
```

---
