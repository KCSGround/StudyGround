# 컴포넌트 반복

## map() 함수

<br>

자바스크립트 배열 객체의 내장 함수인 map 함수를 사용하여 반복되는 컴포넌트를 렌더링할 수 있다.
<br>
map 함수는 파라미터로 전달된 함수를 사용하여 배열 내 각 요소를 원하는 규칙에 따라 변환한 후 그 결과로 새로운 배열을 생성한다.

<br>

### 문법

<br>

### arr.map(callback, [thisArg])

<br>

### 파라미터

-   callback: 새로운 배열의 요소를 생성하는 함수로 파라미터는 다음 세 가지다.

    -   currentValue: 현재 처리하고 있는 요소
    -   index: 현재 처리하고 있는 요소의 index 값
    -   array: 현채 처리하고 있는 원본 배열

        <br>

-   thisArg(선택 항목): callback 함수 내부에서 사용할 this 레퍼런스

<br>

## 데이터 배열을 컴포넌트 배열로 변환하기

<br>

리액트에서 key는 컴포넌트 배열을 렌더링했을 때 `어떤 원소에 변동이 있었는지` 알아내려고 사용한다.
<br>
예를 들어 유동적인 데이터를 다룰 때는 원소를 새로 생성할 수도, 제거할 수도, 수정할 수도 있다.
<br>
key가 없을 때는 Virtual DOM을 비교하는 과정에서 리스트를 순차적으로 비교하면서 변화를 감지한다. 하지만 key가 있다면 이 값을 사용하여 더 빠르게 알아낼 수 있다.

<br>

`키 값은 언제나 유일해야 한다.` 따라서 useState를 사용하여 데이터를 추가할 때 사용할 고유 id를 지정한다.

<br>

```js
import React, { useState } from "react";

const IterationSample = () => {
    const [names, setNames] = useState([
        { id: 1, text: "눈사람" },
        { id: 2, text: "얼음" },
        { id: 3, text: "눈" },
        { id: 4, text: "바람" },
    ]);
    const [inputText, setInputText] = useState("");
    const [nextId, setNextId] = useState(5); // 새로운 항목을 추가할 때 사용할 id

    const onChange = (e) => setInputText(e.target.value);
    const onClick = (e) => {
        const nextNames = names.concat({
            //concat 함수는 여러 배열을 하나로 합쳐주는 기능을 한다.(새로운 배열을 생성한다)
            id: nextId, // nextId 값을 id로 설정하고
            text: inputText,
        });
        setNextId(nextId + 1); //nextId 값에 1을 더해준다.
        setNames(nextNames); // names 값을 업데이트 해준다.
        setInputText(""); // inputText를 비운다.
    };

    const onRemove = (id) => {
        const nextNames = names.filter((name) => name.id !== id); //!== 연산자는 변수타입까지 고려하여 비교한다.
        setNames(nextNames);
    };

    const namesList = names.map((name) => (
        <li key={name.id} onDoubleClick={() => onRemove(name.id)}>
            {name.text}
        </li>
    ));
    return (
        <>
            <input value={inputText} onChange={onChange} />
            <button onClick={onClick}>추가</button>
            <ul>{namesList}</ul>
        </>
    );
};

<br>

export default IterationSample;
```

---
