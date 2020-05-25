import React from "react";
import "./styles.css";

const Display = props => {
  return (
  <tr>
            <td colspan="4">
            <input type="text" readonly id="display" className="form-control" value={props.displayValue} />
            </td>
  </tr>
  )

};

class Keypad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayValue: "0",
      negativeNum: false,
      endOfNumber: false,
      numbersArray: [],
      operatorsArray: [],
      lastClicked: ""
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
          lastClicked: digit
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
    if (this.state.lastClicked === "=") {
      this.setState(previousState => ({
        lastClicked: operator,
        operatorsArray: [operator],
        numbersArray: [this.state.displayValue]
      }));
    } else {
      if (
        this.state.operatorsArray.length === 0 &&
        this.state.displayValue === "0"
      ) {
        //console.log("empty numbers array");
        if (operator === "-") {
          this.setState({
            negativeNum: true,
            lastClicked: operator
          });
        }
      } else {
        if (
          this.state.lastClicked === "*" ||
          this.state.lastClicked === "/" ||
          this.state.lastClicked === "+" ||
          this.state.lastClicked === "-"
        ) {
          if (
            operator === "*" ||
            operator === "/" ||
            (operator === "+" && this.state.lastClicked === "-")
          ) {
            this.setState({
              negativeNum: false,
              lastClicked: operator
            });
          }
          if (operator === "-") {
            this.setState({
              negativeNum: true,
              lastClicked: operator
            });
          } else {
            var updateOperatorsArray = this.state.operatorsArray;
            updateOperatorsArray[updateOperatorsArray.length - 1] = operator;
            this.setState(previousState => ({
              lastClicked: operator,
              operatorsArray: updateOperatorsArray
            }));
          }
        } else {
          var currentValue = this.state.displayValue;
          if (this.state.negativeNum) {
            currentValue = "-" + this.state.displayValue;
          }
          this.setState(previousState => ({
            lastClicked: operator,
            endOfNumber: true,
            negativeNum: false,
            operatorsArray: [...previousState.operatorsArray, operator],
            numbersArray: [...previousState.numbersArray, currentValue]
          }));
        }
      }
    }
  }
  equalHandler() {
    var currentValue = this.state.displayValue;
    if (this.state.negativeNum) {
      currentValue = "-" + currentValue;
    }
    this.setState(
      previousState => ({
        endOfNumber: true,
        lastClicked: "=",
        numbersArray: [...previousState.numbersArray, currentValue]
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
        if (!Number.isInteger(equation)) {
          // if the result is the number with floating point
          equation = eval(equation).toFixed(4); // to 4 numbers after .
          equation = parseFloat(equation); // cut off "000"'s
        }
        this.setState({
          displayValue: equation
        });
      }
    );
  }

  clearHandler() {
    this.setState({
      displayValue: "0",
      lastClicked: "",
      negativeNum: false,
      numbersArray: [],
      operatorsArray: []
    });
  }

  render() {
    return (
      <div id="Calculator">
        <table className="table table-dark">
          <thead>
            <Display displayValue={this.state.displayValue} />
          </thead>
          <tbody>
            <tr>
              <td colspan="3"><button type="button" id="clear" onClick={() => this.clearHandler()} className="btn btn-danger btn-block">C</button></td>
              <td><button id="divide" onClick={() => this.operatorHandler("/")} type="button" className="btn btn-warning btn-block">/</button></td>
            </tr>
            <tr>
              <td><button id="seven" onClick={() => this.inputDigitHandler(7)} type="button" className="btn btn-light btn-block">7</button></td>
              <td><button id="eight" onClick={() => this.inputDigitHandler(8)} type="button" className="btn btn-light btn-block">8</button></td>
              <td><button id="nine" onClick={() => this.inputDigitHandler(9)} type="button" className="btn btn-light btn-block">9</button></td>
              <td><button id="multiply" onClick={() => this.operatorHandler("*")} type="button" className="btn btn-warning btn-block">*</button></td>
            </tr>
            <tr>
              <td><button id="four" onClick={() => this.inputDigitHandler(4)} type="button" className="btn btn-light btn-block">4</button></td>
              <td><button id="five" onClick={() => this.inputDigitHandler(5)} type="button" className="btn btn-light btn-block">5</button></td>
              <td><button id="six" onClick={() => this.inputDigitHandler(6)} type="button" className="btn btn-light btn-block">6</button></td>
              <td><button id="subtract" onClick={() => this.operatorHandler("-")} type="button" className="btn btn-warning btn-block">-</button></td>
            </tr>
            <tr>
              <td><button id="one" onClick={() => this.inputDigitHandler(1)} type="button" className="btn btn-light btn-block">1</button></td>
              <td><button id="two" onClick={() => this.inputDigitHandler(2)} type="button" className="btn btn-light btn-block">2</button></td>
              <td><button id="three" onClick={() => this.inputDigitHandler(3)} type="button" className="btn btn-light btn-block">3</button></td>
              <td><button id="add" type="button" onClick={() => this.operatorHandler("+")} className="btn btn-warning btn-block">+</button></td>
            </tr>
            <tr>
              <td colspan="2"><button id="zero" onClick={() => this.inputDigitHandler(0)} type="button" className="btn btn-light btn-block">0</button></td>
              <td><button id="decimal" onClick={() => this.dotHandler()} type="button" className="btn btn-light btn-block">.</button></td>
              <td><button id="equals" onClick={() => this.equalHandler()} type="button" className="btn btn-success btn-block">=</button></td>
            </tr>
          </tbody>
        </table>
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
