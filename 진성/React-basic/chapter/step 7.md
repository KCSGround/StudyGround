# 컴포넌트의 라이플사이클 메서드

<br>

모든 리액트 컴포넌트에는 라이플사이클이 존재한다. 컴포넌트의 수명은 페이지에 렌더링되기 전인 준비 과정에서 시작하여 페이지에서 사라질 때 끝난다.

<br>

## 라이플사이클 메서드의 이해

<br>

라이플사이클 메서드의 종류는 총 아홉 가지이다. Will 접두사가 붙은 메서드는 어떤 작업을 작동하기 전에 실행되는 메서드이고, Did 접두사가 붙은 메서드는 어떤 작업을 작동한 후에 실행되는 메서드이다.
<br>

이 메서드들은 우리가 컴포넌트 클래스에서 덮어 써 선언함으로써 사용할 수 있다.

<br>

<img src="https://media.vlpt.us/images/whdvkf92/post/00857de6-0258-4b14-ad9b-3f653dca1553/%EB%A6%AC%EC%95%A1%ED%8A%B8%20%EB%9D%BC%EC%9D%B4%ED%94%84%EC%82%AC%EC%9D%B4%ED%81%B4.JPG" width = 550px height = 500px />

<br>
<br>

라이플사이클은 총 세 가지, 즉 마운트, 업데이트, 언마운트 카테고리로 나눈다.

<br>

---

## 마운트

<br>

DOM이 생성되고 웹 브라우저상에 나타는 것을 마운트라 한다. 이때 호출하는 메서드는 다음과 같다.

<br>

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbwIATu%2FbtquOHkBOxK%2FWTXqAEYiYOG9J9La4JOtHk%2Fimg.png" width="500px" height="100px">

<br>
<br>

-   constructor : `컴포넌트를 새로 만들 때`마다 호출되는 클래스 생성자 메서드이다.

    -   초기 state 설정가능

<br>

-   getDerivedStateFromProps : `props에 있는 값을 state에 넣을 때` 사용하는 메서드이다.
    -   props로 받아온 값을 state에 동기화시키는 용도
    -   컴포넌트가 마운트될 때, 업데이트될 때 호출

<br>

-   render : 우리가 준비한 `UI를 렌더링하는` 메서드이다.
    -   this.props, this.state에 접근 가능
    -   리액트 요소 반환
    -   이벤트 설정이 아닌 곳에서 setState를 사용 불가능
    -   브라우저 DOM 접근 불가능
    -   위 두 가지 상황은 componentDidMount에서 처리해야한다.

<br>

-   componentDidMount : `컴포넌트가 웹 브라우저상에 나타난 후` 호출하는 메서드이다.
    -   이 안에서 다른 js 라이브러리 또는 프레임워크의 함수를 호출하거나 이벤트 등록, setTimeout, setInterval, 네트워크 요청 같은 비동기 작업을 처리하면 된다.

<br>

---

## 업데이트

<br>

컴포넌트는 다음과 같은 총 네 가지 경우에 업데이트한다.

1. props가 바뀔 때
2. state가 바뀔 때
3. 부모 컴포넌트가 리렌더링될 때
4. this.formeUpdate로 강제로 렌더링을 트리거할 때

<br>

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbG5Apv%2FbtquPL1clWW%2F7dWRWNBJBQTkYP45X5I601%2Fimg.png" width="700px">

<br>
<br>

-   getDerivedStateFromProps : 이 메서드는 `마운트 과정에서도 호출되며, 업데이트가 시작하기 전에도 호출된다`. props의 변화에 따라 state 값에도 변화를 주고 싶을 때 사용한다.

-   shouldComponentUpdate : `컴포넌트가 리렌더링을 해야 할지 말지 결정하는 메서드이다.` 이 메서드에서는 true 혹은 false 값을 반환해야 하며, true를 반환하면 다음 라이플사이클 메서드를 계속 실행하고, false를 반환하면 작업을 중지한다. 즉, 컴포넌트가 리렌더링되지 않는다. <br><br> 만약 특정 함수에서 this.forceUpdate() 함수를 호출한다면 이 과정을 생략하고 바로 render 함수를 호출한다.
    -   props, state를 변경했을 때, 리렌더링의 시작 여부을 지정하는 메서드
    -   이 메서드 안에서 현재 props, state는 this.props, this.state로 접근하고, 새로 설정될 값 또한 nextProps, nextState로 접근 할 수 있다.
    -   프로젝트 성능을 최적화할 때 리렌더링 방지용을 사용한다.

<br>

-   render : 컴포넌트를 리렌더링한다.

-   getSnapshotBeforeUpdate : `컴포넌트 변화를 DOM에 반영하기 바로 직전`에 호출하는 메서드이다.
    -   이 메서드에서 반환하는 값은 componentDidUpdate에서 세 번째 파라미터인 snapshot 값으로 전달받을 수 있다.
    -   주로 업데이트하기 직전의 값을 참고할 일이 있을 때 활용된다.

