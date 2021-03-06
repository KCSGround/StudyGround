# Hooks

## useState

<br>

useState는 가장 기본적인 hook이며, 함수형 컴포넌트에서도 가변적인 상태를 지닐 수 있게 해준다.

```js
const [value, setValue] = useState(0);
```

<br>

useState 함수의 파라미터에는 상태의 기본값을 넣어 준다. 현재 0을 넣어 주었는데, 결국 카운터의 기본값을 0으로 설정하겠다는 의미이다. 이 함수가 호출되면 배열을 반환하는데 `그 배열의 첫 번째 원소는 상태 값, 두 번째 원소는 상태를 호출을 설정하는 함수이다.`
<br>
이 함수에 파라미터를 넣어서 호출하면 전달받은 파라미터로 값이 바뀌고 컴포넌트가 정상적으로 리렌더링된다.

```js
import React, { useState } from "react";

const Counter = () => {
    const [value, setValue] = useState(0);

    return (
        <div>
            <p>
                현재 카운터 값은 <b>{value}</b>입니다.
            </p>
            <button onClick={() => setValue(value + 1)}>+1</button>
            <button onClick={() => setValue(value - 1)}>-1</button>
        </div>
    );
};

export default Counter;
```

<br>

## useState 여러 번 사용하기

<br>

하나의 useState 함수는 하나의 상태 값만 관리할 수 있다. 컴포넌트에서 관리해야 할 상태가 여러 개라면 useState를 여러 번 사용한다.

```js
import React, { useState } from "react";

const Info = () => {
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");

    const onChangeName = (e) => {
        setName(e.target.value);
    };

    const onChangeNickname = (e) => {
        setNickname(e.target.value);
    };

    return (
        <div>
            <div>
                <input value={name} onChange={onChangeName} />
                <input value={nickname} onChange={onChangeNickname} />
            </div>
            <div>
                <div>
                    <b>이름:</b> {name}
                </div>
                <div>
                    <b>닉네임:</b> {nickname}
                </div>
            </div>
        </div>
    );
};

export default Info;
```

<br>

---

## useEffect

<br>

useEffects는 리액트 컴포넌트가 렌더링될 때마다 특정 작업을 수행하도록 설정할 수 있는 Hook이다. 클래스형 컴포넌트의 componentDidMount와 componentDidUpdate를 합친 형태로 봐도 무방하다.

```js
import React, { useState, useEffect } from "react";

const Info = () => {
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    useEffect(() => {
        console.log("렌더링이 완료되었습니다!");
        console.log({
            name,
            nickname,
        });
    }, []);

    const onChangeName = (e) => {
        setName(e.target.value);
    };

    const onChangeNickname = (e) => {
        setNickname(e.target.value);
    };

    return (
        <div>
            <div>
                <input value={name} onChange={onChangeName} />
                <input value={nickname} onChange={onChangeNickname} />
            </div>
            <div>
                <div>
                    <b>이름:</b> {name}
                </div>
                <div>
                    <b>닉네임:</b> {nickname}
                </div>
            </div>
        </div>
    );
};

export default Info;
```

<br>

### 마운트될 때만 실행하고 싶을 때

<br>

useEffect에서 설정한 함수를 컴포넌트가 화면에 맨 처음 렌더링될 때만 실행하고, 업데이트될 때는 실행하지 않으려면 함수의 두 번째 파라미터로 비어있는 배열을 넣어주면 된다.

<br>

```js
useEffect(() => {
    console.log("마운트될 때만 실행됩니다.");
}, []);
```

<br>

### 특정 값이 업데이트될 때만 실행하고 싶을 때

useEffect를 사용할 때, 특정 값이 변경될 때만 호출하고 싶은 경우가 있다. 이러한 경우에는 두 번째 파라미터로 전달되는 배열 안에 검사하고 싶은 값을 넣어주면 된다.

<br>

```js
useEffect(() => {
    console.log(name);
}, [name]);
```

<br>

### 뒷정리 함수

<br>

useEffect는 기본적으로 렌더링되고 난 직후마다 실행되며, 두 번째 파라미터 배열에 무엇을 넣는지에 따라 실행되는 조건이 달라진다.
<br>
컴포넌트가 언마운트되기 전이나 업데이트되기 직전에 어떠한 작업을 수행하고 싶다면 useEffect에서 뒷정리 함수를 반환해 주어야 한다.

언마운트될 때 뒷정리 함수를 호출하고 싶다면 두 번째 파라미터에 빈배열을 넣는다.

<br>

App컴포넌트에서 Info컴포넌트의 가시성 바꾸기

Info.js

