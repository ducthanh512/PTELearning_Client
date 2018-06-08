import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import SkillItem from './SkillItem';


class SkillList extends Component {
  render() {
    const {skill,name} = this.props;
    return (
      <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
        <div className="card">
          <div className="card-header deep-orange lighten-1 white-text lead">{name}</div>
          {this.props.children}
        </div>
      </div>


    );
  }
}

export default SkillList;
