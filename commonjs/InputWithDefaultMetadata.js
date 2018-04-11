'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _metadata = require('libphonenumber-js/metadata.min');

var _metadata2 = _interopRequireDefault(_metadata);

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputWithDefaultMetadata = function (_Component) {
	_inherits(InputWithDefaultMetadata, _Component);

	function InputWithDefaultMetadata() {
		_classCallCheck(this, InputWithDefaultMetadata);

		return _possibleConstructorReturn(this, (InputWithDefaultMetadata.__proto__ || Object.getPrototypeOf(InputWithDefaultMetadata)).apply(this, arguments));
	}

	_createClass(InputWithDefaultMetadata, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			return _react2.default.createElement(_Input2.default, _extends({
				ref: function ref(_ref) {
					return _this2.input = _ref;
				}
			}, this.props, {
				metadata: _metadata2.default }));
		}
	}, {
		key: 'focus',
		value: function focus() {
			return this.input.focus();
		}
	}]);

	return InputWithDefaultMetadata;
}(_react.Component);

exports.default = InputWithDefaultMetadata;
//# sourceMappingURL=InputWithDefaultMetadata.js.map