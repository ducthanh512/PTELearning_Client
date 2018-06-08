import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import AudioRecoder from './../Common/AudioRecorder';
import * as questioncodes from './../../constants/QuestionCodes';
import { connect } from 'react-redux';
import { actionGetCategoryByIdRequest } from './../../actions/index';
import getCategoryName from './../Common/CommonFunctions';


var _ = require('lodash');
class S11 extends Component {
	constructor(props) {
		super(props);

		this.state = {
			questionText:'',
			answers: [],
			questions: [],
			currentQuestion: 0,
			checkAnswer:false,
		}
	}

	componentDidMount() {
	
		let { currentQuestion } = this.state;
		const { questions } = this.props;
		var questionText = questions[currentQuestion].content;
		this.setState({
			questionText,
		})

	}



	render() {

		const { questions } = this.props;
		const { answers, currentQuestion } = this.state;
		var questionText = questions[currentQuestion].content;
		var category = { "code": "S11" }
		var categoryName = getCategoryName(category);

		let elmQuestionIndex = <div className="floatright"> Question ({currentQuestion+1}/{questions.length})</div>

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
								<h4>Look at the text below. You must read this text aloud as natually and clearly as possible.</h4></div>
					<div className="row"> 
						<div className="recoderParent">
							<AudioRecoder currentQuestion={currentQuestion} waitingTime="3"/>
						</div>
						<div className="mt-5">
								{questionText}
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

	onMove = action => {
		let { currentQuestion } = this.state;
		action === 'previous' ? currentQuestion-- : currentQuestion++;
		this.setState({
			currentQuestion,
			checkAnswer: false,
		})
	}
}
export default S11;