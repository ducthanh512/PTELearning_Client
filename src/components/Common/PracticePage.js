import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import AudioPlayer from './../Common/AudioPlayer';
import * as questioncodes from './../../constants/QuestionCodes';
import getCategoryName from './../Common/CommonFunctions';
import L01 from './../Listening/L01';
import L02 from './../Listening/L02';
import R05 from './../Reading/R05';
import S11 from './../Speaking/S11';
import S12 from './../Speaking/S12';
import W09 from './../Writing/W09';
import W10 from './../Writing/W10';
import R06 from './../Reading/R06';
import { connect } from 'react-redux';
import { actGetQuestionByCodeRequest, actGetAnswerByCodeRequest } from './../../actions/index';
var _ = require('lodash');
class PracticePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			questions: [],
			answer: [],
		}
	}

	getPacticePTE = (code, questions,answers) => {
		switch (code) {
			case "L01":
				//var questionText = "Political activists and $1 across a broad array of ideologies, from libertarians to social liberals to the hard left, are intrigued, or even $2 . The Cato Institute, an American think-tank which spends much of its time calling for a smaller state, $3 a sympathetic analysis of the policy in 2015. It feels that, though it might prefer a world with no government $4 , a basic income is the $5";
				return <L01 questions={questions} answers = {answers}></L01>
			case "L02":
				return <L02 questions={questions} answers = {answers}></L02>
			case "R05":
				return <R05 questions={questions} answers = {answers}></R05>
			case "S11":
				return <S11 questions={questions}></S11>
			case "S12":
				return <S12 questions={questions} answers = {answers}></S12>
			case "W09":
				return <W09 questions={questions} answers = {answers}></W09>
			case "W10":
				return <W10 questions={questions} answers = {answers}></W10>
			case "R06":
				return <R06 questions={questions} answers = {answers}></R06>
			default: return "404! Page Not Found";
		}
	}

	componentDidMount() {
		
		var { match } = this.props;
		
		if (match) {
			const code = match.params.code;
			this.props.getQuestionBYCode(code);
			this.props.getAnswerByCode(code);
		}
	}


	render() {
		let elmPractice = "";
		var { match, questions, answers } = this.props;
		if (match) {
			const code = match.params.code;
	
			questions.length > 0 
			? elmPractice = this.getPacticePTE(code, questions, answers)
			: elmPractice = <h3>These questions are coming soon !</h3>

				

		}


		return (
			<div className="card text-left practice_layout">
				{elmPractice}

			</div>

		);

	}
}

const mapStateToProps = (state) => {
	return {
		questions: state.questions,
		answers: state.answers,
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		getQuestionBYCode: (code) => {
			dispatch(actGetQuestionByCodeRequest(code))
		},

		getAnswerByCode: (code) => {
			dispatch(actGetAnswerByCodeRequest(code))
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(PracticePage);