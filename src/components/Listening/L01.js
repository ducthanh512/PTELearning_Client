import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import AudioPlayer from './../Common/AudioPlayer';
import * as questioncodes from './../../constants/QuestionCodes';
import { actionGetCategoryByIdRequest } from './../../actions/index';
import getCategoryName from './../Common/CommonFunctions';
import AnswerSheet from './../Common/AnswerSheet';
var _ = require('lodash');
class L01 extends Component {
	constructor(props) {
		super(props);

		this.state = {
			checkAnswer: false,
			resultStatus: [],
			answerSheet: [],
			questionText: "",
			blanks: [],
			questionId: 0,
			questions: [],
			answerList: [],
			currentQuestion: 0,
			answers: [],
		}
	}

	componentDidMount() {
		let { currentQuestion } = this.state;
		const { questions } = this.props;
		var questionText = questions[currentQuestion].content;
		this.resetBlanks(questionText)
		this.setState({
			questionText,
		})
	}

	convertTextToQuestion = text => {
		var { blanks, resultStatus } = this.state;
		let elmL01 = [];
		let plainText = [];
		let count = 0;
		let previousIndex = 0;
		let blanktext = "";
		let elmTemp = "";
		let answerStatus = "mt-4";

		const indexplaces = [];
		[...text].map((c, index) => {
			if (c === '$') {
				count == 0
					? plainText.push(text.substring(0, index))
					: plainText.push(text.substring(previousIndex + 2, index))
				indexplaces.push(index);
				previousIndex = index;
				count++;
			}
		})
		plainText.push(text.substring(previousIndex + 2, text.length))

		plainText.map((plain, index) => {
			if (plain != '') {
				elmL01.push(plain);
				if (index < plainText.length - 1) {

					if (resultStatus.length > 0) {
						if (this.state.checkAnswer && resultStatus[index]) {
							answerStatus = 'mt-4 correctAns'
						}
						else if (this.state.checkAnswer && !resultStatus[index]) {
							answerStatus = 'mt-4 incorrectAns'
						}
						else {
							answerStatus = 'mt-4';
						}
					}
					blanktext = Object.keys(blanks[index])[0];
					elmTemp = <input className={answerStatus} key={blanktext} value={this.state[blanktext]} onChange={this.onChange} name={blanktext} />;
					elmL01.push(elmTemp);
				}
			}
		})


		return elmL01;
	}

	onChange = (e) => {

		var { blanks } = this.state;
		const target = e.target;
		const name = target.name;
		const value = target.value;
		blanks.map((blank) => {
			blank[name] = value;
		})
		this.setState({
			blanks
		})
	}

	sortObjectKeys = (obj) => {
		return Object.keys(obj).sort().reduce((acc, key) => {
			acc[key] = obj[key];
			return acc;
		}, {});
	}

	getThisQuestionAnswerSheet = () => {
		let { currentQuestion } = this.state;
		const { answers, questions } = this.props;
		currentQuestion = questions[currentQuestion];
		let answerSheet = [];
		answers.map((ans, index) => {
			if (ans.questionId === currentQuestion.id) {
				answerSheet.push(ans.content)
			}
		})
		return answerSheet;
	}

	onSave = (e) => {
		e.preventDefault();
		let { blanks } = this.state;
		let answerSheet = this.getThisQuestionAnswerSheet();
		let studentAnswer = {};
		blanks.map((blank, index) => {
			studentAnswer = { ...studentAnswer, ...blank }
		})
		studentAnswer = _.values(this.sortObjectKeys(studentAnswer));

		var resultStatus = this.checkAnswer(studentAnswer, answerSheet);
		this.setState({
			checkAnswer: true,
			resultStatus,
			answerSheet,
		})
	}

	checkAnswer = (studentAnswer, answerSheet) => {
		var result = [];
		answerSheet.map((answer, index) => {
			answer === studentAnswer[index] ? result.push(true) : result.push(false);
		})
		return result;
	}

	showAnswer = () => {
		let elmAnswer = "";
		let incorrectAnswers = [];
		const { checkAnswer, answerSheet, resultStatus } = this.state;
		if (checkAnswer) {
			resultStatus.map((status, index) => {
				if (!status) {
					incorrectAnswers.push(answerSheet[index]);
				}
			})
			elmAnswer = <AnswerSheet category="L01" incorrectAnswers={incorrectAnswers} />
		}
		return elmAnswer;

	}


	render() {
		const {questions} = this.props;
		let { answerSheet, answers, questionText,currentQuestion } = this.state;
		var category = { "code": "L01" }
		var categoryName = getCategoryName(category);
		let elmQuestionIndex = <div className="floatright"> Question ({currentQuestion+1}/{questions.length})</div>
		let btnPriviousStyle = "btn btn-primary btn-deep-orange waves-effect waves-light";
		let btnNextStyle = "btn btn-primary btn-deep-orange waves-effect waves-light";
		if(currentQuestion===questions.length-1) btnNextStyle = "btn btn-primary btn-deep-orange waves-effect waves-light disabled";
		if(currentQuestion===0) btnPriviousStyle = "btn btn-primary btn-deep-orange waves-effect waves-light disabled";
		return (
			<div className="card-body">

				<h3 className="card-title font-weight-bold text-uppercase ">{categoryName}{elmQuestionIndex}</h3>
				<hr />
				<div className="container">
					<div className="row">
						<div className="col-md-4 thirty"><AudioPlayer currentQuestion={currentQuestion} media = {questions[currentQuestion].media} waitingTime="5" /></div>
						<div className="col-md-8 seventy">
							<div className="mb-4 fontTitle"><h4>You will hear a recording. Type the missing words in each blank.</h4></div>
							<form onSubmit={this.onSave}>
								{this.convertTextToQuestion(questionText)}

								{this.showAnswer()}
								<div className="right">
									<button className="btn btn-outline-warning btn-rounded waves-effect" type="submit">Check Answers</button>
								</div>
							</form>
						</div>
					</div>
				</div>
				<div className="center_components mt-4">
					<hr />
					<a onClick={() => this.onMove('previous')} className={btnPriviousStyle}>Previous</a>
					<a onClick={() => this.onMove('next')} className={btnNextStyle}> Next </a>
				</div>
			</div>
		);

	}

	resetBlanks = questionText => {
		let count = 0;
		let blanks = [];
		[...questionText].map((c, index) => {
			if (c === '$') count++;
		})

		for (var i = 1; i <= count; i++) {
			var returnObj = {};
			returnObj["blank" + i] = '';
			blanks.push(returnObj);
		}

		this.setState({
			blanks,
		})
	}

	onMove = action => {
		let { currentQuestion } = this.state;
		action === 'previous' ? currentQuestion-- : currentQuestion++;
		const { questions } = this.props;
		var questionText = questions[currentQuestion].content;
		this.resetBlanks(questionText)
		this.setState({
			currentQuestion,
			questionText,
		})
	}
}



export default L01;