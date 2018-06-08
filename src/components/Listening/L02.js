import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import AudioPlayer from './../Common/AudioPlayer';
import * as questioncodes from './../../constants/QuestionCodes';
import { connect } from 'react-redux';
import { actionGetCategoryByIdRequest } from './../../actions/index';
import getCategoryName from './../Common/CommonFunctions';
import AnswerSheet from './../Common/AnswerSheet';
var _ = require('lodash');
class L02 extends Component {
	constructor(props) {
		super(props);

		this.state = {
			checkAnswer: false,
			resultStatus: false,
			answerSheet: "",
			questionId: 0,
			answer: "",

			answers: [],
			questions: [],
			currentQuestion: 0,
		}
	}

	onChange = (e) => {

		const target = e.target;
		const name = target.name;
		const value = target.value;
		this.setState({
			[name]: value
		})
	}


	getThisQuestionAnswerSheet = () => {
		let { currentQuestion } = this.state;
		const { answers, questions } = this.props;
		currentQuestion = questions[currentQuestion];
		let answerSheet = [];
		answers.map((ans, index) => {
			if (ans.questionId === currentQuestion.id) {
				answerSheet = ans.content;
			}
		})
		return answerSheet;
	}

	onSave = (e) => {
		e.preventDefault();
		const {answer } = this.state;
		let answerSheet = this.getThisQuestionAnswerSheet();

		this.setState({
			checkAnswer: true,
			resultStatus: answerSheet === answer,
			answerSheet,
		})
	}

	showAnswer = () => {
		let elmAnswer = "";
		let incorrectAnswers = [];
		const { checkAnswer, answerSheet, resultStatus } = this.state;
		if (checkAnswer) {
			if (!resultStatus) {
				incorrectAnswers.push(answerSheet);
			}
			elmAnswer = <AnswerSheet category="L02" incorrectAnswers={incorrectAnswers} />
		}
		return elmAnswer;

	}

	checkAnswerStatusStyle = (checkAnswer,resultStatus) => {
		let answerStatusStyle = 'txtWriteFromDictation'
		if (checkAnswer && resultStatus) {
			answerStatusStyle += ' correctAns'
		}
		else if (checkAnswer && !resultStatus) {
			answerStatusStyle += ' incorrectAns'
		}
		else {
			answerStatusStyle = 'txtWriteFromDictation';
		}
		return answerStatusStyle;

	}
	render() {

		let { answer, checkAnswer, resultStatus,answerSheet, answers, currentQuestion  } = this.state;
		const { questions } = this.props;
		var category = { "code": "L02" }
		var categoryName = getCategoryName(category);
		let answerStatusStyle = this.checkAnswerStatusStyle(checkAnswer,resultStatus);
		let elmQuestionIndex = <div className="floatright"> Question ({currentQuestion+1}/{questions.length})</div>

		let btnPriviousStyle = "btn btn-primary btn-deep-orange waves-effect waves-light";
		let btnNextStyle = "btn btn-primary btn-deep-orange waves-effect waves-light";
		if (currentQuestion === questions.length - 1) btnNextStyle = "btn btn-primary btn-deep-orange waves-effect waves-light disabled";
		if (currentQuestion === 0) btnPriviousStyle = "btn btn-primary btn-deep-orange waves-effect waves-light disabled";

		return (
			<div className="card-body">
				<h3 className="card-title font-weight-bold text-uppercase">{categoryName}{elmQuestionIndex}</h3>
				<hr />
				<div className="container">
					<div className="row">
						<div className="col-md-4 thirty"><AudioPlayer currentQuestion={currentQuestion} media={questions[currentQuestion].media} waitingTime="5" /></div>
						<div className="col-md-8 seventy">
							<div className="mb-4 fontTitle">
								<h4>You will hear a sentence. Type the sentence in the box below exactly as you hear it. Write as much of the sentence as you can. You will hear the sentence only once.</h4></div>
							<form onSubmit={this.onSave}>
								<input className={answerStatusStyle} key="L02" value={answer} onChange={this.onChange} name='answer' />

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

		this.setState({
			answerSheet:'',
		})
	}

	onMove = action => {
		let { currentQuestion } = this.state;
		action === 'previous' ? currentQuestion-- : currentQuestion++;
		this.setState({
			currentQuestion,
			checkAnswer: false,
		})
	}
}
export default L02;