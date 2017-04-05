'use strict';

var React = require('react');

var SelectionInput = React.createClass({
	propTypes: {
		name: React.PropTypes.string.isRequired,
		label: React.PropTypes.string.isRequired,
		onChange: React.PropTypes.func.isRequired,
		value: React.PropTypes.string.isRequired
	},

	render: function () {
		var createOption = function(author) {
			return (
				<option key={author.id} value={author.id}>{author.firstName} {author.lastName}</option>
			);
		};

		return (
			<div className='form-group'>
				<label htmlFor={this.props.name}>{this.props.label}</label>
				<select
					ref={this.props.name}
					name={this.props.name}
					value={this.props.value}
					onChange={this.props.onChange}
					className="form-control">
					{this.props.authors.map(createOption, this)}
				</select>
			</div>
		);
	}
});

module.exports = SelectionInput;