```js
useEffect(() => {
    console.log("effect");
    console.log(name);
    return () => {
        console.log("cleanup");
        console.log(name);
    };
}, [name]);
```

<br>

App.js

```js
const App = () => {
    const [visible, setVisible] = useState(false);
    return (
        <div>
            <button
                onClick={() => {
                    setVisible(!visible);
                }}
            >
                {visible ? "숨기기" : "보이기"}
            </button>
            <hr />
            {visible && <Info />}
        </div>
    );
};
```

<br>

---

## useReducer

<br>

useReducer는 useState보다 더 다양한 컴포넌트 상황에 따라 다양한 상태를 다른 값으로 업데이트 해 주고 싶을 때 사용하는 Hook이다.
리듀서는 현재 상태, 그리고 업데이트를 위해 필요한 정보를 담은 `액션 값`을 전달받아 새로운 상태를 반환하는 함수이다.
<br>
리듀서 함수에서 새로운 상태를 만들 때는 반드시 `불변성`을 지켜주어야 한다.
<br>
리덕스에서 사용하는 액션 객체에는 어떤 액션인지 알려주는 type 필드가 꼭 있어야 하지만, useReducer에서 사용하는 액션 객체는 반드시 type을 지니고 있을 필요가 없다.

<br>

```js
import React, { useReducer } from "react";

function reducer(state, action) {
    //action.type에 따라 다른 작업 수행
    switch (action.type) {
        case "INCREMENT":
            return { value: state.value + 1 };
        case "DECREMENT":
            return { value: state.value - 1 };
        default:
            //아무것도 해당되지 않을 때
            return state;
    }
}

const Counter = () => {
    const [state, dispatch] = useReducer(reducer, { value: 0 });

    return (
        <div>
            <p>
                현재 카운터 값은 <b>{state.vlaue}</b>입니다.
            </p>
            <button onClick={() => dispatch({ type: "INCREMENT" })}>+1</button>
            <button onClick={() => dispatch({ type: "DECREMENT" })}>-1</button>
        </div>
    );
};

export default Counter;
```

<br>

useReducer의 첫 번째 파라미터로에는 `리듀서 함수`를 넣고, 두 번째 파라미터에는 `해당 리듀서의 기본값`을 넣어준다.
<br>
<br>
이 Hook을 사용하면 state 값과 dispatch 함수를 받아 오는데 여기서 state는 현재 가리키고 있는 상태고, `dispatch는 액션을 발생시키는 함수이다.` 따라서 함수 안에 파라미터로 액션 값을 넣어 주면 리듀서 함수가 호출되는 구조이다.
<br>
useReducer를 사용했을 때의 가장 큰 장점은 `컴포넌트 업데이트 로직을 컴포넌트 바깥으로 빼낼 수 있다는 것이다.`

<br>

### 인풋 상태 관리하기

<br>

기존에 여러 개의 인풋을 사용할 때 useState를 여러 번 사용했지만 useReducer를 사용하면 기존에 클래스형 컴포넌트에서 input 태그에 name값을 할당하고, e.target.name을 참조하여 setState를 해준 것과 유사한 방식으로 작업을 처리할 수 있다.

<br>

```js
import React, { useReducer } from "react";

function reducer(state, action) {
    return {
        ...state,
        [action.name]: action.value,
    };
}

const Info = () => {
    const [state, dispatch] = useReducer(reducer, {
        name: "",
        nickname: "",
    });
    const { name, nickname } = state;

    const onChange = (e) => {
        dispatch(e.target); //useReducer에서의 액션은 어떤 값도 사용 가능하다. 따라서 이번 이벤트 객체가 지니고 있는 e.target 값 자체를 액션 값으로 사용했다.
    };

    return (
        <div>
            <div>
                <input name="name" value={name} onChange={onChange} />
                <input name="nickname" value={nickname} onChange={onChange} />
            </div>
            <div>
                <div>
                    <b>이름:</b> {name}
                </div>
                <div>
                    <b>닉네임:</b> {nickname}
                </div>
            </div>
        </div>
    );
};

export default Info;
```

<br>

---

## useMemo

<br>

useMemo를 사용하면 함수형 컴포넌트 내부에서 발생하는 연산을 최적화할 수 있다.

<br>

Average.js

```js
import React, { useState, useMemo } from "react";

const getAverage = (numbers) => {
    console.log("평균값 계산 중..");
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((a, b) => a + b);
    return sum / numbers.length;
};

const Average = () => {
    const [list, setList] = useState([]);
    const [number, setNumber] = useState("");

    const onChange = (e) => {
        setNumber(e.target.value);
    };

    const onInsert = (e) => {
        const nextList = list.concat(parseInt(number));
        setList(nextList);
        setNumber("");
    };

    const avg = useMemo(() => getAverage(list), [list]); //list 내용이 바뀔 때만 호출

    return (
        <div>
            <input value={number} onChange={onChange} />
            <button onClick={onInsert}>등록</button>
            <ul>
                {list.map((value, index) => (
                    <li key={index}>{value}</li>
                ))}
            </ul>
            <div>
                <b>평균값</b> {avg}
            </div>
        </div>
    );
};

export default Average;
```

