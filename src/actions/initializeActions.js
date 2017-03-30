'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var AuthorApi = require('../api/authorApi');
var CourseApi = require('../api/courseApi');
var ActionType = require('../constants/actionTypes');

var InitializeActions = {
	initApp: function () {
		Dispatcher.dispatch({
			actionType: ActionType.INITIALIZE,
			initialData: {
				authors: AuthorApi.getAllAuthors(),		// will normally be async
				courses: CourseApi.getAllCourses()
			}
		});
	}
};

module.exports = InitializeActions;