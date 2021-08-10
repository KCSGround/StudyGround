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
            [e.target.name]: e.target.value, // 객체 안에서 key를 []로 감싸면 그 안에 넣은 레퍼런스가 가리키는 실제 값이 key 값으로 사용된다.
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
