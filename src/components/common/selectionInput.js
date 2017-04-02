'use strict';

var React = require('react');

var SelectionInput = React.createClass({
	propTypes: {
		// name: React.PropTypes.string.isRequired,
		// label: React.PropTypes.string.isRequired,
		// onChange: React.PropTypes.func.isRequired,
		// placeholder: React.PropTypes.string,
		// value: React.PropTypes.string,
		// error: React.PropTypes.string
	},

	render: function () {
		var wrapperClass = 'form-group';
		if (this.props.error && this.props.error.length > 0) {
			wrapperClass += ' ' + 'has-error';
		}

		var createOption = function(author) {
			return (
				<option key={author.id} value={author.id}>{author.firstName} {author.lastName}</option>
			);
		};

		return (
			<div className={wrapperClass}>
				<label htmlFor={this.props.name}>{this.props.label}</label>
				<select
					ref={this.props.name}
					name={this.props.name}
					value={this.props.authorId}
					onChange={this.props.onChange}
					className="form-control">
					{this.props.authors.map(createOption, this)}
				</select>
				<div className="input">{this.props.error}</div>
			</div>
		);
	}
});

module.exports = SelectionInput;