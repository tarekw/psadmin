'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var AuthorApi = require('../api/authorApi');
var ActionType = require('../constants/actionTypes');

var InitializeActions = {
	initApp: function () {
		Dispatcher.dispatch({
			actionType: ActionType.INITIALIZE,
			initialData: {
				authors: AuthorApi.getAllAuthors()		// will normally be async
			}
		});
	}
};

module.exports = InitializeActions;