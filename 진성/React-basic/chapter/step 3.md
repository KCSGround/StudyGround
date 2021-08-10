# Component

## 컴포넌트

<br>

컴포넌트의 기능은 단순한 템플릿 이상이다. 데이터가 주어졌을 때 이에 맞추어 UI를 만들어주는 것은 물론이고,
라이프사이클 API를 이용하여 컴포넌트에 변화가 일어날 때 주어진 작업을 처리할 수 있으며, 임의로 메소드를 만들어 특별한 기능을 붙여줄 수도 있다.

<br>

## Class Component

<br>

```js
import React, { Component } from "react";

class App extends Component {
    render() {
        const name = "react";
        return <div className="react">{name}</div>;
    }
}

export default App;
```

<br>

클래스형 컴포넌트에서는 render 함수가 꼭 있어야 하고, 그 안에서 보여 주어야 할 JSX를 반환해야 한다.

<br>

```js
import React from "react";

const MyComponent = () => {
    return <div>나의 새롭고 멋진 컴포넌트</div>;
};

export default MyComponent;
```

<br>

함수 선언 방식에는 화살표 함수와 일반 함수 선언 방식이 있다.

-   화살표 함수를 사용했을 때는 **자신이 종속된 인스턴스**를 this로 가르킨다.
-   일반 함수로 사용했을 때는 **자신이 종속된 객채**를 this로 가르킨다.

<br>

클래스형 컴포넌트에서 props 사용하기

```js
class MyComponent extends Component {
    render() {
        const { name, children, favoriteNumber } = this.props;
        return (
            <div>
                안녕하세요, 제 이름은 {name}입니다. <br />
                children 값은 {children}입니다.
                <br />
                제가 좋아하는 숫자는 {favoriteNumber} 입니다.
            </div>
        );
    }
}
```

<br>

---

<br>

## props

<br>

props는 properties를 줄인 표현으로 컴포넌트 속성을 설정할 때 사용하는 요소이다.
<br>
<br>
props 값을 따로 지정하지 않을 때 보여줄 기본값을 설정하는 `default` props

```js
import React from "react";

const MyComponent = (props) => {
    return <div>안녕하세요, 제 이름은 {props.name}입니다.</div>;
};

MyComponent.defaultProps = {
    name: "기본 이름",
};

export default MyComponent;
```

<br>
<br>

컴포넌트 태그 사이의 내용을 보여주는 `children` props
<br>

```js
    //App.js
    ...
    const App = () => {
        return <MyComponent>리액트</MyComponent>;
    };
    ...


    //MyComponent.js
    const MyComponent = (props) => {
        return (
            <div>
                안녕하세요, 제 이름은 {props.name}입니다. <br />
                children 값은 {props.children}입니다.
            </div>
        );
    };
```

<br>

props의 값을 조회할 때마다 비구조화 할당 문법을 통해 간결하게 변경
<br>
비구조화 할당 문법은 객체에서 값을 추출한다.
<br>

```js
const MyComponent = ({ name, children }) => {
    return (
        <div>
            안녕하세요, 제 이름은 {name}입니다. <br />
            children 값은 {children}입니다.
        </div>
    );
};
```

<br>
<br>

props의 타입을 지정하고 싶을 때는 `propTypes`를 사용한다.

```js
    import PropTypes from "prop-types";

    ...

    MyComponent.propTypes = {
    name: PropTypes.string,
    };
```

<br>

필수로 props의 타입을 지정하여 지정하지 않았을 때 경고 메시지를 띄우려면
`isRequired`를 사용

```js
MyComponent.propTypes = {
    name: PropTypes.string,
    favoriteNumber: PropTypes.number.isRequired,
};
```

---

<br>

## State

state는 컴포넌트 내부에서 바뀔 수 있는 값을 의미한다. props는 부모 컴포넌트에서 바꾸어야 현재 컴포넌트에 적용이 된다.

<br>

### useState

```js
import React, { useState } from "react";

const Say = () => {
    const [message, setMessage] = useState;
    const onClickEnter = () => setMessage("안녕하세요!");
    const onClickLeave = () => setMessage("안녕히 가세요!");

    return (
        <div>
            <button onClick={onClickEnter}>입장</button>
            <button onClick={onClickLeave}>퇴장</button>
            <h1>{message}</h1>
        </div>
    );
};

export default Say;
```

<br>

useState 함수의 인자에는 상태의 초깃값을 넣어 준다. 값의 형태는 자유.
<br>

함수를 호출하면 배열이 반환된다 배열의 첫 번째 원소는 현재 상태이고, 두 번째 원소는 상태를 바꾸어 주는 함수다 이를 Setter함수라 부른다.

<br>

### State를 사용할 때 주의 사항

<br>

-   state 값을 바꾸어야 할 때는 setState 혹은 useState를 통해 전달받은 세터 함수를 사용해야한다.
-   배열이나 객체를 업데이트 할 때는 사본은 만든 후 그 사본에 값을 업데이트 하고, 그 사본의 상태를 setState와 같은 세터 함수를 통해 업데이트 한다.

---
