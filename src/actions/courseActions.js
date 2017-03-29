'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var AuthorApi = require('../api/authorApi');
var ActionType = require('../constants/actionTypes');

var AuthorActions = {
	createAuthor: function (author) {
		var newAuthor = AuthorApi.saveAuthor(author);

		// Hey dispatcher, go tell all the stores that an author was just created
		Dispatcher.dispatch({
			actionType: ActionType.CREATE_AUTHOR,
			author: newAuthor
		});
	},
	updateAuthor: function (author) {
		var updatedAuthor = AuthorApi.saveAuthor(author);

		Dispatcher.dispatch({
			actionType: ActionType.UPDATE_AUTHOR,
			author: updatedAuthor
		});
	},
	deleteAuthor: function (id) {
		AuthorApi.deleteAuthor(id);

		Dispatcher.dispatch({
			actionType: ActionType.DELETE_AUTHOR,
			id: id
		});
	}
};

module.exports = AuthorActions;