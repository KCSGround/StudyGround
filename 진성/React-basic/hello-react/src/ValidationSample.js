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
        this.input.focus(); // 검증하기 버튼을 누른후 포커스가 input으로 넘어간다. (ref 사용)
    };

    render() {
        return (
            <div>
                <input
                    ref={(ref) => (this.input = ref)}
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    className={this.state.clicked ? (this.state.validation ? "success" : "failure") : ""}
                />
                <button onClick={this.handleButtonClick}>검증하기</button>
            </div>
        );
        //clicked와 validation에 따라 클래스 네임을 success, failure로 지정하여 input의 background-color가 바뀐다.
    }
}
export default ValidationSample;
