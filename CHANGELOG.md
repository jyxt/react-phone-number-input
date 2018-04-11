1.0.0 / 21.03.2018
===================

  * (breaking change) Rewrote `Input.js` — there is a possibility that something could potentially break for users coming from previous versions.

  * (breaking change) No longer exporting `libphonenumber-js` functions.

  * (breaking change) `dictionary`'s `"International"` key renamed to `"ZZ"`.

  * (breaking change) `dictionary` property renamed to `labels`.

  * (breaking change) `nativeExpanded` property renamed to `nativeCountrySelect`.

  * (breaking change) `selectTabIndex` property renamed to `countrySelectTabIndex`.

  * (breaking change) `selectMaxItems` property renamed to `countrySelectMaxItems`.

  * (breaking change) `selectAriaLabel` property renamed to `countrySelectAriaLabel`.

  * (breaking change) `selectCloseAriaLabel` property renamed to `countrySelectCloseAriaLabel`.

  * (breaking change) `selectComponent` property renamed to `countrySelectComponent`

  * (breaking change) `flagComponent`'s `countryCode` property was renamed to just `country`.

  * (breaking change) Renamed `countries with flags.js` to `flags.js` and put them in the root folder.

  * (breaking change) `flags` property changed: it can no longer be a `boolean` and can only be an object of flag `React.Component`s.

  * (breaking change) `selectStyle` and `inputStyle` properties removed (due to not being used).

  * (breaking change) `inputTabIndex` property removed (use `tabIndex` instead).

  * (breaking change) `onCountryChange` property removed (no one actually used it).

  * (breaking change) `convertToNational` property renamed to `displayInitialValueAsLocalNumber`.

  * (breaking change) `style.css` changed a bit (to accomodate phone number extension field).

  * (breaking change) If someone did override `.rrui__input:not(.rrui__input--multiline)` CSS rule then now it has been split into two CSS rules: `.rrui__input` and `.rrui__input--multiline`.

  * Added `locale`s for the `labels` property (`ru` and `en`).

  * Added `ext` property for phone number extension input.

0.17.0 / 24.02.2018
===================

  * (breaking change) Fixed SVG flag icons for IE. This alters the markup a bit: `<img/>` is now wrapped in a `<div/>` and the CSS class of the image becomes the CSS class of the div and also a new CSS class for the image is added. This could hypothetically be a breaking change in some advanced use cases hence the major version bump.

  * Fixed `<Select/>` scrolling to the top of the page in IE <= 11.

  * Fixed validation error margin left.

0.16.0 / 22.02.2018
===================

  * Updated `libphonenumber-js` to `1.0.x`.
  * `parsePhoneNumber()`, `isValidPhoneNumber()` and `formatPhoneNumber()` no longer accept `undefined` phone number argument: it must be either a `string` or a parsed number `object` having a `string` `phone` property.

0.15.0 / 10.10.2017
===================

  * Added `error` and `indicateInvalid` properties for displaying error label.

  * (CSS breaking change) `react-phone-number-input` `<div/>` is now wrapped by another `<div/>` and its CSS class name changed to `react-phone-number-input__row` and `react-phone-number-input` CSS class name goes to the wrapper.

0.14.0 / 04.10.2017
===================

  * Returning `<input/>` `type` back to `tel`. There used to be reports previously that `input="tel"` `<input/>`s on some non-stock Android devices with non-stock keyboards had issues with proper caret positioning during input. Well, those are non-stock Android bugs and therefore they should fix those there. `type="tel"` is better in terms of the digital input keyboard so it's now a default. Still can be overridden by passing `type="text"` property.

0.13.0 / 20.09.2017
===================

This release contains some minor CSS class names refactoring which most likely won't introduce any issues in almost but all use cases.

(CSS breaking change) Refactored `<Select/>` CSS class names in `react-responsive-ui`:

  * `.rrui__select__selected--autocomplete` -> `.rrui__select__autocomplete`

  * `.rrui__select__selected` -> `.rrui__select__button`

  * `.rrui__select__selected--nothing` -> `.rrui__select__button--empty`

  * `.rrui__select__selected--expanded` -> `.rrui__select__button--expanded`

  * `.rrui__select__selected--disabled` -> `.rrui__select__button--disabled`

(CSS breaking change) Added `.rrui__text-input__input` CSS class to the phone number `<input/>`.

(CSS breaking change) Added global `.rrui__text-input__input` styles to `style.css`

