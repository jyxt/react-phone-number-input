'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _libphonenumberJs = require('libphonenumber-js');

var _inputFormat = require('input-format');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactResponsiveUi = require('./react-responsive-ui');

var _countryNames = require('./country names.json');

var _countryNames2 = _interopRequireDefault(_countryNames);

var _internationalIcon = require('./international icon');

var _internationalIcon2 = _interopRequireDefault(_internationalIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// A list of all country codes
var all_countries = [];

// Country code to country name map


// Not importing here directly from `react-responsive-ui` npm package
// just to reduce the overall bundle size.
var default_dictionary = {
	International: 'International'
};

// Populate `all_countries` and `default_dictionary`
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
	for (var _iterator = (0, _getIterator3.default)(_countryNames2.default), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
		var item = _step.value;

		var _item = (0, _slicedToArray3.default)(item, 2),
		    code = _item[0],
		    name = _item[1];

		all_countries.push(code.toUpperCase());
		default_dictionary[code.toUpperCase()] = name;
	}

	// Allows passing custom `libphonenumber-js` metadata
	// to reduce the overall bundle size.
} catch (err) {
	_didIteratorError = true;
	_iteratorError = err;
} finally {
	try {
		if (!_iteratorNormalCompletion && _iterator.return) {
			_iterator.return();
		}
	} finally {
		if (_didIteratorError) {
			throw _iteratorError;
		}
	}
}

