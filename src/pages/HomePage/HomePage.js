import React, { Component } from 'react';
import SKillList from './../../components/SkillItems/SkillList';
import SkillItem from './../../components/SkillItems/SkillItem';
import { connect } from 'react-redux';
import axios from 'axios';
import callApi from './../../utils/apiCaller';
import * as skillname from './../../constants/ActionTypes';
var _ = require('lodash');
import {
    actGetCategoriesRequest,actGetCategories
} from './../../actions/index';
import SkillList from './../../components/SkillItems/SkillList';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        this.props.getCategories();
    }

    render() {
        const { categories } = this.props;
        return (
            <div className="row">
                <div className="container-fluid main_panel">
                    <div className="row">
                        <SKillList key={0} name={skillname.LISTENING}>
                            {this.showSkillItems(categories, skillname.LISTENING)}
                        </SKillList>
                        <SKillList key={1} name={skillname.READING}>
                            {this.showSkillItems(categories, skillname.READING)}
                        </SKillList>
                        <SKillList key={3} name={skillname.SPEAKING}>
                            {this.showSkillItems(categories, skillname.SPEAKING)}
                        </SKillList>
                        <SKillList key={2} name={skillname.WRITING}>
                            {this.showSkillItems(categories, skillname.WRITING)}
                        </SKillList>
                    </div>
                </div>
            </div>
        );

    }

    showSkillItems = (categories, skillName) => {
        var result = null;
        result = categories.map((category, index) => {
            var keys = _.keys(category);
            var values = _.values(category)
            var skillnameIndex = values.findIndex((value) => value.toString().toUpperCase() == skillName)
            if (skillnameIndex != -1)
                return (
                    <SkillItem key={index} category={category} />
                )
        })
        return result;
    }

}

const mapStateToProps = (state) => {
    return {
        categories: state.categories
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        getCategories: () => {
            dispatch(actGetCategoriesRequest())
        },


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);