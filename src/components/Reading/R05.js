import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import AudioPlayer from './../Common/AudioPlayer';
import * as questioncodes from './../../constants/QuestionCodes';
import { connect } from 'react-redux';
import { actionGetCategoryByIdRequest } from './../../actions/index';
import getCategoryName from './../Common/CommonFunctions';
import AnswerSheet from './../Common/AnswerSheet';
var _ = require('lodash');
class R05 extends Component {
	constructor(props) {
		super(props);

		this.state = {
			checkAnswer: false,
			resultStatus: [],
			answerSheet: [],
			answerSheetTrue: [],
			questionText: "",
			blanks: [],
			questionId: 0,

			answers: [],
			questions: [],
			currentQuestion: 0,
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

	convertTextToQuestion = text => {
		var { blanks, resultStatus } = this.state;
		let elmL01 = [];
		let plainText = [];
		let count = 0;
		let previousIndex = 0;
		let blanktext = "";
		let elmTemp = "";
		let answerStatus = "txtBlank";

		let answerSheet = this.createAnswerSheet();

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

					//set color for the answer after click check button
					if (resultStatus.length > 0) {
						if (this.state.checkAnswer && resultStatus[index]) {
							answerStatus = 'txtBlank correctAns'
						}
						else if (this.state.checkAnswer && !resultStatus[index]) {
							answerStatus = 'txtBlank incorrectAns'
						}
						else {
							answerStatus = 'txtBlank';
						}
					}

					blanktext = _.keys(blanks[index])[0];
					//elmTemp = <input className={answerStatus} key={blanktext} value={this.state[blanktext]} onChange={this.onChange} name={blanktext} />;
					var options = _.keys(answerSheet[index]);
					var emlOption = [];
					emlOption.push(<option key={blanktext} value=""></option>);
					options.map((option, optionIndex) => {
						emlOption.push(<option key={optionIndex} value={option}>{option}</option>);
					})
					elmTemp = <select className={answerStatus} key={blanktext} value={this.state[blanktext]} onChange={this.onChange} name={blanktext}>
						{emlOption}
					</select>

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
			blanks,
			[name]:value,
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
		const { blanks } = this.state;
		let answerSheet = this.createAnswerSheet();

		let studentAnswer = {};
		blanks.map((blank, index) => {
			studentAnswer = { ...studentAnswer, ...blank }
		})
		studentAnswer = _.values(this.sortObjectKeys(studentAnswer));


		var answerSheetTrue = [];
		answerSheet.map((allAnswer) => {
			var keys = _.keys(allAnswer);
			var values = _.values(allAnswer);
			values.map((value, index) => {
				if (value) {
					answerSheetTrue.push(keys[index]);
				}
			})

		})

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
			elmAnswer = <AnswerSheet category="R05" incorrectAnswers={incorrectAnswers} />
		}
		return elmAnswer;

	}


	render() {

		var category = { "code": "R05" }
		var categoryName = getCategoryName(category);

		const { questions } = this.props;
		let { answerSheet, answers, questionText, currentQuestion } = this.state;
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
					<div className="row lineHeight">
					<div className="mb-4 fontTitle"><h4>Below is a text with blanks. Click on each blank, a list of choices will appear. Select the appropriate answer choice for each blank.</h4></div>
						<form onSubmit={this.onSave}>
							{this.convertTextToQuestion(questionText)}

							{this.showAnswer()}
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
		let { currentQuestion,blanks } = this.state;
		action === 'previous' ? currentQuestion-- : currentQuestion++;
		const { questions } = this.props;
		var questionText = questions[currentQuestion].content;
		this.resetBlanks(questionText)
		this.setState({
			currentQuestion,
			questionText,
			checkAnswer:false,
			
		})
	}
}
export default R05;