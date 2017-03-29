'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var CourseActions = require('../../actions/courseActions');
var CourseStore = require('../../stores/courseStore');
var CourseList = require('./courseList');

var AuthorPage = React.createClass({
	getInitialState: function () {
		return {
			authors: CourseStore.getAllAuthors()
		};
	},
	componentWillMount: function() {
		CourseStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		CourseStore.removeChangeListener(this._onChange);
	},
	_onChange: function() {
		this.setState({ authors: CourseStore.getAllAuthors() });
	},
	render: function () {

		return (
			<div>
				<h1>Authors</h1>
				<Link to="addAuthor" className="btn btn-default">Add Author</Link>
				<CourseList authors={this.state.authors} />
			</div>
		);
	}
});

module.exports = AuthorPage;