<br>

---

## useCallback

usecallback 함수는 렌더링 성능을 최적화해야 하는 상황에서 사용하는데 함수를 재사용할 수 있다.

<br>

Average.js

```js
const onChange = useCallback((e) => {
    setNumber(e.target.value);
}, []); // 컴포넌트가 처음 렌더링될 때만 함수 생성

const onInsert = useCallback(
    (e) => {
        const nextList = list.concat(parseInt(number));
        setList(nextList);
        setNumber("");
    },
    [number, list]
);
```

<br>

useCallback의 첫 번째 파라미터에는 생성하고 싶은 함수를 넣고, 두 번째 파라미터에는 배열을 넣는다.
<br>
이 배열에는 `어떤 값이 바뀌었을 때 함수를 새로 생성해야 하는지` 명시해야 한다.
<br>
<br>
onChange처럼 비어 있는 배열을 넣게 되면 컴포넌트가 렌더링될 때 만들었던 함수를 계속해서 `재사용`하게 되며, onInsert처럼 배열 안에 number와 list를 넣게 되면 인풋 내용이 바뀌거나 새로운 항목이 추가될 때 새로 만들어진 함수를 사용하게 된다.
<br>
<br>
함수 내부에서 `상태 값에 의존해야 할 때`는 그 값을 반드시 `두 번째 파라미터안에 포함`시켜야 한다. 예를 들어 onChange의 경우 기존의 값을 조회하지 않고 바로 설정만 하기 때문에 배열이 비어있어도 상관없지만, onInsert는 기존의 number와 list를 조회해서 nextList를 생성하기 때문에 배열안에 number와 list를 꼭 넣어주어야 한다.

<br>

---

## useRef

useRef Hook은 함수형 컴포넌트에서 ref를 쉽게 사용할 수 있도록 해준다.

Average 컴포넌트에서 등록 버튼을 눌렀을 때 포커스가 인풋 쪽으로 넘어가도록 설정
<br>
<br>
Average.js

```js
const Average = () => {
    const [list, setList] = useState([]);
    const [number, setNumber] = useState("");
    const inputEl = useRef(null);

    const onChange = useCallback((e) => {
        setNumber(e.target.value);
    }, []); // 컴포넌트가 처음 렌더링될 때만 함수 생성

    const onInsert = useCallback(
        (e) => {
            const nextList = list.concat(parseInt(number));
            setList(nextList);
            setNumber("");
            inputEl.current.focus(); //useRef를 사용하여 ref를 설정하면 useRef를 통해 만든 객체 안의 current 값이 실제 엘리먼트를 가르킨다.
        },
        [number, list]
    );

    const avg = useMemo(() => getAverage(list), [list]); //list 내용이 바뀔 때만 호출

    return (
        <div>
            <input value={number} onChange={onChange} ref={inputEl} />
            <button onClick={onInsert}>등록</button>
            <ul>
                {list.map((value, index) => (
                    <li key={index}>{value}</li>
                ))}
            </ul>
            <div>
                <b>평균값</b> {avg}
            </div>
        </div>
    );
};
```

<br>

---

## Custom hooks

<br>

기존의 Info 컴포넌트에서 여러 개의 인풋을 관리하기 위해 useReducer로 작성했던 로직을 useInputs라는 Hook으로 따로 분리한다.

<br>

useInputs.js

```js
import { useReducer } from "react";

function reducer(state, action) {
    return {
        ...state,
        [action.name]: action.value,
    };
}

export default function useInputs(initialForm) {
    const [state, dispatch] = useReducer(reducer, initialForm);
    const onChange = (e) => {
        dispatch(e.target);
    };
    return [state, onChange];
}
```

Info.js

```js
import React from "react";
import useInputs from "./useInputs";

const Info = () => {
    const [state, onChange] = useInputs({
        name: "",
        nickname: "",
    });
    const { name, nickname } = state;

    return (
        <div>
            <div>
                <input name="name" value={name} onChange={onChange} />
                <input name="nickname" value={nickname} onChange={onChange} />
            </div>
            <div>
                <div>
                    <b>이름:</b> {name}
                </div>
                <div>
                    <b>닉네임:</b> {nickname}
                </div>
            </div>
        </div>
    );
};

export default Info;
```

<br>

---
