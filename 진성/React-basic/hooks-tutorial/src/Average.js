import React, { useState, useMemo, useCallback, useRef } from "react";

const getAverage = (numbers) => {
    console.log("평균값 계산 중..");
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((a, b) => a + b);
    return sum / numbers.length;
};

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

export default Average;
