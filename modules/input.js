var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp, _initialiseProps;

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import reactLifecyclesCompat from 'react-lifecycles-compat';
import { AsYouType, parse } from 'libphonenumber-js/custom';
import { ReactInput } from 'input-format';
import classNames from 'classnames';

// Could have been `import { Select } from 'react-responsive-ui'`
// but in that case Webpack bundles the whole `react-responsive-ui` package.
import Select from 'react-responsive-ui/commonjs/Select';

import InternationalIcon from './InternationalIcon';
import FlagComponent from './Flag';

import { getPreSelectedCountry, getCountrySelectOptions, parsePhoneNumberCharacter, parsePhoneNumber, formatPhoneNumber, generateNationalNumberDigits, migrateParsedInputForNewCountry, getCountryForParsedInput, e164 } from './input-control';

import { countries } from './countries';

// Allows passing custom `libphonenumber-js` metadata
// to reduce the overall bundle size.

var PhoneNumberInput = reactLifecyclesCompat(_class = (_temp = _class2 = function (_PureComponent) {
	_inherits(PhoneNumberInput, _PureComponent);

	function PhoneNumberInput(props) {
		_classCallCheck(this, PhoneNumberInput);

		var _this = _possibleConstructorReturn(this, (PhoneNumberInput.__proto__ || Object.getPrototypeOf(PhoneNumberInput)).call(this, props));

		_initialiseProps.call(_this);

		var _this$props = _this.props,
		    value = _this$props.value,
		    country = _this$props.country,
		    countries = _this$props.countries,
		    labels = _this$props.labels,
		    international = _this$props.international,
		    metadata = _this$props.metadata;


		var parsed_number = parsePhoneNumber(value, metadata);

		var pre_selected_country = getPreSelectedCountry(parsed_number, country, countries, international, metadata);

		_this.state = {
			// Workaround for `this.props` inside `getDerivedStateFromProps()`.
			props: _this.props,

			// The country selected.
			country: pre_selected_country,

			// Generate country `<select/>` options.
			country_select_options: generate_country_select_options(_this.props),

			// `parsed_input` state property holds user's input.
			// The reason is that there's no way of finding out
			// in which form should `value` be displayed: international or national.
			// E.g. if value is `+78005553535` then it could be input
			// by a user both as `8 (800) 555-35-35` and `+7 800 555 35 35`.
			parsed_input: generate_parsed_input(value, parsed_number, _this.props),

			// `value` property is duplicated in state.
			// The reason is that `getDerivedStateFromProps()`
			// needs this `value` to compare to the new `value` property
			// to find out if `parsed_input` needs updating:
			// If the `value` property changed externally
			// then it won't be equal to state `value`
			// in which case `parsed_input` and `country` get updated.
			value: value
		};
		return _this;
	}

	// Country `<select/>` `onChange` handler.


	// Phone number `<input/>` `onKeyDown` handler.


	// `<input/>` `onChange` handler.
	// Updates `value` property accordingly.
	// (so that they are kept in sync)


	// This `onBlur` interceptor is a workaround for `redux-form`
	// so that it gets the up-to-date `value` in its `onBlur` handler.
	// Without this fix it just gets the actual (raw) input field textual value.
	//
	// A developer is not supposed to pass this `onBlur` property manually.
	// Instead, `redux-form` passes `onBlur` to this component automatically
	// and this component patches that `onBlur` handler passing it further to
	// `input-format`'s `<ReactInput/>`.
	//


	// When country `<select/>` is toggled.


	// Focuses phone number `<input/>` field
	// on tab out of the country `<select/>`.


	// Can be called externally.


	_createClass(PhoneNumberInput, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    disabled = _props.disabled,
			    autoComplete = _props.autoComplete,
			    countrySelectTabIndex = _props.countrySelectTabIndex,
			    countrySelectMaxItems = _props.countrySelectMaxItems,
			    countrySelectAriaLabel = _props.countrySelectAriaLabel,
			    countrySelectCloseAriaLabel = _props.countrySelectCloseAriaLabel,
			    showCountrySelect = _props.showCountrySelect,
			    nativeCountrySelect = _props.nativeCountrySelect,
			    saveOnIcons = _props.saveOnIcons,
			    style = _props.style,
			    className = _props.className,
			    inputClassName = _props.inputClassName,
			    countrySelectToggleClassName = _props.countrySelectToggleClassName,
			    error = _props.error,
			    indicateInvalid = _props.indicateInvalid,
			    CountrySelectComponent = _props.countrySelectComponent,
			    InputComponent = _props.inputComponent,
			    ext = _props.ext,
			    countries = _props.countries,
			    labels = _props.labels,
			    _ = _props.country,
			    flags = _props.flags,
			    flagComponent = _props.flagComponent,
			    flagsPath = _props.flagsPath,
			    international = _props.international,
			    internationalIcon = _props.internationalIcon,
			    displayInitialValueAsLocalNumber = _props.displayInitialValueAsLocalNumber,
			    locale = _props.locale,
			    metadata = _props.metadata,
			    phone_number_input_props = _objectWithoutProperties(_props, ['disabled', 'autoComplete', 'countrySelectTabIndex', 'countrySelectMaxItems', 'countrySelectAriaLabel', 'countrySelectCloseAriaLabel', 'showCountrySelect', 'nativeCountrySelect', 'saveOnIcons', 'style', 'className', 'inputClassName', 'countrySelectToggleClassName', 'error', 'indicateInvalid', 'countrySelectComponent', 'inputComponent', 'ext', 'countries', 'labels', 'country', 'flags', 'flagComponent', 'flagsPath', 'international', 'internationalIcon', 'displayInitialValueAsLocalNumber', 'locale', 'metadata']);

			var _state = this.state,
			    country = _state.country,
			    show_country_select = _state.show_country_select,
			    country_select_options = _state.country_select_options,
			    parsed_input = _state.parsed_input;


			return React.createElement(
				'div',
				{
					style: style,
					className: classNames('react-phone-number-input', {
						'react-phone-number-input--invalid': error && indicateInvalid
					}, className) },
				React.createElement(
					'div',
					{ className: 'react-phone-number-input__row' },
					showCountrySelect && React.createElement(CountrySelectComponent, {
						ref: this.store_country_select_instance,
						value: country,
						options: country_select_options,
						onChange: this.on_country_selected,
						disabled: disabled,
						onToggle: this.on_country_select_toggle,
						onTabOut: this.on_country_select_tab_out,
						nativeExpanded: nativeCountrySelect,
						concise: true,
						autocomplete: true,
						autocompleteShowAll: true,
						maxItems: countrySelectMaxItems,
						tabIndex: countrySelectTabIndex,
						focusUponSelection: false,
						saveOnIcons: saveOnIcons,
						name: phone_number_input_props.name ? phone_number_input_props.name + '__country' : undefined,
						ariaLabel: countrySelectAriaLabel,
						closeAriaLabel: countrySelectCloseAriaLabel,
						className: classNames('react-phone-number-input__country', {
							'react-phone-number-input__country--native-expanded': nativeCountrySelect
						}),
						inputClassName: inputClassName,
						toggleClassName: countrySelectToggleClassName }),
					!show_country_select && React.createElement(InputComponent, _extends({
						type: 'tel'
					}, phone_number_input_props, {
						ref: this.store_number_input_instance,
						parse: parsePhoneNumberCharacter,
						format: this.format_phone_number,
						value: parsed_input,
						onChange: this.on_change,
						onBlur: this.on_blur,
						onKeyDown: this.on_number_key_down,
						disabled: disabled,
						autoComplete: autoComplete,
						className: classNames('rrui__input', 'rrui__input-element', 'rrui__input-field', {
							'rrui__input-field--invalid': error && indicateInvalid,
							'rrui__input-field--disabled': disabled
						}, 'react-phone-number-input__phone', inputClassName) })),
					ext && !show_country_select && React.createElement(
						'label',
						{ className: 'react-phone-number-input__ext' },
						labels && labels.ext || 'ext.',
						React.cloneElement(ext, {
							type: ext.props.type === undefined ? 'number' : ext.props.type,
							className: classNames('rrui__input', 'rrui__input-element', 'rrui__input-field', {
								'rrui__input-field--disabled': disabled
							}, 'react-phone-number-input__ext-input', inputClassName, ext.props.className)
						})
					)
				),
				error && indicateInvalid && React.createElement(
					'div',
					{ className: classNames('rrui__input-error', 'react-phone-number-input__error') },
					error
				)
			);
		}
	}], [{
		key: 'getDerivedStateFromProps',
		value: function getDerivedStateFromProps(props, state) {
			var country = state.country,
			    value = state.value,
			    old_default_country = state.props.country;
			var metadata = props.metadata,
			    new_default_country = props.country,
			    new_value = props.value;


			var new_state = { props: props

				// If `countries` or `labels` or `international` changed
				// then re-generate country `<select/>` options.
			};if (props.countries !== state.props.countries || props.labels !== state.props.labels || props.international !== state.props.international) {
				new_state.country_select_options = generate_country_select_options(props);
			}

			// If the default country changed.
			// (e.g. in case of ajax GeoIP detection after page loaded)
			if (new_default_country !== old_default_country && !country && !value && !new_value) {
				return _extends({}, new_state, {
					country: new_default_country
				});
			}
			// If a new `value` is set externally.
			// (e.g. as a result of an ajax API request
			//  to get user's phone after page loaded)
			else if (new_value !== value) {
					var parsed_number = parsePhoneNumber(new_value, metadata);

					return _extends({}, new_state, {
						parsed_input: generate_parsed_input(new_value, parsed_number, props),
						value: new_value,
						country: new_value ? parsed_number.country : country
					});
				} else if (new_state.country_select_options) {
					return new_state;
				}
		}
	}]);

	return PhoneNumberInput;
}(PureComponent), _class2.propTypes = {
	// Phone number in E.164 format.
	// E.g. "+12223333333" for USA.
	value: PropTypes.string,

	// `onChange` handler is called each time
	// the phone number `<input/>` is edited.
	onChange: PropTypes.func.isRequired,

	// `onBlur` is usually passed by `redux-form`.
	onBlur: PropTypes.func,

	// `onKeyDown` handler (e.g. to handle Enter key press).
	onKeyDown: PropTypes.func,

	// Disables both the phone number `<input/>`
	// and the country `<select/>`.
	// (is `false` by default)
	disabled: PropTypes.bool.isRequired,

	// Web browser's "autocomplete" feature
	// remembers the phone number being input
	// and can also autofill the `<input/>`
	// with previously remembered phone numbers.
	//
	// Default value: "tel".
	//
	// https://developers.google.com/web/updates/2015/06/checkout-faster-with-autofill
	//
	// "So when should you use autocomplete="off"?
	//  One example is when you've implemented your own version
	//  of autocomplete for search. Another example is any form field
	//  where users will input and submit different kinds of information
	//  where it would not be useful to have the browser remember
	//  what was submitted previously".
	//
	autoComplete: PropTypes.string.isRequired,

	// Should the initially passed phone number `value`
	// be converted to a national phone number for its country.
	// (is `false` by default)
	displayInitialValueAsLocalNumber: PropTypes.bool.isRequired,

	// The country to be selected by default.
	// Two-letter country code ("ISO 3166-1 alpha-2").
	country: PropTypes.string,

	// Only these countries will be available for selection.
	// Includes all countries by default.
	countries: PropTypes.arrayOf(PropTypes.string).isRequired,

	// Custom country `<select/>` option names.
	// E.g. `{ ZZ: 'Международный', RU: 'Россия', US: 'США', ... }`
	labels: PropTypes.objectOf(PropTypes.string),

	// Country flag icon components.
	// By default flag icons are inserted as `<img/>`s
	// with their `src` pointed to `flag-icon-css` github repo.
	// There might be cases (e.g. an offline application)
	// where having a large (3 megabyte) `<svg/>` flags
	// bundle is more appropriate.
	// `import flags from 'react-phone-number-input/flags'`.
	flags: PropTypes.objectOf(PropTypes.func),

	// Flag icon component.
	flagComponent: PropTypes.func.isRequired,

	// A base URL path for national flag SVG icons.
	// By default it uses the ones from `flag-icon-css` github repo.
	flagsPath: PropTypes.string.isRequired,

	// Whether to add the "International" option
	// to the list of countries.
	// By default it's added if the list of `countries` hasn't been overridden.
	international: PropTypes.bool,

	// Custom "International" country `<select/>` option icon.
	internationalIcon: PropTypes.element.isRequired,

	// Whether to use native country `<select/>` when it's expanded.
	nativeCountrySelect: PropTypes.bool.isRequired,

	// If set to `false`, then country flags will be shown
	// for all countries when country `<select/>` is expanded.
	// By default shows flag only for currently selected country.
	saveOnIcons: PropTypes.bool.isRequired,

	// Whether to show country `<select/>`.
	// (is `true` by default)
	showCountrySelect: PropTypes.bool.isRequired,

	// HTML `tabindex` attribute for the country `<select/>`.
	countrySelectTabIndex: PropTypes.number,

	// Defines the height (in items) of the expanded country `<select/>`.
	countrySelectMaxItems: PropTypes.number,

	// `aria-label` for the `<Select/>`'s toggle `<button/>`.
	countrySelectAriaLabel: PropTypes.string,

	// `aria-label` for the `<Select/>`'s "Close" button
	// (which is an "x" visible in fullscreen mode).
	// (not yet implemented but is likely to be).
	countrySelectCloseAriaLabel: PropTypes.string,

	// `<Phone/>` component CSS style object.
	style: PropTypes.object,

	// `<Phone/>` component CSS class.
	className: PropTypes.string,

	// `<input/>` CSS class.
	// Both for the phone number `<input/>` and
	// the country select autocomplete `<input/>`.
	inputClassName: PropTypes.string,

	// Country `<select/>` toggle `<button/>` CSS class
	countrySelectToggleClassName: PropTypes.string,

	// Country `<select/>` component.
	countrySelectComponent: PropTypes.func.isRequired,

	// Phone number `<input/>` component.
	inputComponent: PropTypes.func.isRequired,

	// Phone number extension element.
	ext: PropTypes.node,

	// An error message shown below the phone number `<input/>`.
	error: PropTypes.string,

	// The `error` is shown only when `indicateInvalid` is true.
	indicateInvalid: PropTypes.bool,

	// Translation.
	locale: PropTypes.objectOf(PropTypes.string),

	// `libphonenumber-js` metadata
	metadata: PropTypes.shape({
		country_calling_codes: PropTypes.object.isRequired,
		countries: PropTypes.object.isRequired
	}).isRequired
}, _class2.defaultProps = {
	// Not disabled.
	disabled: false,

	// Remember (and autofill) the value as a phone number.
	autoComplete: 'tel',

	// Include all countries.
	countries: countries,

	// Flag icon component.
	flagComponent: FlagComponent,

	// By default use icons from `flag-icon-css` github repo.
	flagsPath: 'https://lipis.github.io/flag-icon-css/flags/4x3/',

	// Default "International" country `<select/>` option icon (globe).
	internationalIcon: React.createElement(
		'div',
		{ className: classNames('react-phone-number-input__icon', 'react-phone-number-input__icon--international') },
		React.createElement(InternationalIcon, null)
	),

	// Whether to use native country `<select/>` when it's expanded.
	nativeCountrySelect: false,

	// If set to `false`, then country flags will be shown
	// for all countries when country `<select/>` is expanded.
	// By default shows flag only for currently selected country.
	// (is `true` by default to save user's traffic
	//  because all flags are about 3 MegaBytes)
	saveOnIcons: true,

	// Show country `<select/>`.
	showCountrySelect: true,

	// Don't convert the initially passed phone number `value`
	// to a national phone number for its country.
	// The reason is that the newer generation grows up when
	// there are no stationary phones and therefore everyone inputs
	// phone numbers with a `+` in their smartphones
	// so phone numbers written in international form
	// are gradually being considered more natural than local ones.
	displayInitialValueAsLocalNumber: false,

	// `<Select/>` from `react-responsive-ui`.
	countrySelectComponent: Select,

	// `<ReactInput/>` from `input-format`.
	inputComponent: ReactInput
}, _initialiseProps = function _initialiseProps() {
	var _this2 = this;

	this.on_country_selected = function (new_country) {
		var _props2 = _this2.props,
		    metadata = _props2.metadata,
		    onChange = _props2.onChange;
		var _state2 = _this2.state,
		    old_parsed_input = _state2.parsed_input,
		    old_country = _state2.country;

		// After the new `country` has been selected,
		// if the phone number `<input/>` holds any digits
		// then migrate those digits for the new `country`.
		// If returns `undefined` then it means that it stays the same.

		var new_parsed_input = migrateParsedInputForNewCountry(old_parsed_input, old_country, new_country, metadata);

		var new_value = e164(new_parsed_input, new_country, metadata);

		_this2.setState({
			country: new_country,
			parsed_input: new_parsed_input,
			value: new_value
		}, function () {
			// Update the new `value` property.
			// Doing it after the `state` has been updated
			// because `onChange()` will trigger `getDerivedStateFromProps()`
			// with the new `value` which will be compared to `state.value` there.
			onChange(new_value);

			// Focus the phone number `<input/>` upon country selection.
			// Doing it in a `setState()` callback because the phone number
			// `<input/>` is hidden while country `<select/>` is expanded.
			_this2.focus();
		});
	};

	this.on_number_key_down = function (event) {
		var onKeyDown = _this2.props.onKeyDown;

		// Expand country `<select/>`` on "Down arrow" key press.

		if (event.keyCode === 40) {
			_this2.country_select.toggle();
		}

		if (onKeyDown) {
			onKeyDown(event);
		}
	};

	this.on_change = function (parsed_input) {
		var _props3 = _this2.props,
		    onChange = _props3.onChange,
		    countries = _props3.countries,
		    international = _props3.international,
		    metadata = _props3.metadata;
		var country = _this2.state.country;


		if (parsed_input) {
			// If the phone number being input is an international one
			// then tries to derive the country from the phone number.
			// (regardless of whether there's any country currently selected)
			if (parsed_input[0] === '+') {
				country = getCountryForParsedInput(parsed_input, country, countries, international, metadata);
			}
			// If this `onChange()` event was triggered
			// as a result of selecting "International" country
			// then force-prepend a `+` sign if the phone number
			// `<input/>` value isn't in international format.
			else if (!country) {
					parsed_input = '+' + parsed_input;
				}
		}

		// Generate the new `value` property.
		var value = e164(parsed_input, country, metadata);

		_this2.setState({
			parsed_input: parsed_input,
			value: value,
			country: country
		},
		// Update the new `value` property.
		// Doing it after the `state` has been updated
		// because `onChange()` will trigger `getDerivedStateFromProps()`
		// with the new `value` which will be compared to `state.value` there.
		function () {
			return onChange(value);
		});
	};

	this.on_blur = function (event) {
		var _props4 = _this2.props,
		    value = _props4.value,
		    onBlur = _props4.onBlur;


		if (!onBlur) {
			return;
		}

		var _event = _extends({}, event, {
			target: _extends({}, event.target, {
				value: value
			})

			// For `redux-form` event detection.
			// https://github.com/erikras/redux-form/blob/v5/src/events/isEvent.js
		});_event.stopPropagation = event.stopPropagation;
		_event.preventDefault = event.preventDefault;

		return onBlur(_event);
	};

	this.on_country_select_toggle = function (show) {
		_this2.setState({
			show_country_select: show
		});
	};

	this.on_country_select_tab_out = function (event) {
		event.preventDefault();

		// Focus the phone number input upon country selection
		// (do it in a timeout because the `<input/>`
		//  is hidden while selecting a country)
		setTimeout(_this2.focus, 0);
	};

	this.format_phone_number = function (value) {
		var metadata = _this2.props.metadata;
		var country = _this2.state.country;


		return formatPhoneNumber(value, country, metadata);
	};

	this.focus = function () {
		return ReactDOM.findDOMNode(_this2.number_input).focus();
	};

	this.store_country_select_instance = function (_) {
		return _this2.country_select = _;
	};

	this.store_number_input_instance = function (_) {
		return _this2.number_input = _;
	};
}, _temp)) || _class;

