import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import getCategoryName from './../Common/CommonFunctions';


class SkillItem extends Component {
  render() {
    const { category } = this.props;
    const categoryName = getCategoryName(category);
    return (
      <div className="card-body panelBackground">
        <h6 className="card-title">{categoryName}</h6>
        <p className="card-title">{category.numberOfQuestion} Questions</p>
        <Link
          to={`/category/${category.code}`}
          type="button"
          className=
          "btn btn-deep-orange waves-effect waves-light">Start</Link>

      </div>

    );
  }
}

export default SkillItem;