var Input = function (_Component) {
	(0, _inherits3.default)(Input, _Component);

	function Input(props) {
		(0, _classCallCheck3.default)(this, Input);

		var _this = (0, _possibleConstructorReturn3.default)(this, (Input.__proto__ || (0, _getPrototypeOf2.default)(Input)).call(this, props));

		_this.state = {};
		var countries = props.countries,
		    value = props.value,
		    dictionary = props.dictionary,
		    international = props.international,
		    internationalIcon = props.internationalIcon,
		    flags = props.flags;
		var country = props.country;

		// If there will be no "International" option
		// then a `country` must be selected.

		if (!should_add_international_option(props) && !country) {
			country = countries[0];
		}

		// Set the currently selected country
		_this.state.country_code = country;

		// If a phone number `value` is passed then format it
		if (value) {
			// Set the currently entered `value`
			_this.state.value = _this.correct_initial_value_if_neccessary(value, country);
		}

		// `<Select/>` options
		_this.select_options = [];

		// Add the "International" option to the country list (if suitable)
		if (should_add_international_option(props)) {
			_this.select_options.push({
				label: from_dictionary('International', props),
				icon: flags === false ? undefined : internationalIcon
			});
		}

		// Add a `<Select/>` option for each country
		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;

		try {
			for (var _iterator2 = (0, _getIterator3.default)(countries), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var country_code = _step2.value;

				_this.select_options.push({
					value: country_code,
					label: from_dictionary(country_code, props),
					icon: get_country_option_icon(country_code, props)
				});
			}
		} catch (err) {
			_didIteratorError2 = true;
			_iteratorError2 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion2 && _iterator2.return) {
					_iterator2.return();
				}
			} finally {
				if (_didIteratorError2) {
					throw _iteratorError2;
				}
			}
		}

		_this.focus = _this.focus.bind(_this);
		_this.on_key_down = _this.on_key_down.bind(_this);
		_this.on_change = _this.on_change.bind(_this);
		_this.set_country = _this.set_country.bind(_this);
		_this.parse = _this.parse.bind(_this);
		_this.format = _this.format.bind(_this);

		_this.country_select_toggled = _this.country_select_toggled.bind(_this);
		_this.on_country_select_tab_out = _this.on_country_select_tab_out.bind(_this);
		return _this;
	}

	// If the country code is specified
	//   If the value has a leading plus sign
	//     If it converts into a valid national number for this country
	//       Then the value is set to be that national number
	//     Else
	//       The leading + sign is trimmed
	//   Else
	//     The value stays as it is
	// Else
	//   If the value has a leading + sign
	//     The value stays as it is
	//   Else
	//     The + sign is prepended
	//


	(0, _createClass3.default)(Input, [{
		key: 'correct_initial_value_if_neccessary',
		value: function correct_initial_value_if_neccessary(value, country_code) {
			var metadata = this.props.metadata;


			if (!value) {
				return;
			}

			// If the country code is specified
			if (country_code) {
				// If the value has a leading plus sign
				if (value[0] === '+') {
					// If it's a fully-entered phone number
					// that converts into a valid national number for this country
					// then the value is set to be that national number.

					var parsed = (0, _libphonenumberJs.parse)(value, metadata);

					if (parsed.country === country_code) {
						return this.format(parsed.phone, country_code).text;
					}

					// Else the leading + sign is trimmed.
					return value.slice(1);
				}

				// Else the value stays as it is
				return value;
			}

			// The country is not set.
			// Assuming that's an international phone number.

			// If the value has a leading + sign
			if (value[0] === '+') {
				// The value is correct
				return value;
			}

			// The + sign is prepended
			return '+' + value;
		}
	}, {
		key: 'set_country_code_value',
		value: function set_country_code_value(country_code) {
			var onCountryChange = this.props.onCountryChange;


			if (onCountryChange) {
				onCountryChange(country_code);
			}

			this.setState({ country_code: country_code });
		}

		// `<select/>` `onChange` handler

	}, {
		key: 'set_country',
		value: function set_country(country_code) {
			var metadata = this.props.metadata;

			// Previously selected country

			var previous_country_code = this.state.country_code;

			this.set_country_code_value(country_code);

			// Adjust the phone number (`value`)
			// according to the selected `country_code`

			var value = this.state.value;

			// If switching to a country from International
			//   If the international number belongs to this country
			//     Convert it to a national number
			//   Else
			//     Trim the leading + sign
			//
			// If switching to a country from a country
			//   If the value has a leading + sign
			//     If the international number belongs to this country
			//       Convert it to a national number
			//     Else
			//       Trim the leading + sign
			//   Else
			//     The value stays as it is
			//
			// If switching to International from a country
			//   If the value has a leading + sign
			//     The value stays as it is
			//   Else
			//     Take the international plaintext value

			if (value) {
				// If switching to a country from International
				if (!previous_country_code && country_code) {
					// The value is international plaintext
					var parsed = (0, _libphonenumberJs.parse)(value, metadata);

					// If it's for this country,
					// then convert it to a national number
					if (parsed.country === country_code) {
						value = this.format(parsed.phone, country_code).text;
					}
					// Else just trim the + sign
					else {
							value = value.slice(1);
						}
				}

				if (previous_country_code && country_code) {
					if (value[0] === '+') {
						var _parsed = (0, _libphonenumberJs.parse)(value, metadata);

						if (_parsed.country === country_code) {
							value = this.format(_parsed.phone, country_code).text;
						} else {
							value = value.slice(1);
						}
					}
				}

				// If switching to International from a country
				if (previous_country_code && !country_code) {
					// If no leading + sign
					if (value[0] !== '+') {
						// Take the international plaintext value
						var national_number = parse_partial_number(value, previous_country_code, metadata).national_number;
						value = (0, _libphonenumberJs.format)(national_number, previous_country_code, 'International_plaintext', metadata);
					}
				}

				// Update the adjusted `value`
				// and update `this.props.value` (in e.164 phone number format)
				// according to the new `this.state.value`.
				// (keep them in sync)
				this.on_change(value, country_code);
			}

			// Focus the phone number input upon country selection
			// (do it in a timeout because the `<input/>`
			//  is hidden while selecting a country)
			// setTimeout(this.focus, 0)
		}

		// `input-format` `parse` character function
		// https://github.com/halt-hammerzeit/input-format

	}, {
		key: 'parse',
		value: function parse(character, value) {
			var countries = this.props.countries;


			if (character === '+') {
				// Only allow a leading `+`
				if (!value) {
					// If the "International" option is available
					// then allow the leading `+` because it's meant to be this way.
					//
					// Otherwise, the leading `+` will either erase all subsequent digits
					// (if they're not appropriate for the selected country)
					// or the subsequent digits (if any) will join the `+`
					// forming an international phone number. Because a user
					// might be comfortable with entering an international phone number
					// (i.e. with country code) rather than the local one.
					// Therefore such possibility is given.
					//
					return character;
				}
			}
			// For digits
			else if (character >= '0' && character <= '9') {
					var metadata = this.props.metadata;
					var country_code = this.state.country_code;

					// If the "International" option is not available
					// and if the value has a leading `+`
					// then it means that the phone number being entered
					// is an international one, so only allow the country phone code
					// for the selected country to be entered.

					if (!should_add_international_option(this.props) && value && value[0] === '+') {
						if (!could_phone_number_belong_to_country(value + character, country_code, metadata)) {
							return;
						}

						return character;
					}

					return character;
				}
		}

		// `input-format` `format` function
		// https://github.com/halt-hammerzeit/input-format

	}, {
		key: 'format',
		value: function format(value) {
			var country_code = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.state.country_code;
			var metadata = this.props.metadata;

			// `value` is already parsed input, i.e.
			// either International plaintext phone number
			// or just local phone number digits.

			// "As you type" formatter

			var formatter = new _libphonenumberJs.as_you_type(country_code, metadata);

			// Is used to check if a country code can already be derived
			this.formatter = formatter;

			// Format phone number
			var text = formatter.input(value);

			return { text: text, template: formatter.template };
		}

		// Can be called externally

	}, {
		key: 'focus',
		value: function focus() {
			_reactDom2.default.findDOMNode(this.input).focus();
		}

		// `<input/>` `onKeyDown` handler

	}, {
		key: 'on_key_down',
		value: function on_key_down(event) {
			var onKeyDown = this.props.onKeyDown;

			// Expand country `<select/>`` on "Down arrow" key press

			if (event.keyCode === 40) {
				this.select.toggle();
			}

			if (onKeyDown) {
				onKeyDown(event);
			}
		}

		// `<input/>` `onChange` handler.
		// Updates `this.props.value` (in e.164 phone number format)
		// according to the new `this.state.value`.
		// (keeps them in sync)

	}, {
		key: 'on_change',
		value: function on_change(value) {
			var country_code = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.state.country_code;
			var _props = this.props,
			    metadata = _props.metadata,
			    onChange = _props.onChange;

			// If the `<input/>` is empty then just exit

			if (!value) {
				this.setState({ value: value });
				return onChange(value);
			}

			// If a phone number is being input as an international one
			// and the country code can already be derived,
			// then switch the country.
			// (`001` is a special "non-geograpical entity" code in `libphonenumber` library)
			if (value[0] === '+' && this.formatter.country && this.formatter.country !== '001') {
				country_code = this.formatter.country;
				this.set_country_code_value(country_code);
			}

			// If "International" mode is selected
			// and the `value` doesn't start with a + sign,
			// then prepend it to the `value`.
			if (value[0] !== '+' && !country_code) {
				value = '+' + value;
			}

			// Convert `value` to E.164 phone number format
			// and write it to `this.props.value`.
			onChange(e164(value, country_code, metadata));

			// Update the `value`
			this.setState({ value: value });
		}

		// When country `<select/>` is toggled

	}, {
		key: 'country_select_toggled',
		value: function country_select_toggled(is_shown) {
			this.setState({ country_select_is_shown: is_shown });
		}

		// Focuses the `<input/>` field
		// on tab out of the country `<select/>`

	}, {
		key: 'on_country_select_tab_out',
		value: function on_country_select_tab_out(event) {
			event.preventDefault();

			// Focus the phone number input upon country selection
			// (do it in a timeout because the `<input/>`
			//  is hidden while selecting a country)
			setTimeout(this.focus, 0);
		}

		// Can a user change the default country or not.

	}, {
		key: 'can_change_country',
		value: function can_change_country() {
			var countries = this.props.countries;

			// If `countries` is empty,
			// then only "International" option is available,
			// so can't switch it.
			//
			// If `countries` is a single allowed country,
			// then cant's switch it.
			//

			return countries.length > 1;
		}

		// Listen for default country property:
		// if it is set after the page loads
		// and the user hasn't selected a country yet
		// then select the default country.

	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(new_props) {
			var _props2 = this.props,
			    countries = _props2.countries,
			    country = _props2.country,
			    value = _props2.value;

			// If the default country changed
			// (e.g. in case of IP detection)

			if (new_props.country !== country) {
				// If the phone number input field is currently empty
				// (e.g. not touched yet) then change the selected `country`
				// to the newly passed one (e.g. as a result of a GeoIP query)
				if (!value) {
					// If the passed `country` allowed then update it
					if (countries.indexOf(new_props.country) !== -1) {
						// Set the new `country`
						this.set_country(new_props.country);
					}
				}
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props3 = this.props,
			    dictionary = _props3.dictionary,
			    saveOnIcons = _props3.saveOnIcons,
			    showCountrySelect = _props3.showCountrySelect,
			    international = _props3.international,
			    internationalIcon = _props3.internationalIcon,
			    country = _props3.country,
			    countries = _props3.countries,
			    onCountryChange = _props3.onCountryChange,
			    flags = _props3.flags,
			    flagsPath = _props3.flagsPath,
			    disabled = _props3.disabled,
			    style = _props3.style,
			    className = _props3.className,
			    metadata = _props3.metadata,
			    input_props = (0, _objectWithoutProperties3.default)(_props3, ['dictionary', 'saveOnIcons', 'showCountrySelect', 'international', 'internationalIcon', 'country', 'countries', 'onCountryChange', 'flags', 'flagsPath', 'disabled', 'style', 'className', 'metadata']);
			var country_select_is_shown = this.state.country_select_is_shown;


			var markup = _react2.default.createElement(
				'div',
				{ style: style, className: (0, _classnames2.default)('react-phone-number-input', className, {
						'react-phone-number-input--valid': this.formatter && this.formatter.valid
					}) },
				showCountrySelect && this.can_change_country() && _react2.default.createElement(_reactResponsiveUi.Select, {
					ref: function ref(_ref) {
						return _this2.select = _ref;
					},
					value: this.state.country_code,
					options: this.select_options,
					onChange: this.set_country,
					disabled: disabled,
					onToggle: this.country_select_toggled,
					onTabOut: this.on_country_select_tab_out,
					autocomplete: true,
					autocompleteShowAll: true,
					concise: true,
					focusUponSelection: false,
					saveOnIcons: saveOnIcons,
					name: input_props.name ? input_props.name + '__country' : undefined,
					className: 'react-phone-number-input__country',
					style: select_style }),
				!country_select_is_shown && _react2.default.createElement(_inputFormat.ReactInput, (0, _extends3.default)({}, input_props, {
					ref: function ref(_ref2) {
						return _this2.input = _ref2;
					},
					value: this.state.value,
					onChange: this.on_change,
					disabled: disabled,
					type: 'tel',
					parse: this.parse,
					format: this.format,
					onKeyDown: this.on_key_down,
					className: (0, _classnames2.default)('react-phone-number-input__phone', {
						'react-phone-number-input__phone--valid': this.formatter && this.formatter.valid
					}),
					style: input_style }))
			);

			return markup;
		}
	}]);
	return Input;
}(_react.Component);

