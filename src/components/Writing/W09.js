import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import * as questioncodes from './../../constants/QuestionCodes';
import { connect } from 'react-redux';
import { actionGetCategoryByIdRequest } from './../../actions/index';
import getCategoryName from './../Common/CommonFunctions';

class W09 extends Component {
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

		var category = { "code": "W09" }
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
							<b><h5 className="thick ">You will have 20 minutes to plan, write and revise an essay about the topic below. Your response will be judged on how well you develop a position, organize your ideas, present supporting details, and control the elements of standard written English. You should write 200-300 words.</h5></b>
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
export default W09;