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