// Parses a partially entered phone number
// and returns the national number so far.
// Not using `libphonenumber-js`'s `parse`
// function here because `parse` only works
// when the number is fully entered,
// and this one is for partially entered number.


Input.propTypes = {
	// Phone number `value`.
	// Is a plaintext international phone number
	// (e.g. "+12223333333" for USA)
	value: _react.PropTypes.string,

	// This handler is called each time
	// the phone number <input/> changes its textual value.
	onChange: _react.PropTypes.func.isRequired,

	// This `onBlur` interceptor is a workaround for `redux-form`,
	// so that it gets a parsed `value` in its `onBlur` handler,
	// not the formatted one.
	// (`redux-form` passed `onBlur` to this component
	//  and this component intercepts that `onBlur`
	//  to make sure it works correctly with `redux-form`)
	onBlur: _react.PropTypes.func,

	// Set `onKeyDown` handler.
	// Can be used in special cases to handle e.g. enter pressed
	onKeyDown: _react.PropTypes.func,

	// Disables both the <input/> and the <select/>
	// (is `false` by default)
	disabled: _react.PropTypes.bool.isRequired,

	// Two-letter country code
	// to be used as the default country
	// for local (non-international) phone numbers.
	country: _react.PropTypes.string,

	// Is called when the selected country changes
	// (either by a user manually, or by autoparsing
	//  an international phone number being input).
	// This handler does not need to update the `country` property.
	// It's simply a listener for those who might need that for whatever purpose.
	onCountryChange: _react.PropTypes.func,

	// Localization dictionary:
	// `{ International: 'Международный', RU: 'Россия', US: 'США', ... }`
	dictionary: _react.PropTypes.objectOf(_react.PropTypes.string),

	// An optional list of allowed countries
	countries: _react.PropTypes.arrayOf(_react.PropTypes.string).isRequired,

	// Custom national flag icons
	flags: _react.PropTypes.oneOfType([_react.PropTypes.objectOf(_react2.default.PropTypes.element), _react.PropTypes.bool]),

	// A base URL path for national flag SVG icons.
	// By default it uses the ones from `flag-icon-css` github repo.
	flagsPath: _react.PropTypes.string.isRequired,

	// If set to `false`, then country flags will be shown
	// for all countries in the options list
	// (not just for selected country).
	saveOnIcons: _react.PropTypes.bool.isRequired,

	// Whether to show country `<Select/>`
	// (is `true` by default)
	showCountrySelect: _react.PropTypes.bool.isRequired,

	// Whether to add the "International" option
	// to the list of countries.
	international: _react.PropTypes.bool,

	// Custom "International" phone number type icon.
	internationalIcon: _react.PropTypes.element.isRequired,

	// CSS style object
	style: _react.PropTypes.object,

	// CSS class
	className: _react.PropTypes.string,

	// `libphonenumber-js` metadata
	metadata: _react.PropTypes.shape({
		countries: _react.PropTypes.object.isRequired
	}).isRequired
};
Input.defaultProps = {
	// Is enabled
	disabled: false,

	// Include all countries by default
	countries: all_countries,

	// By default use the ones from `flag-icon-css` github repo.
	flagsPath: 'https://lipis.github.io/flag-icon-css/flags/4x3/',

	// Default international icon (globe)
	internationalIcon: _react2.default.createElement(
		'div',
		{ className: 'react-phone-number-input__icon react-phone-number-input__icon--international' },
		_react2.default.createElement(_internationalIcon2.default, null)
	),

	// Custom country names
	dictionary: {},

	// Don't show flags for all countries in the options list
	// (show it just for selected country).
	// (to save user's traffic because all flags are about 3 MegaBytes)
	saveOnIcons: true,

	// Show country `<Select/>` by default
	showCountrySelect: true
};
exports.default = Input;
function parse_partial_number(value, country_code, metadata) {
	// "As you type" formatter
	var formatter = new _libphonenumberJs.as_you_type(country_code, metadata);

	// Input partially entered phone number
	formatter.input(value);

	// Return the parsed partial phone number
	// (has `.national_number`, `.country`, etc)
	return formatter;
}

