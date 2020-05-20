import React from "react";
import "./styles.css";

const Display = props => {
  return <input type="text" disabled id="display" value={props.displayValue} />;
};

class Keypad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayValue: "0",
      //resultValue: "",
      endOfNumber: false,
      numbersArray: [],
      operatorsArray: [],
      lastClicked: ''
    };
  }

  inputDigitHandler(digit) {
    if (this.state.endOfNumber) {
      this.setState({
        endOfNumber: false,
        displayValue: String(digit),
        lastClicked: digit
      });
    } else {
      if (this.state.displayValue === "0") {
        this.setState({
          displayValue: String(digit),
          lastclicked: digit
        });
      } else {
        this.setState({
          displayValue: this.state.displayValue + String(digit),
          lastclicked: digit
        });
      }
    }
  }

  dotHandler() {
    if (this.state.displayValue.indexOf(".") === -1) {
      this.setState({
        displayValue: this.state.displayValue + "."
      });
    }
  }

  operatorHandler(operator) {
    // if (this.state.resultValue) {
    //   this.setState(previousState => ({
    //     endOfNumber: false,
    //     operatorsArray: [operator],
    //     numbersArray: [this.state.resultValue]
    //   }));
    // }
    if(this.state.lastClicked === "=" ){
      //let overWriteLastOperator = this.state.operatorsArray[this.state.operatorsArray.length - 1];
      console.log('= operator');
      this.setState(previousState => ({
      lastClicked: operator,
      //endOfNumber: true,
      operatorsArray: [operator],
      numbersArray: [this.state.displayValue]
    }));
  } else {

      if(this.state.lastClicked === "*" || this.state.lastClicked === "-" || this.state.lastClicked === "/" || this.state.lastClicked === "+" ){
        //let overWriteLastOperator = this.state.operatorsArray[this.state.operatorsArray.length - 1];
        console.log('operator again');
        var updateOperatorsArray = this.state.operatorsArray;
        updateOperatorsArray[updateOperatorsArray.length-1] = operator;
        console.log(updateOperatorsArray);
        this.setState(previousState => ({
        lastClicked: operator,
        //endOfNumber: true,
        operatorsArray: updateOperatorsArray
        //numbersArray: [...previousState.numbersArray, this.state.displayValue]
        }));
      } else {
      this.setState(previousState => ({
      lastClicked: operator,
      endOfNumber: true,
      operatorsArray: [...previousState.operatorsArray, operator],
      numbersArray: [...previousState.numbersArray, this.state.displayValue]
      }));
    //console.log(this.state.numbersArray);
    //console.log(this.state.operatorsArray);
    }
  }
}
  equalHandler() {
    this.setState(
      previousState => ({
        endOfNumber: true,
        lastClicked: "=",
        numbersArray: [...previousState.numbersArray, this.state.displayValue]
      }),
      () => {
        var equation = "";
        //debugger;
        for (var i = 0; i < this.state.numbersArray.length; i++) {
          equation += this.state.numbersArray[i];
          if (this.state.numbersArray[i + 1]) {
            equation += this.state.operatorsArray[i];
          }
        }

        equation = eval(equation);
        if (!Number.isInteger(equation)) { // if the result is the number with floating point
          equation = eval(equation).toFixed(4); // to 4 numbers after .
          equation = parseFloat(equation); // cut off "000"'s
        }
        this.setState({
          displayValue: equation,
          resultValue: equation
        });
        console.log("endOfNumber: " + this.state.endOfNumber);
        //console.log(this.state.numbersArray);
      }
    );
  }

  clearHandler() {
    this.setState({
      displayValue: "0",
      lastClicked: "",
      //resultValue: "0",
      numbersArray: [],
      operatorsArray: []
    });
  }

  render() {
    return (
      <div id="Calculator">
        <Display displayValue={this.state.displayValue} />
        <button onClick={() => this.clearHandler()} id="clear">
          C
        </button>
        <button id="decimal" onClick={() => this.dotHandler()}>
          .
        </button>
        <button id="equals" onClick={() => this.equalHandler()}>
          =
        </button>
        <br />
        <button id="one" onClick={() => this.inputDigitHandler(1)}>
          1
        </button>
        <button id="two" onClick={() => this.inputDigitHandler(2)}>
          2
        </button>
        <button id="three" onClick={() => this.inputDigitHandler(3)}>
          3
        </button>
        <br />
        <button id="four" onClick={() => this.inputDigitHandler(4)}>
          4
        </button>
        <button id="five" onClick={() => this.inputDigitHandler(5)}>
          5
        </button>
        <button id="six" onClick={() => this.inputDigitHandler(6)}>
          6
        </button>
        <br />
        <button id="seven" onClick={() => this.inputDigitHandler(7)}>
          7
        </button>
        <button id="eight" onClick={() => this.inputDigitHandler(8)}>
          8
        </button>
        <button id="nine" onClick={() => this.inputDigitHandler(9)}>
          9
        </button>
        <button id="zero" onClick={() => this.inputDigitHandler(0)}>
          0
        </button>
        <br />
        <button id="divide" onClick={() => this.operatorHandler("/")}>
          /
        </button>
        <button id="subtract" onClick={() => this.operatorHandler("-")}>
          -
        </button>
        <button id="multiply" onClick={() => this.operatorHandler("*")}>
          *
        </button>
        <button id="add" onClick={() => this.operatorHandler("+")}>
          +
        </button>
      </div>
    );
  }
}

export default function App() {
  return (
    <div>
      <Keypad />
    </div>
  );
}
