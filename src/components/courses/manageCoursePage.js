'use strict';

var React = require('react');
var Router = require('react-router');
var CourseForm = require('./courseForm');
var CourseActions = require('../../actions/courseActions');
var CourseStore = require('../../stores/courseStore');
var toastr = require('toastr');

var ManageAuthorPage = React.createClass({
	mixins: [
		Router.Navigation
	],
	statics: {
		willTransitionFrom: function(transition, component) {
			if(component.state.dirty && !confirm('Leave without saving?')) {
				transition.abort();
			}
		}
	},
	getInitialState: function () {
		return {
			author: { id: '', firstName: '', lastName: '' },
			errors: {},
			dirty: false
		};
	},
	componentWillMount: function () {
		var authorId = this.props.params.id;	// from the path '/author:id'

		if (authorId) {
			this.setState({ author: CourseStore.getAuthorById(authorId) });
		}
	},
	setAuthorState: function (event) {
		this.setState({ dirty: true });
		var field = event.target.name;
		var value = event.target.value;
		this.state.author[field] = value;
		return this.setState({ author: this.state.author });
	},
	courseFormIsValid: function () {
		var formIsValid = true;
		this.state.errors = {};		// clear any previous errors

		if (this.state.author.firstName.length < 3) {
			this.state.errors.firstName = 'First name must be at least 3 characters.';
			formIsValid = false;
		}

		if (this.state.author.lastName.length < 3) {
			this.state.errors.lastName = 'Last name must be at least 3 characters.';
			formIsValid = false;
		}

		this.setState({ errors: this.state.errors });
		return formIsValid;
	},
	saveAuthor: function (event) {
		event.preventDefault();

		if (!this.courseFormIsValid()) {
			return;
		}

		if (this.state.author.id) {
			CourseActions.updateAuthor(this.state.author);
		} else {
			CourseActions.createAuthor(this.state.author);
		}
		this.setState({ dirty: false });
		toastr.success('Author saved.');
		this.transitionTo('authors');
	},
	render: function () {
		return (
			<CourseForm
				author={this.state.author}
				onChange={this.setAuthorState}
				onSave={this.saveAuthor}
				errors={this.state.errors} />
		);
	}
});

module.exports = ManageAuthorPage;