<br>
-   componentDidUpdate : `컴포넌트의 업데이트 작업이 끝난 후` 호출하는 메서드이다.
    -   업데이트가 끝난 직후이므로, DOM 관련 처리를 해도 무방하다.
    -   prevProps, prevState를 사용하여 컴포넌트가 이전에 가졌던 데이터에 접근할 수 있다.
    -   getSnapshotBeforeUpdate에서 반환한 값이 있다면 snapshot 값을 전달받을 수 있다.

## <br>

---

## 언마운트

<br>

마운트의 반대 과정, 즉 컴포넌트를 DOM에서 제거하는 것을 언마운트라고 한다.

-   componentWillUnmount : 컴포넌트가 웹 브라우저상에서 사라지기 전에 호출하는 메서드이다.
    -   componentDidMount에서 등록한 이벤트, 타이머, 직접 생성한 DOM이 있다면 여기서 제거 작업을 해야한다.

<br>

---

<br>

componentDidCatch : 컴포넌트 렌더링 도중 에러가 발생했을 때 앱이 먹통이 되지 않고 오류 UI를 보여줄 수 있게 해준다.

-   이 메서드를 사용할 때는 컴포넌트 자신에게 발생하는 에러를 잡아낼 수 없고, 자신의 this.props.children으로 전달되는 컴포넌트에서 발생하는 에러만 잡아낼 수 있다.

<br>

---

<br>

## 예제 컴포넌트

<br>

이 컴포넌트는 각 라이플사이클 메서드를 실행할 때마다 콘솔 디버거에 기록하고, 부모 컴포넌트에서 props로 색상을 받아 버튼을 누르면 state.number 값을 1씩 더한다.

<br>

### App.js

<br>

```js
import React, { Component } from "react";
import LifeCycleSample from "./LifeCycleSample";
import ErrorBoundary from "./ErrorBoundary";

// 랜덤 색상을 생성한다. 16777215를 hex로 표현하면 ffffff가 되므로 해당 코드는 000000 부터 ffffff 값을 반환한다.
function getRandomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

class App extends Component {
    state = {
        color: "#000000",
    };

    handleClick = () => {
        this.setState({
            color: getRandomColor(),
        });
    };

    render() {
        return (
            <div>
                <button onClick={this.handleClick}>랜덤 색상</button>
                <ErrorBoundary>
                    <LifeCycleSample color={this.state.color} />
                </ErrorBoundary>
            </div>
        );
    }
}
export default App;
```

<br>

### LifeCycleSample

<br>

```js
import React, { Component } from "react";

class LifeCycleSample extends Component {
    state = {
        number: 0,
        color: null,
    };

    myRef = null; //ref를 설정할 부분

    constructor(props) {
        super(props);
        console.log("constructor");
    }

    // getDerivedStateFromProps는 부모에게 받은 color 값을 state에 동기화하고 있다.
    static getDerivedStateFromProps(nextProps, prevState) {
        console.log("getDerivedStateFromProps");
        if (nextProps.color !== prevState.color) {
            return { color: nextProps.color };
        }
        return null;
    }

    componentDidMount() {
        console.log("componentDidMount");
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("shouldComponentUpdate", nextProps, nextState);
        // 숫자의 마지막 자리가 4면 리렌더링 하지 않는다.
        return nextState.number % 10 !== 4;
    }

    componentWillMount() {
        console.log("componentWillMount");
    }

    handleClick = () => {
        this.setState({
            number: this.state.number + 1,
        });
    };

    //getSnapshotBeforeUpdate는 DOM에 변화가 일어나기 직전의 색상 속성을 snapshot 값으로 반환하여 이것을 componentDidUpdate에서 조회할 수 있게 했다.
    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log("getSnapshotBeforeUpdate");
        if (prevProps.color !== this.props.color) {
            return this.myRef.style.color;
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("componentDidUpdate", prevProps, prevState);
        if (snapshot) {
            console.log("업데이트되기 직전 색상: ", snapshot);
        }
    }

    render() {
        console.log("render");

        const style = {
            color: this.props.color,
        };

        // {this.props.missing.value}는 존재하지 않는 props인 missing 객체의 value를 조회해서 렌더링한다.
        return (
            <div>
                {/* {this.props.missing.value} */}
                <h1 style={style} ref={(ref) => (this.myRef = ref)}>
                    {this.state.number}
                </h1>
                <p>color: {this.state.color}</p>
                <button onClick={this.handleClick}>더하기</button>
            </div>
        );
    }
}

export default LifeCycleSample;
```

<br>

### Errorboundary

<br>

```js
import React, { Component } from "react";

class ErrorBoundary extends Component {
    state = {
        error: false,
    };

    componentDidCatch(error, info) {
        this.setState({
            error: true,
        });

        console.log({ error, info });
    }

    render() {
        if (this.state.error) return <div>에러가 발생했습니다!</div>;
        return this.props.children;
    }
}

export default ErrorBoundary;
```

---
