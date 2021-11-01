import { useState } from "react";
import "./styles.css";

import calculator from "../calculatorFunc";

const Calculator = () => {
    const [text, setText] = useState("");
    const [result, setResult] = useState("0");

    const handleSubmit = (evt) => {
        evt.preventDefault();
        let total = calculator(text);
        setText("");
        setResult(total);
    };

    const handleInput = (evt) => {
        evt.preventDefault();
        setText(text + evt.target.value);
    };

    const handleClear = () => {
        setText("");
        setResult("0");
    };

    return (
        <div className="calculator">
            <form onSubmit={handleSubmit}>
                <input
                    className="input"
                    type="text"
                    onChange={handleInput}
                    value={text ? text : result}
                    autoFocus
                ></input>
            </form>

            <div className="all__buttons">
                <button onClick={handleClear} className="button clear">
                    C
                </button>
                <button
                    onClick={handleInput}
                    value="("
                    className="button operand"
                >
                    (
                </button>
                <button
                    onClick={handleInput}
                    value=")"
                    className="button operand"
                >
                    )
                </button>
                <button
                    onClick={handleInput}
                    value="/"
                    className="button operand"
                >
                    /
                </button>
                <button onClick={handleInput} value="7" className="button">
                    7
                </button>
                <button onClick={handleInput} value="8" className="button">
                    8
                </button>
                <button onClick={handleInput} value="9" className="button">
                    9
                </button>
                <button
                    onClick={handleInput}
                    value="*"
                    className="button operand"
                >
                    x
                </button>
                <button onClick={handleInput} value="4" className="button">
                    4
                </button>
                <button onClick={handleInput} value="5" className="button">
                    5
                </button>
                <button onClick={handleInput} value="6" className="button">
                    6
                </button>
                <button
                    onClick={handleInput}
                    value="-"
                    className="button operand"
                >
                    -
                </button>
                <button onClick={handleInput} value="1" className="button">
                    1
                </button>
                <button onClick={handleInput} value="2" className="button">
                    2
                </button>
                <button onClick={handleInput} value="3" className="button">
                    3
                </button>
                <button
                    onClick={handleInput}
                    value="+"
                    className="button operand"
                >
                    +
                </button>
                <button onClick={handleInput} value="0" className="button zero">
                    0
                </button>
                <button onClick={handleInput} value="." className="button">
                    .
                </button>
                <button onClick={handleSubmit} className="button operand">
                    =
                </button>
            </div>
        </div>
    );
};

export default Calculator;