// Converts `value` to E.164 phone number format
function e164(value, country_code, metadata) {
	// If the phone number is being input in a country-specific format
	//   If the value has a leading + sign
	//     The value stays as it is
	//   Else
	//     The value is converted to international plaintext
	// Else, the phone number is being input in an international format
	//   If the value has a leading + sign
	//     The value stays as it is
	//   Else
	//     The value is prepended with a + sign

	if (country_code) {
		if (value[0] === '+') {
			return value;
		}

		var partial_national_number = parse_partial_number(value, country_code).national_number;
		return (0, _libphonenumberJs.format)(partial_national_number, country_code, 'International_plaintext', metadata);
	}

	if (value[0] === '+') {
		return value;
	}

	return '+' + value;
}

var select_style = {
	display: 'inline-block',
	verticalAlign: 'bottom'
};

var input_style = select_style;

// Gets country flag element by country code
function get_country_option_icon(country_code, _ref3) {
	var flags = _ref3.flags,
	    flagsPath = _ref3.flagsPath;

	if (flags === false) {
		return undefined;
	}

	if (flags && flags[country_code]) {
		return flags[country_code];
	}

	return _react2.default.createElement('img', {
		className: 'react-phone-number-input__icon',
		src: '' + flagsPath + country_code.toLowerCase() + '.svg' });
}

