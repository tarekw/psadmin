'use strict';

var React = require('react');
var Router = require('react-router');
var CourseForm = require('./courseForm');
var CourseActions = require('../../actions/courseActions');
var CourseStore = require('../../stores/courseStore');
var AuthorStore = require('../../stores/authorStore');
var toastr = require('toastr');

var ManageCoursePage = React.createClass({
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
			authors: [],
			course: { id: '', title: '', author: { id: '', name: '' }, length: '', category: '' },
			errors: {},
			dirty: false
		};
	},
	componentWillMount: function () {
		var courseId = this.props.params.id;	// from the path '/course:id'
		var allAuthors = AuthorStore.getAllAuthors();
		if (courseId) {
			this.setState({ authors: allAuthors, course: CourseStore.getCourseById(courseId) });
		} else {
			var course = this.state.course;
			course.author.id = allAuthors[0].id;
			course.author.name = allAuthors[0].firstName + ' ' + allAuthors[0].lastName;
			this.setState({ authors: allAuthors, course: course });
		}
	},
	setCourseState: function (event) {
		this.setState({ dirty: true });

		var field = event.target.name;
		var value = event.target.value;

		if(event.target.name === 'author') {
			var author = AuthorStore.getAuthorById(value);
			this.state.course[field].id = value;
			this.state.course[field].name = author.firstName + ' ' + author.lastName;
		} else {
			this.state.course[field] = value;			
		}

		return this.setState({ course: this.state.course });
	},
	courseFormIsValid: function () {
		var formIsValid = true;
		this.state.errors = {};		// clear any previous errors

		if (this.state.course.title.length < 3) {
			this.state.errors.title = 'Title must be at least 3 characters.';
			formIsValid = false;
		}

		if (this.state.course.category.length < 3) {
			this.state.errors.category = 'Category must be at least 3 characters.';
			formIsValid = false;
		}

		this.setState({ errors: this.state.errors });
		return formIsValid;
	},
	saveCourse: function (event) {
		event.preventDefault();

		if (!this.courseFormIsValid()) {
			return;
		}

		if (this.state.course.id) {
			CourseActions.updateCourse(this.state.course);
		} else {
			CourseActions.createCourse(this.state.course);
		}
		this.setState({ dirty: false });
		toastr.success('Course saved.');
		this.transitionTo('courses');
	},
	render: function () {
		return (
			<CourseForm
				authors={this.state.authors}
				course={this.state.course}
				onChange={this.setCourseState}
				onSave={this.saveCourse}
				errors={this.state.errors} />
		);
	}
});

module.exports = ManageCoursePage;