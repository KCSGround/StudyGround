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

export default IterationSample;