// Generates country `<select/>` options.


export { PhoneNumberInput as default };
function generate_country_select_options(props) {
	var countries = props.countries,
	    labels = props.labels,
	    flags = props.flags,
	    flagsPath = props.flagsPath,
	    FlagComponent = props.flagComponent,
	    international = props.international,
	    internationalIcon = props.internationalIcon;


	return getCountrySelectOptions(countries, labels, international).map(function (_ref) {
		var value = _ref.value,
		    label = _ref.label;
		return {
			value: value,
			label: label,
			icon: value ? function () {
				return React.createElement(FlagComponent, { country: value, flags: flags, flagsPath: flagsPath });
			} : internationalIcon
		};
	});
}

function generate_parsed_input(value, parsed_number, props) {
	var displayInitialValueAsLocalNumber = props.displayInitialValueAsLocalNumber,
	    metadata = props.metadata;

	// If the `value` (E.164 phone number)
	// belongs to the currently selected country
	// and `displayInitialValueAsLocalNumber` property is `true`
	// then convert `value` (E.164 phone number)
	// to a local phone number digits.
	// E.g. '+78005553535' -> '88005553535'.

	if (displayInitialValueAsLocalNumber && parsed_number.country) {
		return generateNationalNumberDigits(parsed_number, metadata);
	}

	return value;
}
//# sourceMappingURL=input.js.map