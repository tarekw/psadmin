'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var CourseApi = require('../api/courseApi');
var ActionType = require('../constants/actionTypes');

var CourseActions = {
	createCourse: function (course) {
		var newCourse = CourseApi.saveCourse(course);

		// Hey dispatcher, go tell all the stores that a course was just created
		Dispatcher.dispatch({
			actionType: ActionType.CREATE_COURSE,
			course: newCourse
		});
	},
	updateCourse: function (course) {
		var updatedCourse = CourseApi.saveCourse(course);

		Dispatcher.dispatch({
			actionType: ActionType.UPDATE_COURSE,
			course: updatedCourse
		});
	},
	deleteCourse: function (id) {
		CourseApi.deleteCourse(id);

		Dispatcher.dispatch({
			actionType: ActionType.DELETE_COURSE,
			id: id
		});
	}
};

module.exports = CourseActions;