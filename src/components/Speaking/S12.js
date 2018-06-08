import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import AudioRecoder from './../Common/AudioRecorder';
import * as questioncodes from './../../constants/QuestionCodes';
import { connect } from 'react-redux';
import { actionGetCategoryByIdRequest } from './../../actions/index';
import getCategoryName from './../Common/CommonFunctions';
import AudioPlayer from '../Common/AudioPlayer';
import AnswerSheet from './../Common/AnswerSheet';

var _ = require('lodash');
class S12 extends Component {
	constructor(props) {
		super(props);

		this.state = {
			answers: [],
			questions: [],
			currentQuestion: 0,
			checkAnswer : false,
			resultStatus: false,
		}
	}

	componentDidMount() {

		this.setState({

		})

	}

	onSave = (e) => {
		e.preventDefault();
		const {answer } = this.state;
		let answerSheet = this.getThisQuestionAnswerSheet();

		this.setState({
			checkAnswer: true,
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
			elmAnswer = <AnswerSheet category="S12" incorrectAnswers={incorrectAnswers} />
		}
		return elmAnswer;

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
	render() {

		let { answer, checkAnswer, resultStatus, currentQuestion } = this.state;
		const { questions, answers } = this.props;
		const { questionText } = this.state;
		var category = { "code": "S12" }
		var categoryName = getCategoryName(category);

		var answerSheet = this.getThisQuestionAnswerSheet();

		let elmQuestionIndex = <div className="floatright"> Question ({currentQuestion + 1}/{questions.length})</div>

		let btnPriviousStyle = "btn btn-primary btn-deep-orange waves-effect waves-light";
		let btnNextStyle = "btn btn-primary btn-deep-orange waves-effect waves-light";
		if (currentQuestion === questions.length - 1) btnNextStyle = "btn btn-primary btn-deep-orange waves-effect waves-light disabled";
		if (currentQuestion === 0) btnPriviousStyle = "btn btn-primary btn-deep-orange waves-effect waves-light disabled";

		return (


			<div className="card-body">
				<h3 className="card-title font-weight-bold text-uppercase">{categoryName}{elmQuestionIndex}</h3>
				<hr />
				<div className="container ">
				<div className="mb-4 fontTitle">
								<h4>You will hear a sentence. Please repeat the sentence exactly as you hear it. You will hear the sentence only once.</h4></div>
					<div className="row recoderParent">
						<div className="txtWriteFromDictation">
							<div className="recoderParent">
							<AudioPlayer isWider={true}  currentQuestion={currentQuestion} media = {questions[currentQuestion].media} waitingTime="1" />
							</div>
						</div>
						<div className="recoderParent mt-5">
							<AudioRecoder currentQuestion={currentQuestion} waitingTime="10" />
						</div>


					</div>
					<div className="marginBottom">
					{this.showAnswer()}
						<form onSubmit={this.onSave}>
							<div className="right">
								<button className="btn btn-outline-warning btn-rounded waves-effect" type="submit">Check Answers</button>
							</div>
						</form>
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
	onMove = action => {
		let { currentQuestion } = this.state;
		action === 'previous' ? currentQuestion-- : currentQuestion++;
		this.setState({
			currentQuestion,
			checkAnswer: false,
		})
	}
}
export default S12;