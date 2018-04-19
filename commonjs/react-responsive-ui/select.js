'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

// WHEN THIS SELECT COMPONENT IS GONNA BE RE-COPY-PASTED FROM REACT-RESPONSIVE-UI
// THIS COULD BE POTENTIALLY A BREAKING CHANGE DUE TO STYLES BEING MOVED FROM INLINE TO CSS.

// 0.8.0 / 25.02.2017
// ==================
//
//   * (could be a breaking change) Moving CSS positioning properties from inline styles to the CSS file therefore if using an edited CSS file from older versions update styles for `.rrui__select` and `.rrui__select__options`


// https://github.com/halt-hammerzeit/react-responsive-ui/blob/master/source/select.js

var _templateObject = _taggedTemplateLiteral(['\n\twrapper\n\t\tposition   : relative\n\t\tdisplay    : inline-block\n\t\t// text-align : inherit\n\n\t\t-webkit-user-select : none\n\t\t-moz-user-select    : none\n\t\t-ms-user-select     : none\n\t\tuser-select         : none\n\n\tarrow\n\t\tdisplay  : inline-block\n\n\tlist\n\t\tposition        : absolute\n\t\tz-index         : 1\n\t\tmargin-top      : 0\n\t\tmargin-bottom   : 0\n\t\tpadding         : 0\n\t\tlist-style-type : none\n\t\toverflow-x      : hidden\n\n\t\t&downward\n\t\t\t// when html page is overflown by a long list\n\t\t\t// this bottom margin takes effect\n\t\t\tmargin-bottom : 1em\n\n\t\t&upward\n\t\t\tbottom: 100%\n\n\t\t\t// when html page is overflown by a long list\n\t\t\t// this top margin takes effect\n\t\t\tmargin-top : 1em\n\n\tlist_item\n\t\tdisplay     : inline-block\n\t\twhite-space : nowrap\n\n\tmenu_toggler\n\t\tdisplay : inline-block\n\n\tseparator\n\t\tpadding     : 0\n\t\tline-height : 0\n\t\tfont-size   : 0\n'], ['\n\twrapper\n\t\tposition   : relative\n\t\tdisplay    : inline-block\n\t\t// text-align : inherit\n\n\t\t-webkit-user-select : none\n\t\t-moz-user-select    : none\n\t\t-ms-user-select     : none\n\t\tuser-select         : none\n\n\tarrow\n\t\tdisplay  : inline-block\n\n\tlist\n\t\tposition        : absolute\n\t\tz-index         : 1\n\t\tmargin-top      : 0\n\t\tmargin-bottom   : 0\n\t\tpadding         : 0\n\t\tlist-style-type : none\n\t\toverflow-x      : hidden\n\n\t\t&downward\n\t\t\t// when html page is overflown by a long list\n\t\t\t// this bottom margin takes effect\n\t\t\tmargin-bottom : 1em\n\n\t\t&upward\n\t\t\tbottom: 100%\n\n\t\t\t// when html page is overflown by a long list\n\t\t\t// this top margin takes effect\n\t\t\tmargin-top : 1em\n\n\tlist_item\n\t\tdisplay     : inline-block\n\t\twhite-space : nowrap\n\n\tmenu_toggler\n\t\tdisplay : inline-block\n\n\tseparator\n\t\tpadding     : 0\n\t\tline-height : 0\n\t\tfont-size   : 0\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactStyling = require('react-styling');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _dom = require('./misc/dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Possible enhancements:
//
//  * If the menu is close to a screen edge,
//    automatically reposition it so that it fits on the screen
//  * Maybe show menu immediately above the toggler
//    (like in Material design), not below it.
//
// https://material.google.com/components/menus.html

// This is to stretch the selected option `icon`
// to the appropriate `line-height` when `concise` mode is set.
// (And also to stretch the selected option with no `label`)
var Zero_width_space = '\u200B';

var Select = (_temp = _class = function (_PureComponent) {
	_inherits(Select, _PureComponent);

	function Select(props) {
		_classCallCheck(this, Select);

		// Shouldn't memory leak because
		// the set of options is assumed to be constant.
		var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

		_this.state = {};
		_this.options = {};

		_this.toggle = _this.toggle.bind(_this);
		_this.document_clicked = _this.document_clicked.bind(_this);
		_this.on_key_down = _this.on_key_down.bind(_this);

		_this.on_autocomplete_input_change = _this.on_autocomplete_input_change.bind(_this);
		_this.on_key_down_in_container = _this.on_key_down_in_container.bind(_this);

		var autocomplete = props.autocomplete,
		    options = props.options,
		    children = props.children,
		    menu = props.menu,
		    toggler = props.toggler,
		    onChange = props.onChange;


		if (autocomplete) {
			if (!options) {
				throw new Error('"options" property is required for an "autocomplete" select');
			}

			_this.state.filtered_options = options;
		}

		if (children && !menu) {
			_react2.default.Children.forEach(children, function (element) {
				if (!element.props.value) {
					throw new Error('You must specify "value" prop on each child of <Select/>');
				}

				if (!element.props.label) {
					throw new Error('You must specify "label" prop on each child of <Select/>');
				}
			});
		}

		if (menu && !toggler) {
			throw new Error('Supply a "toggler" component when enabling "menu" in <Select/>');
		}

		if (!menu && !onChange) {
			throw new Error('"onChange" property must be specified for <Select/>');
		}
		return _this;
	}

	// Client side rendering, javascript is enabled


	_createClass(Select, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			document.addEventListener('click', this.document_clicked);

			var fallback = this.props.fallback;


			if (fallback) {
				this.setState({ javascript: true });
			}
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(previous_props, previous_state) {
			var _state = this.state,
			    expanded = _state.expanded,
			    height = _state.height;


			if (expanded !== previous_state.expanded) {
				if (expanded && this.should_animate()) {
					if (height === undefined) {
						this.calculate_height();
					}
				}
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			document.removeEventListener('click', this.document_clicked);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    upward = _props.upward,
			    scroll = _props.scroll,
			    children = _props.children,
			    menu = _props.menu,
			    toggler = _props.toggler,
			    alignment = _props.alignment,
			    autocomplete = _props.autocomplete,
			    saveOnIcons = _props.saveOnIcons,
			    fallback = _props.fallback,
			    disabled = _props.disabled,
			    style = _props.style,
			    className = _props.className;
			var _state2 = this.state,
			    filtered_options = _state2.filtered_options,
			    expanded = _state2.expanded;

			var options = autocomplete ? filtered_options : this.props.options;

			var list_style = upward ? styles.list_upward : styles.list_downward;

			// Will be altered
			list_style = _extends({}, list_style);

			switch (alignment) {
				case 'left':
					list_style.left = 0;
					break;

				case 'right':
					list_style.right = 0;
					break;

				default:
					throw new Error('Unsupported alignment: "' + alignment + '"');
			}

			if (!menu && scroll && this.state.list_height !== undefined) {
				list_style.maxHeight = this.state.list_height + 'px';
			}

			var overflow = scroll && options && this.overflown();

			var list_items = void 0;

			// If a list of options is supplied as an array of `{ value, label }`,
			// then transform those elements to <buttons/>
			if (options) {
				list_items = options.map(function (_ref, index) {
					var value = _ref.value,
					    label = _ref.label,
					    icon = _ref.icon;

					return _this2.render_list_item({ index: index, value: value, label: label, icon: !saveOnIcons && icon, overflow: overflow });
				});
			}
			// Else, if a list of options is supplied as a set of child React elements,
			// then render those elements.
			else {
					list_items = _react2.default.Children.map(children, function (element, index) {
						return _this2.render_list_item({ index: index, element: element });
					});
				}

			var wrapper_style = _extends({}, styles.wrapper, { textAlign: alignment });

			var markup = _react2.default.createElement(
				'div',
				{
					ref: function ref(_ref4) {
						return _this2.select = _ref4;
					},
					onKeyDown: this.on_key_down_in_container,
					style: style ? _extends({}, wrapper_style, style) : wrapper_style,
					className: (0, _classnames2.default)(className, 'rrui__select', {
						'rrui__rich': fallback,
						'rrui__select--upward': upward,
						'rrui__select--expanded': expanded,
						'rrui__select--collapsed': !expanded,
						'rrui__select--disabled': disabled
					}) },
				!menu && this.render_selected_item(),
				menu && _react2.default.createElement(
					'div',
					{
						ref: function ref(_ref2) {
							return _this2.menu_toggler;
						},
						style: styles.menu_toggler },
					_react2.default.cloneElement(toggler, { onClick: this.toggle })
				),
				_react2.default.createElement(
					'ul',
					{
						ref: function ref(_ref3) {
							return _this2.list = _ref3;
						},
						style: list_style,
						className: (0, _classnames2.default)('rrui__select__options', {
							'rrui__select__options--expanded': expanded,
							'rrui__select__options--simple-left-aligned': !children && alignment === 'left',
							'rrui__select__options--simple-right-aligned': !children && alignment === 'right'
						}) },
					list_items
				),
				fallback && !this.state.javascript && this.render_static()
			);

			return markup;
		}
	}, {
		key: 'render_list_item',
		value: function render_list_item(_ref5) // , first, last
		{
			var _this3 = this;

			var index = _ref5.index,
			    element = _ref5.element,
			    value = _ref5.value,
			    label = _ref5.label,
			    icon = _ref5.icon,
			    overflow = _ref5.overflow;
			var _props2 = this.props,
			    disabled = _props2.disabled,
			    menu = _props2.menu,
			    scrollbarPadding = _props2.scrollbarPadding;
			var focused_option_value = this.state.focused_option_value;

			// If a list of options is supplied as a set of child React elements,
			// then extract values from their props.

			if (element) {
				value = element.props.value;
			}

			var is_focused = !menu && value === focused_option_value;

			var list_item_style = { textAlign: 'left' };

			var item_style = styles.list_item;

			// on overflow the vertical scrollbar will take up space
			// reducing padding-right and the only way to fix that
			// is to add additional padding-right
			//
			// a hack to restore padding-right taken up by a vertical scrollbar
			if (overflow && scrollbarPadding) {
				item_style = _extends({}, styles.list.item);

				item_style.marginRight = (0, _dom.get_scrollbar_width)() + 'px';
			}

			var button = void 0;

			// If a list of options is supplied as a set of child React elements,
			// then enhance those elements with extra props.
			if (element) {
				var extra_props = {
					style: _extends({}, item_style, element.props.style),
					className: (0, _classnames2.default)('rrui__select__option', {
						'rrui__select__option--focused': is_focused
					}, element.props.className)
				};

				var onClick = element.props.onClick;

				extra_props.onClick = function (event) {
					if (menu) {
						_this3.toggle();
					} else {
						_this3.item_clicked(value, event);
					}

					if (onClick) {
						onClick(event);
					}
				};

				button = _react2.default.cloneElement(element, extra_props);
			}
			// Else, if a list of options is supplied as an array of `{ value, label }`,
			// then transform those options to <buttons/>
			else {
					button = _react2.default.createElement(
						'button',
						{
							type: 'button',
							onClick: function onClick(event) {
								return _this3.item_clicked(value, event);
							},
							disabled: disabled,
							tabIndex: '-1',
							className: (0, _classnames2.default)('rrui__select__option', 'rrui__button__button', {
								'rrui__select__option--focused': is_focused
							}),
							style: item_style },
						icon && _react2.default.cloneElement(icon, { className: (0, _classnames2.default)(icon.props.className, 'rrui__select__option-icon') }),
						label
					);
				}

			// There can be an `undefined` value,
			// so just `{ value }` won't do here,
			// and `{ `${value}` }` is not ideal too,
			// because there theoretically can be a value `"undefined"`.
			var key = index + ' ' + value;

			// Using just `index` for `ref`s is safe
			// because when `key` changes then the `ref` is updated
			// so there won't be inconsistencies.
			var markup = _react2.default.createElement(
				'li',
				{
					key: key,
					ref: function ref(_ref6) {
						return _this3.options[index] = _ref6;
					},
					className: (0, _classnames2.default)({
						'rrui__select__separator-option': element && element.type === Select.Separator
					}),
					style: list_item_style },
				button
			);

			return markup;
		}
	}, {
		key: 'render_selected_item',
		value: function render_selected_item() {
			var _this4 = this;

			var _props3 = this.props,
			    children = _props3.children,
			    value = _props3.value,
			    label = _props3.label,
			    disabled = _props3.disabled,
			    autocomplete = _props3.autocomplete,
			    concise = _props3.concise;
			var _state3 = this.state,
			    expanded = _state3.expanded,
			    autocomplete_input_value = _state3.autocomplete_input_value;


			var selected_label = this.get_selected_option_label();

			if (autocomplete && expanded) {
				var _markup = _react2.default.createElement('input', {
					type: 'text',
					ref: function ref(_ref7) {
						return _this4.autocomplete = _ref7;
					},
					placeholder: selected_label || label,
					value: autocomplete_input_value,
					onChange: this.on_autocomplete_input_change,
					onKeyDown: this.on_key_down,
					className: (0, _classnames2.default)('rrui__select__selected', 'rrui__select__selected--autocomplete', {
						'rrui__select__selected--nothing': !selected_label
					}) });

				return _markup;
			}

			var selected = this.get_selected_option();

			var markup = _react2.default.createElement(
				'button',
				{
					ref: function ref(_ref8) {
						return _this4.selected = _ref8;
					},
					type: 'button',
					disabled: disabled,
					onClick: this.toggle,
					onKeyDown: this.on_key_down,
					className: (0, _classnames2.default)('rrui__select__selected', 'rrui__button__button', {
						'rrui__select__selected--nothing': !selected_label
					}) },
				Zero_width_space,
				concise && selected && selected.icon ? _react2.default.cloneElement(selected.icon, { title: selected_label }) : selected_label || label,
				_react2.default.createElement('div', {
					className: (0, _classnames2.default)('rrui__select__arrow', {
						'rrui__select__arrow--expanded': expanded
					}),
					style: styles.arrow })
			);

			return markup;
		}

		// supports disabled javascript

	}, {
		key: 'render_static',
		value: function render_static() {
			var _props4 = this.props,
			    name = _props4.name,
			    value = _props4.value,
			    label = _props4.label,
			    disabled = _props4.disabled,
			    options = _props4.options,
			    menu = _props4.menu,
			    toggler = _props4.toggler,
			    style = _props4.style,
			    className = _props4.className,
			    children = _props4.children;


			if (menu) {
				return _react2.default.createElement(
					'div',
					{ className: 'rrui__rich__fallback' },
					toggler
				);
			}

			var markup = _react2.default.createElement(
				'div',
				{ className: 'rrui__rich__fallback' },
				_react2.default.createElement(
					'select',
					{
						name: name,
						value: value === null ? undefined : value,
						disabled: disabled,
						onChange: function onChange(event) {},
						style: style ? _extends({}, style, { width: 'auto' }) : { width: 'auto' },
						className: className },
					options ? options.map(function (item, i) {
						return _react2.default.createElement(
							'option',
							{
								className: 'rrui__select__option',
								key: i + ' ' + item.value,
								value: item.value },
							item.label
						);
					}) : _react2.default.Children.map(children, function (child) {
						return _react2.default.createElement(
							'option',
							{
								className: 'rrui__select__option',
								key: child.props.value,
								value: child.props.value },
							child.props.label
						);
					})
				)
			);

			return markup;
		}
	}, {
		key: 'get_selected_option',
		value: function get_selected_option() {
			var value = this.props.value;


			return this.get_option(value);
		}
	}, {
		key: 'get_option',
		value: function get_option(value) {
			var _props5 = this.props,
			    options = _props5.options,
			    children = _props5.children;


			if (options) {
				return options.filter(function (x) {
					return x.value === value;
				})[0];
			}

			var option = void 0;

			_react2.default.Children.forEach(children, function (child) {
				if (child.props.value === value) {
					option = child;
				}
			});

			return option;
		}
	}, {
		key: 'get_option_index',
		value: function get_option_index(option) {
			var _props6 = this.props,
			    options = _props6.options,
			    children = _props6.children;


			if (options) {
				return options.indexOf(option);
			}

			var option_index = void 0;

			_react2.default.Children.forEach(children, function (child, index) {
				if (child.props.value === option.value) {
					option_index = index;
				}
			});

			return option_index;
		}
	}, {
		key: 'get_selected_option_label',
		value: function get_selected_option_label() {
			var options = this.props.options;


			var selected = this.get_selected_option();

			if (!selected) {
				return;
			}

			if (options) {
				return selected.label;
			}

			return selected.props.label;
		}
	}, {
		key: 'overflown',
		value: function overflown() {
			return this.props.options.length > this.props.maxItems;
		}
	}, {
		key: 'scrollable_list_height',
		value: function scrollable_list_height() {
			var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state;

			return (state.height - 2 * state.vertical_padding) * (this.props.maxItems / this.props.options.length) + state.vertical_padding;
		}
	}, {
		key: 'should_animate',
		value: function should_animate() {
			return true;

			// return this.props.options.length >= this.props.transition_item_count_min
		}
	}, {
		key: 'toggle',
		value: function toggle(event) {
			var _this5 = this;

			var toggle_options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			if (event) {
				// Don't navigate away when clicking links
				event.preventDefault();

				// Not discarding the click event because
				// other expanded selects may be listening to it.
				// // Discard the click event so that it won't reach `document` click listener
				// event.stopPropagation() // doesn't work
				// event.nativeEvent.stopImmediatePropagation()
			}

			var _props7 = this.props,
			    disabled = _props7.disabled,
			    autocomplete = _props7.autocomplete,
			    options = _props7.options,
			    value = _props7.value,
			    focusUponSelection = _props7.focusUponSelection,
			    onToggle = _props7.onToggle;


			if (disabled) {
				return;
			}

			var expanded = this.state.expanded;


			if (!expanded && autocomplete) {
				this.setState({
					autocomplete_input_value: '',
					filtered_options: options
				});
			}

			// Deferring expanding the select upon click
			// because document.onClick should finish first,
			// otherwise `event.target` may be detached from the DOM
			// and it would immediately toggle back to collapsed state.
			setTimeout(function () {
				_this5.setState({
					expanded: !expanded
				});

				if (!expanded && options) {
					// Focus either the selected option
					// or the first option in the list.

					var focused_option_value = value || options[0].value;

					_this5.setState({ focused_option_value: focused_option_value });

					// Scroll down to the focused option
					_this5.scroll_to(_this5.get_option(focused_option_value));
				}

				// If it's autocomplete, then focus <input/> field
				// upon toggling the select component.
				if (autocomplete && !toggle_options.dont_focus_after_toggle) {
					if (!expanded || expanded && focusUponSelection) {
						setTimeout(function () {
							// Focus the toggler
							if (expanded) {
								_this5.selected.focus();
							} else {
								_this5.autocomplete.focus();
							}
						}, 0);
					}
				}

				if (onToggle) {
					onToggle(!expanded);
				}

				if (toggle_options.callback) {
					toggle_options.callback();
				}
			}, 0);
		}
	}, {
		key: 'item_clicked',
		value: function item_clicked(value, event) {
			if (event) {
				event.preventDefault();
			}

			var _props8 = this.props,
			    disabled = _props8.disabled,
			    onChange = _props8.onChange,
			    autocomplete = _props8.autocomplete,
			    focusUponSelection = _props8.focusUponSelection;


			if (disabled) {
				return;
			}

			// Focus the toggler
			if (focusUponSelection) {
				if (autocomplete) {
					this.autocomplete.focus();
				} else {
					this.selected.focus();
				}
			}

			this.toggle(undefined, { callback: function callback() {
					return onChange(value);
				} });
		}
	}, {
		key: 'document_clicked',
		value: function document_clicked(event) {
			var autocomplete = _reactDom2.default.findDOMNode(this.autocomplete);
			var selected_option = _reactDom2.default.findDOMNode(this.selected);
			var options_list = _reactDom2.default.findDOMNode(this.list);

			// Don't close the select if its expander button has been clicked,
			// or if autocomplete has been clicked,
			// or if an option was selected from the list.
			if ((0, _dom.is_reachable)(event.target, options_list) || autocomplete && (0, _dom.is_reachable)(event.target, autocomplete) || selected_option && (0, _dom.is_reachable)(event.target, selected_option)) {
				return;
			}

			this.setState({ expanded: false });

			var onToggle = this.props.onToggle;


			if (onToggle) {
				onToggle(false);
			}
		}

		// Would have used `onBlur()` handler here
		// with `is_reachable(event.relatedTarget, container)`,
		// but it has an IE bug in React.
		// https://github.com/facebook/react/issues/3751
		//
		// Therefore, using the hacky `document.onClick` handlers
		// and this `onKeyDown` Tab handler
		// until `event.relatedTarget` support is consistent in React.
		//

	}, {
		key: 'on_key_down_in_container',
		value: function on_key_down_in_container(event) {
			if (event.ctrlKey || event.altKey || event.shiftKey || event.metaKey) {
				return;
			}

			var expanded = this.state.expanded;


			switch (event.keyCode) {
				// Toggle on Tab out
				case 9:
					if (expanded) {
						this.toggle(undefined, { dont_focus_after_toggle: true });

						var onTabOut = this.props.onTabOut;


						if (onTabOut) {
							onTabOut(event);
						}
					}
					return;
			}
		}
	}, {
		key: 'on_key_down',
		value: function on_key_down(event) {
			var _this6 = this;

			if (event.ctrlKey || event.altKey || event.shiftKey || event.metaKey) {
				return;
			}

			var _props9 = this.props,
			    options = _props9.options,
			    value = _props9.value,
			    autocomplete = _props9.autocomplete;
			var _state4 = this.state,
			    expanded = _state4.expanded,
			    focused_option_value = _state4.focused_option_value;

			// Maybe add support for `children` arrow navigation in future

			if (options) {
				switch (event.keyCode) {
					// Select the previous option (if present) on up arrow
					case 38:
						event.preventDefault();

						var previous = this.previous_focusable_option();

						if (previous) {
							this.show_option(previous, 'top');
							return this.setState({ focused_option_value: previous.value });
						}

						return;

					// Select the next option (if present) on down arrow
					case 40:
						event.preventDefault();

						var next = this.next_focusable_option();

						if (next) {
							this.show_option(next, 'bottom');
							return this.setState({ focused_option_value: next.value });
						}

						return;

					// Collapse on Escape
					//
					// Maybe add this kind of support for "Escape" key in some future:
					//  hiding the item list, cancelling current item selection process
					//  and restoring the selection present before the item list was toggled.
					//
					case 27:
						// Collapse the list if it's expanded
						if (this.state.expanded) {
							this.toggle();

							// Restore focus when the list is collapsed
							setTimeout(function () {
								_this6.selected.focus();
							}, 0);
						}

						return;

					// on Enter
					case 13:
						// Choose the focused item on Enter
						if (expanded) {
							event.preventDefault();

							// If an item is focused
							// (which may not be a case
							//  when autocomplete is matching no items)
							// (still for non-autocomplete select
							//  it is valid to have a default option)
							if (this.get_options() && this.get_options().length > 0) {
								// Choose the focused item
								this.item_clicked(focused_option_value);
								// And collapse the select
								this.toggle();
							}
						}
						// Else it should have just submitted the form on Enter,
						// but it wouldn't because the select element activator is a <button/>
						// therefore hitting Enter while being focused on it just pushes that button.
						// So submit the enclosing form manually.
						else {
								if ((0, _dom.submit_parent_form)(_reactDom2.default.findDOMNode(this.select))) {
									event.preventDefault();
								}
							}

						return;

					// on Spacebar
					case 32:
						// Choose the focused item on Enter
						if (expanded) {
							// only if it it's an `options` select
							// and also if it's not an autocomplete
							if (this.get_options() && !autocomplete) {
								event.preventDefault();

								// `focused_option_value` could be non-existent
								// in case of `autocomplete`, but since
								// we're explicitly not handling autocomplete here
								// it is valid to select any options including the default ones.
								this.item_clicked(focused_option_value);
								this.toggle();
							}
						}
						// Expand the select otherwise
						else {
								event.preventDefault();
								this.toggle();
							}

						return;
				}
			}
		}
	}, {
		key: 'get_options',
		value: function get_options() {
			var _props10 = this.props,
			    autocomplete = _props10.autocomplete,
			    options = _props10.options;
			var filtered_options = this.state.filtered_options;


			return autocomplete ? filtered_options : options;
		}

		// Get the previous value (relative to the currently focused value)

	}, {
		key: 'previous_focusable_option',
		value: function previous_focusable_option() {
			var options = this.get_options();
			var focused_option_value = this.state.focused_option_value;


			var i = 0;
			while (i < options.length) {
				if (options[i].value === focused_option_value) {
					if (i - 1 >= 0) {
						return options[i - 1];
					}
				}
				i++;
			}
		}

		// Get the next value (relative to the currently focused value)

	}, {
		key: 'next_focusable_option',
		value: function next_focusable_option() {
			var options = this.get_options();
			var focused_option_value = this.state.focused_option_value;


			var i = 0;
			while (i < options.length) {
				if (options[i].value === focused_option_value) {
					if (i + 1 < options.length) {
						return options[i + 1];
					}
				}
				i++;
			}
		}

		// Scrolls to an option having the value

	}, {
		key: 'scroll_to',
		value: function scroll_to(option) {
			var index = this.get_option_index(option);
			var option_element = _reactDom2.default.findDOMNode(this.options[index]);
			_reactDom2.default.findDOMNode(this.list).scrollTop = option_element.offsetTop;
		}

		// Fully shows an option (scrolls to it if neccessary)

	}, {
		key: 'show_option',
		value: function show_option(option, gravity) {
			var index = this.get_option_index(option);
			var option_element = _reactDom2.default.findDOMNode(this.options[index]);
			var list = _reactDom2.default.findDOMNode(this.list);

			switch (gravity) {
				case 'top':
					if (option_element.offsetTop < list.scrollTop) {
						list.scrollTop = option_element.offsetTop;
					}
					return;

				case 'bottom':
					if (option_element.offsetTop + option_element.offsetHeight > list.scrollTop + list.offsetHeight) {
						list.scrollTop = option_element.offsetTop + option_element.offsetHeight - list.offsetHeight;
					}
					return;
			}
		}

		// Calculates height of the expanded item list

	}, {
		key: 'calculate_height',
		value: function calculate_height() {
			var list_dom_node = _reactDom2.default.findDOMNode(this.list);
			var border = parseInt(window.getComputedStyle(list_dom_node).borderTopWidth);
			var height = list_dom_node.scrollHeight; // + 2 * border // inner height + 2 * border

			var vertical_padding = parseInt(window.getComputedStyle(list_dom_node.firstChild).paddingTop);

			// const images = list_dom_node.querySelectorAll('img')

			// if (images.length > 0)
			// {
			// 	return this.preload_images(list_dom_node, images)
			// }

			var state = { height: height, vertical_padding: vertical_padding, border: border };

			if (!this.props.menu && this.props.scroll && this.props.options && this.overflown()) {
				state.list_height = this.scrollable_list_height(state);
			}

			this.setState(state);
		}
	}, {
		key: 'get_widest_label_width',
		value: function get_widest_label_width() {
			return this.props.styles.autocompleteWidth;
		}
	}, {
		key: 'on_autocomplete_input_change',
		value: function on_autocomplete_input_change(event) {
			var input = event.target.value;

			var options = this.props.options;


			var filtered_options = options.filter(function (_ref9) {
				var value = _ref9.value,
				    label = _ref9.label,
				    verbose = _ref9.verbose,
				    icon = _ref9.icon;

				return (verbose || label).toLowerCase().indexOf(input.toLowerCase()) !== -1;
			});

			this.setState({
				autocomplete_input_value: input,
				filtered_options: filtered_options,
				focused_option_value: filtered_options.length > 0 ? filtered_options[0].value : undefined
			});
		}

		// // https://github.com/daviferreira/react-sanfona/blob/master/src/AccordionItem/index.jsx#L54
		// // Wait for images to load before calculating maxHeight
		// preload_images(node, images)
		// {
		// 	let images_loaded = 0
		//
		// 	const image_loaded = () =>
		// 	{
		// 		images_loaded++
		//
		// 		if (images_loaded === images.length)
		// 		{
		// 			this.setState
		// 			({
		// 				height: this.props.expanded ? node.scrollHeight : 0
		// 			})
		// 		}
		// 	}
		//
		// 	for (let i = 0; i < images.length; i += 1)
		// 	{
		// 		const image = new Image()
		// 		image.src = images[i].src
		// 		image.onload = image.onerror = image_loaded
		// 	}
		// }

	}]);

	return Select;
}(_react.PureComponent), _class.propTypes = {
	// A list of selectable options
	options: _react.PropTypes.arrayOf(_react.PropTypes.shape({
		// Option value
		value: _react2.default.PropTypes.string,
		// Option label
		label: _react2.default.PropTypes.string,
		// Option icon
		icon: _react2.default.PropTypes.node
	})),

	// HTML form input `name` attribute
	name: _react.PropTypes.string,

	// Default label (like "Choose")
	label: _react.PropTypes.string,

	// Show icon only for selected item,
	// and only if `concise` is `true`.
	saveOnIcons: _react.PropTypes.bool,

	// Disables this control
	disabled: _react.PropTypes.bool,

	// Selected option value
	value: _react.PropTypes.any,

	// Is called when an option is selected
	onChange: _react.PropTypes.func,

	// (exotic use case)
	// Falls back to a plain HTML input
	// when javascript is disabled (e.g. Tor)
	fallback: _react.PropTypes.bool.isRequired,

	// CSS class
	className: _react.PropTypes.string,

	// CSS style object
	style: _react.PropTypes.object,

	// If this flag is set to `true`,
	// and `icon` is specified for a selected option,
	// then the selected option will be displayed
	// as icon only, without the label.
	concise: _react.PropTypes.bool,

	// If set to `true`, autocompletion is available
	// upon expanding the options list.
	autocomplete: _react.PropTypes.bool,

	// Options list alignment ("left", "right")
	alignment: _react.PropTypes.oneOf(['left', 'right']),

	// If `menu` flag is set to `true`
	// then it's gonna be a dropdown menu
	// with `children` elements inside.
	menu: _react.PropTypes.bool,

	// If `menu` flag is set to `true`
	// then `toggler` is the dropdown menu button.
	toggler: _react.PropTypes.element,

	// If `scroll` is `false`, then options list
	// is not limited in height.
	// Is `true` by default (scrollable).
	scroll: _react.PropTypes.bool.isRequired,

	// If this flag is set to `true`,
	// then the dropdown expands itself upward.
	// (as opposed to the default downward)
	upward: _react.PropTypes.bool,

	// Maximum items fitting the options list height (scrollable).
	// Is `6` by default.
	maxItems: _react.PropTypes.number.isRequired,

	// Is `true` by default (only when the list of options is scrollable)
	scrollbarPadding: _react.PropTypes.bool,

	focusUponSelection: _react.PropTypes.bool.isRequired,

	onTabOut: _react.PropTypes.func,

	onToggle: _react.PropTypes.func

	// transition_item_count_min : PropTypes.number,
	// transition_duration_min : PropTypes.number,
	// transition_duration_max : PropTypes.number
}, _class.defaultProps = {
	alignment: 'left',

	scroll: true,

	maxItems: 6,

	scrollbarPadding: true,

	focusUponSelection: true,

	fallback: false

	// transition_item_count_min : 1,
	// transition_duration_min : 60, // milliseconds
	// transition_duration_max : 100 // milliseconds
}, _temp);
exports.default = Select;


Select.Separator = function (props) {
	return _react2.default.createElement('div', { className: 'rrui__select__separator', style: styles.separator });
};

var styles = (0, _reactStyling.flat)(_templateObject);
//# sourceMappingURL=select.js.map