// Whether to add the "International" option to the list of countries
function should_add_international_option(properties) {
	var countries = properties.countries,
	    international = properties.international;

	// If this behaviour is explicitly set, then do as it says.

	if (international !== undefined) {
		return international;
	}

	// If `countries` is empty,
	// then only "International" option is available, so add it.
	if (countries.length === 0) {
		return true;
	}

	// If `countries` is a single allowed country,
	// then don't add the "International" option
	// because it would make no sense.
	if (countries.length === 1) {
		return false;
	}

	// Show the "International" option by default
	return true;
}

// Gets a text from dictionary
function from_dictionary(key, properties) {
	var dictionary = properties.dictionary;


	return dictionary[key] || default_dictionary[key];
}

// Is it possible that the partially entered  phone number belongs to the given country
function could_phone_number_belong_to_country(phone_number, country_code, metadata) {
	// Strip the leading `+`
	var phone_number_digits = phone_number.slice(1);

	var _iteratorNormalCompletion3 = true;
	var _didIteratorError3 = false;
	var _iteratorError3 = undefined;

	try {
		for (var _iterator3 = (0, _getIterator3.default)((0, _keys2.default)(metadata.country_phone_code_to_countries)), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
			var country_phone_code = _step3.value;

			var possible_country_phone_code = phone_number_digits.substring(0, country_phone_code.length);
			if (country_phone_code.indexOf(possible_country_phone_code) === 0) {
				// This country phone code is possible.
				// Does the given country correspond to this country phone code.
				if (metadata.country_phone_code_to_countries[country_phone_code].indexOf(country_code) >= 0) {
					return true;
				}
			}
		}
	} catch (err) {
		_didIteratorError3 = true;
		_iteratorError3 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion3 && _iterator3.return) {
				_iterator3.return();
			}
		} finally {
			if (_didIteratorError3) {
				throw _iteratorError3;
			}
		}
	}
}
//# sourceMappingURL=input.js.map