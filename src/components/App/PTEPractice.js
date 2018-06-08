import React, { Component } from 'react';
import HomePage from './../../pages/HomePage/HomePage'
import Header from './../../components/Layouts/Header'
import Footer from './../../components/Layouts/Footer'
import routes from './../../routes';

import StartQuestionPage from './../../components/Common/StartQuestionPage'
import { filter, includes, remove, orderBy as functionOrderBy } from 'lodash'
import { HashRouter, BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';

class PTEPractice extends Component {

	render() {

		return (

			<HashRouter>
				<div>
					<Header/>
					
					{this.showContentMenus(routes)}
				
					<Footer />
					<div className = "hiddenDiv"></div>
				</div>
			</HashRouter>


		);
	}


	showContentMenus = (routes) => {
		var result = null;
		if (routes.length > 0) {
		  result = routes.map((route, index) => {
			return <Route
			  key={index}
			  path={route.path}
			  exact={route.exact}
			  component={route.main}></Route>
		  })
		}
		return <Switch>
		  {result}
		</Switch>
	
	  }
}

export default PTEPractice;
