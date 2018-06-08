import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import AudioPlayer from './../Common/AudioPlayer';
import * as questioncodes from './../../constants/QuestionCodes';
import { connect } from 'react-redux';
import { actionGetCategoryByIdRequest } from './../../actions/index';
import getCategoryName from './../Common/CommonFunctions';
import AnswerSheet from './../Common/AnswerSheet';
var _ = require('lodash');
class R06 extends Component {
	constructor(props) {
		super(props);

		this.state = {
			checkAnswer: false,
			resultStatus: [],
			answerSheet: [],
			answerSheetTrue: [],
			questionId: 0,
			answer: "",
			questionText: "",
			subQuestion: "",
			blanks: [],

			answers: [],
			questions: [],
			currentQuestion: 0,
			
		}
	}

	componentDidMount() {
		let { currentQuestion } = this.state;
		const { questions } = this.props;
		var questionText = questions[currentQuestion].content;
		var subQuestion = questions[currentQuestion].subQuestion;
		
		this.resetBlanks(questionText)
		this.setState({
			questionText,
			subQuestion
		})

	}

	createAnswerSheet = () => {
		let { currentQuestion } = this.state;
		const { answers, questions } = this.props;
		currentQuestion = questions[currentQuestion];
		let answerSheet = [];
		let groupId = [];
		answers.map((ans, index) => {
			if (ans.questionId === currentQuestion.id) {
				var findId = groupId.findIndex((id)=>id===ans.groupId)
				if(findId==-1){
					groupId.push(ans.groupId);
				}
			}
		})

		groupId.map((id)=>{
			var returnObj = {};
			answers.map((ans, index) => {
				if (ans.questionId === currentQuestion.id) {
					if(ans.groupId===id){
						returnObj[ans.content] = ans.status;
					}
				}
			})
			answerSheet.push(returnObj);
		})

		return answerSheet;

	}

	showQuestions = () => {
		const {blanks } = this.state;
		let answerSheet = this.createAnswerSheet();
		
		var answerSheetTrue = _.values(answerSheet[0])
		let emlCheckbox = [];
		let answerStatus = "mt-4";
		const keys = _.keys(answerSheet[0]);
		const values = _.values(answerSheet[0]);
		let blanktext = "";
		
		keys.map((key, index) => {

			if (answerSheetTrue.length > 0) {
				if (this.state.checkAnswer && answerSheetTrue[index]) {
					answerStatus = 'mt-4 correctAns'
				}
				else if (this.state.checkAnswer && !answerSheetTrue[index]) {
					answerStatus = 'mt-4 incorrectAns'
				}
				else {
					answerStatus = 'mt-4';
				}
			}

		
			if(blanks.length>=keys.length){
		
				blanktext = Object.keys(blanks[index])[0];
				emlCheckbox.push(
					<li className= {answerStatus} key = {index}>
						<input key={index} type="checkbox" className="filled-in form-check-input" onChange={this.onChange} value={this.state[blanktext]} name={blanktext} />{key}
						</li>
						
				)
			}
			
		

		})
		return emlCheckbox;
	}

	onChange = (e) => {
 		const {blanks} = this.state;
		const target = e.target;
		const name = target.name;
		const value = target.type === 'checkbox' ? target.checked : target.value;

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
	onSave = (e) => {
		e.preventDefault();
		const { blanks, answerSheet } = this.state;
		let studentAnswer = {};
		blanks.map((blank, index) => {
			studentAnswer = { ...studentAnswer, ...blank }
		})
		studentAnswer = _.values(this.sortObjectKeys(studentAnswer));


		var answerSheetTrue = _.values(answerSheet[0])

	
		var resultStatus = this.checkAnswer(studentAnswer, answerSheetTrue);
		this.setState({
			checkAnswer: true,
			resultStatus,
			answerSheetTrue
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
		const { checkAnswer, answerSheet, answerSheetTrue, resultStatus } = this.state;
		if (checkAnswer) {
			resultStatus.map((status, index) => {
				if (!status) {
					incorrectAnswers.push(answerSheetTrue[index]);
				}
			})
			
			//elmAnswer = <AnswerSheet category="R06" incorrectAnswers={incorrectAnswers} />
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
		const { answer, checkAnswer, resultStatus, questionText, subQuestion,answers, currentQuestion } = this.state;
		const { questions } = this.props;
		var category = { "code": "R06" }
		var categoryName = getCategoryName(category);
		let answerStatusStyle = this.checkAnswerStatusStyle(checkAnswer,resultStatus);
	

		let elmQuestionIndex = <div className="floatright"> Question ({currentQuestion+1}/{questions.length})</div>
		let btnPriviousStyle = "btn btn-primary btn-deep-orange waves-effect waves-light";
		let btnNextStyle = "btn btn-primary btn-deep-orange waves-effect waves-light";
		if(currentQuestion===questions.length-1) btnNextStyle = "btn btn-primary btn-deep-orange waves-effect waves-light disabled";
		if(currentQuestion===0) btnPriviousStyle = "btn btn-primary btn-deep-orange waves-effect waves-light disabled";


		return (
			<div className="card-body">
				<h3 className="card-title font-weight-bold text-uppercase">{categoryName}{elmQuestionIndex}</h3>
				<hr />
				<div className="container">
					<div className="row">
						<div className="col-md-6 fifthyLeft"><p>{questionText}</p></div>
						<div className="col-md-6 fifthyRight">
							<h5 className="txtWriteFromDictation">Read the text and answer the question by selecting all the correct responses. You will need to select more than one response.</h5>

							<h6 className="txtWriteFromDictation mt-5">{subQuestion}</h6>
							<form onSubmit={this.onSave}>


								<div id="checkboxes txtWriteFromDictation">
									<ul>
										
										{this.showQuestions()}
									</ul>
								</div>

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
		let { currentQuestion } = this.state;
		let blanks = [];
		let answerSheet = this.createAnswerSheet();
		var count = _.keys(answerSheet[0]).length;
		for (var i = 1; i <= 9; i++) {
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
		var subQuestion = questions[currentQuestion].subQuestion;
		this.resetBlanks(questionText)
		this.setState({
			currentQuestion,
			questionText,
			subQuestion,
			checkAnswer:false,
		})
	}
}


export default R06;