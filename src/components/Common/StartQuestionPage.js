import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import getCategoryName from './../Common/CommonFunctions';
import { connect } from 'react-redux';

class StartQuestionPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			questionId: 0,
			category: null,
			categoryCode: '',
		}
	}

	componentDidMount() {
		var { match } = this.props;
		if (match) {
			var categoryCode = match.params.code;
			this.setState({
				categoryCode,
			})
			//this.props.actGetCategoryById(id);
		}

	}

	render() {
		const { categoryCode } = this.state;

		var category = { "code": categoryCode }
		var categoryName = getCategoryName(category);
		const url = "/PracticePage/" + category.code + "/";
		return (

			<div className="card text-left practice_layout">
				<div className="card-body">
					<h3 className="card-title font-weight-bold text-uppercase">{categoryName}</h3>
					<hr />
					<p className="card-text">Please click Start when you are ready to begin the activity.</p>
				</div>
				<div className="center_components">
					<hr />
					<Link to="/" className="btn btn-primary btn-deep-orange waves-effect waves-light" to="/">Back</Link>

					<Link to={url} className="btn btn-primary btn-deep-orange waves-effect waves-light" href="#" onClick={this.handleStartQuestion} >Start</Link>
				</div>
			</div>

		);

	}
}

export default StartQuestionPage;