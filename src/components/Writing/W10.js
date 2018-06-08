import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import * as questioncodes from './../../constants/QuestionCodes';
import { connect } from 'react-redux';
import { actionGetCategoryByIdRequest } from './../../actions/index';
import getCategoryName from './../Common/CommonFunctions';

class W10 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			questionText:'',
			answers: [],
			questions: [],
			currentQuestion: 0,
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

	onChange = (e) => {

		const target = e.target;
		const name = target.name;
		const value = target.value;
		this.setState({
			[name]: value
		})
	}



	render() {
		const { questions } = this.props;
		const {currentQuestion } = this.state;
		var questionText = questions[currentQuestion].content;

		var category = { "code": "W10" }
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
					<div className="row">
						<div className="txtWriteFromDictation">
							<b><h5 className="thick ">Read the passage below and summarize it using one sentence. Type your response in the box at the bottom of the screen. You have 10 minutes to finish this task. Your response will be judged on the quality of your writing and on how well your response presents the key points in the passage.</h5></b>
						</div>

						<div className="txtWriteFromDictation mt-5">
							<h6>{questionText}</h6>
						</div>

						<div className="txtWriteFromDictation">
							<div className="md-form">
							
								<textarea type="text" id="textareaPrefix" className="form-control borderTextArea" rows="5"></textarea>
								
							</div>
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
export default W10;