0.12.1 / 27.07.2017
===================

  * Due to the [reports](https://github.com/catamphetamine/react-phone-number-input/issues/59) stating that `type="tel"` caret positioning doesn't work on Samsung devices the component had to revert back to `type="text"` by default (one can pass `type="tel"` property directly though).

0.12.0 / 25.07.2017
===================

  * (breaking change) The default value of `convertToNational` property changed from `true` to `false`. The reason is that the newer generation grows up when there are no stationary phones and therefore everyone inputs phone numbers with a `+` in their smartphones so local phone numbers should now be considered obsolete.

0.11.3 / 16.05.2017
===================

  * Now alphabetically sorting the supplied custom country names

0.11.2 / 12.05.2017
===================

  * Fixed a bug when `value` was not set to `undefined` when the `<input/>` value was empty
  * Added `selectMaxItems` property for customizing the country select height

0.11.0 / 03.05.2017
===================

  * (CSS breaking change) Removed vertical padding from the first and the last `<Select/>` `<li/>` options and moved it to `.rrui__select__options` `<ul/>` itself. So if someone customized `.rrui__select__options-list-item:first-child` and `.rrui__select__options-list-item:last-child` vertical padding then those padding customizations should be moved to `.rrui__select__options` itself.
  * (CSS breaking change) Added `.rrui__select__option:hover` and `.rrui__select__option--focused:hover` background color for better UX.

0.10.0 / 18.04.2017
===================

  * (might be a breaking change) Slightly refactored the component CSS improving it in a couple of places along with adding comments to it (see `style.css`).
  * Added country code validation.

0.9.1 / 16.04.2017
==================

  * (breaking change) Moved the `.css` file to the root folder of the package and **split it into two files** (the `rrui` one is not required when already using `react-responsive-ui`). `import`ing the CSS file via Webpack is the recommended way to go now.
  * (breaking change) Vendor prefixes dropped in favour of manually using autoprefixers.

0.8.10 / 15.04.2017
===================

  * Added support for externally changing `value` property

0.8.5 / 06.04.2017
==================

  * Added `inputTabIndex` and `selectTabIndex` settings

0.8.5 / 05.04.2017
==================

  * Added `nativeExpanded` setting for native country `<select/>`

0.8.1 / 27.03.2017
==================

  * The `.valid` property has been removed from "as you type" formatter, therefore dropping the `.react-phone-number-input__phone--valid` CSS class. This doesn't affect functionality in any way nor does it break existing code therefore it's a "patch" version upgrade.

0.8.0 / 17.03.2017
==================

  * (could be a breaking change) Moving CSS positioning properties from inline styles to the CSS file therefore if using an edited CSS file from older versions (when not doing it via Webpack `require(...)`) update styles for `.rrui__select` and `.rrui__select__options`. As well as `.rrui__expandable` and `.rrui__shadow` have been added. Maybe (and most likely) something else, so better re-copy the entire CSS file.

0.7.11 / 16.03.2017
===================

  * Fixed a small bug when an initially passed phone number `value` wasn't checked for country autodetection
  * A small enhancement: when an international phone number is erased to a single `+` then the currently selected country is reset. And, analogous, when a country is selected, and the input is empty, and then the user enters a single `+` sign — the country is reset too.

0.7.9 / 12.03.2017
==================

  * Fixed a small bug when the `country` property was set after page load programmatically and that caused the input taking focus (which displayed a keyboard on mobile devices)

0.7.5 / 22.02.2017
==================

  * `@JeandeCampredon` fixed `Const declarations are not supported in strict mode` in module exports

0.7.1 / 28.01.2017
==================

  * Added custom metadata feature (now developers have a way to reduce the resulting bundle size in case they decide they need that)
  * `lockCountry` property removed (use `countries={[country]}` instead)
  * Added `international` boolean property to explicitly indicate whether to show the "International" option in the list of countries
  * Not showing country `<Select/>` when `countries.length === 1` or `countries.length === 0`
  * `countries` property can now only be an array of country codes

0.6.13 / 28.01.2017
===================

  * Fixed the flags bug introduced by adding `flags={ false }` option

0.6.12 / 27.01.2017
===================

  * Added `flags={ false }` option

0.6.11 / 26.01.2017
===================

  * Added `lockCountry` option
  * Added a possibility to specify `countries` as an array of country codes
  * Fixed country selection on `country` property update

0.6.8 / 03.01.2017
===================

  * Optimized performance on mobile devices

0.6.6 / 30.12.2016
===================

  * Added a bunch of CSS classes: `react-phone-number-input`, `react-phone-number-input--valid`, `react-phone-number-input__country`, `react-phone-number-input__phone`, `react-phone-number-input__phone--valid`

0.6.5 / 28.12.2016
===================

  * Now hiding the phone input while the country select is open

0.6.1 / 24.12.2016
===================

  * Fixed collapsed select options being interactive in iOS 8 Safari

0.6.0 / 23.12.2016
===================

  * A complete rewrite. Now supports all countries, all formats are hard-coded from Google Android's `libphonenumber` library.

0.5.4 / 11.12.2016
===================

  * Hong Kong phone numbers fix by @nchan0154

0.5.3 / 15.11.2016
===================

  * Added some popular country formats (and stubs for other countries)
  * Small bug fix for trunk prefixed phone numbers

0.5.0 / 14.11.2016
===================

  * `format` prop is now not required for the React component. If `format` is not specified then the input switches itself into "auto" (iPhone style) mode.
  * input code rewrite

0.4.0 / 15.09.2016
===================

  * (breaking change) `digits` passed to the `template()` function don't include trunk prefix anymore
  * Introduced custom `valid(digits)` phone number validation function for phone number format

0.3.0 / 07.09.2016
===================

  * `format_phone_number` (aka `formatPhoneNumber`) function now formats phone number internationally (with country code) if no `format` argument was supplied (it tries to autodetect the correct phone number format from the phone number itself)

  * Added `country(phone)` function

  * Added `country_from_locale(locale)` (aka `countryFromLocale(locale)`) function

0.2.11 / 06.09.2016
===================

  * Added `parse_phone_number` (aka `parsePhoneNumber`) function

0.2.10 / 04.09.2016
===================

  * Added `plaintext_local` (aka `plaintextLocal`) and `plaintext_international` (aka `plaintextInternational`) methods

0.2.0 / 03.09.2016
==================

  * Added custom phone formats
  * Refactoring
  * Removed `format_phone_number_international` (aka `formatPhoneNumberInternational`)

0.1.20 / 19.08.2016
===================

  * Added `disabled` property

0.1.18 / 11.08.2016
===================

  * Added `name` property (for javascriptless websites)

0.1.0 / 15.07.2016
===================

  * Initial release