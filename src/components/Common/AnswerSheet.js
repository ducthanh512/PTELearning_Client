import React, { Component } from 'react';

class AnswerSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }


  componentDidMount() {

  }
  checkStyle = categry => {
    switch (categry) {
      case "L01":
        return "incorrectAnswerPanelL01 floatleft";
      case "L02":
        return "incorrectAnswerPanelL02 floatleft";
      case "R05":
        return "incorrectAnswerPanelL01 floatleft";
      default: return "";
    }
  }

  render() {
    const { incorrectAnswers, category } = this.props;
    let emlIncorrectAnswer = [];
    const checkStyle = this.checkStyle(category);
    let answerTitle = "Correct answer(s): "
    if (incorrectAnswers.length == 0) answerTitle = "Your answer is correct! "
    incorrectAnswers.map((ans, index) => {
      emlIncorrectAnswer.push(<div key={index} className={checkStyle}>{ans}</div>)
    })

    return (
      <div className="card panelAnswerSheet">
        <div className="card-body">
          <h6 className="card-title">{answerTitle} </h6>
          {emlIncorrectAnswer}
        </div>
      </div>
    );

  }
}

export default AnswerSheet;