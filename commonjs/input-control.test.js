'use strict';

var _inputControl = require('./input-control');

var _countries = require('./countries');

var _metadata = require('libphonenumber-js/metadata.min');

var _metadata2 = _interopRequireDefault(_metadata);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('input-control', function () {
	it('should get pre-selected country', function () {
		// Can't return "International". Return the first country available.
		(0, _inputControl.getPreSelectedCountry)({}, null, ['US', 'RU'], false, _metadata2.default).should.equal('US');

		// Can return "International".
		// Country can't be derived from the phone number.
		expect((0, _inputControl.getPreSelectedCountry)({}, undefined, ['US', 'RU'], true, _metadata2.default)).to.be.undefined;

		// Derive country from the phone number.
		(0, _inputControl.getPreSelectedCountry)({ country: 'RU', phone: '8005553535' }, null, ['US', 'RU'], false, _metadata2.default).should.equal('RU');

		// Country derived from the phone number overrides the supplied one.
		(0, _inputControl.getPreSelectedCountry)({ country: 'RU', phone: '8005553535' }, 'US', ['US', 'RU'], false, _metadata2.default).should.equal('RU');
	});

	it('should generate country select options', function () {
		// Without custom country names.
		(0, _inputControl.getCountrySelectOptions)(['US', 'RU'], null, false).should.deep.equal([{
			value: 'RU',
			label: 'Russia (Россия)'
		}, {
			value: 'US',
			label: 'United States'
		}]);

		// With custom country names.
		(0, _inputControl.getCountrySelectOptions)(['US', 'RU'], { 'RU': 'Russia' }, false).should.deep.equal([{
			value: 'RU',
			label: 'Russia'
		}, {
			value: 'US',
			label: 'United States'
		}]);

		// With "International" (without custom country names).
		(0, _inputControl.getCountrySelectOptions)(['US', 'RU'], null, true).should.deep.equal([{
			label: 'International'
		}, {
			value: 'RU',
			label: 'Russia (Россия)'
		}, {
			value: 'US',
			label: 'United States'
		}]);

		// With "International" (with custom country names).
		(0, _inputControl.getCountrySelectOptions)(['US', 'RU'], { 'RU': 'Russia', ZZ: 'Intl' }, true).should.deep.equal([{
			label: 'Intl'
		}, {
			value: 'RU',
			label: 'Russia'
		}, {
			value: 'US',
			label: 'United States'
		}]);
	});

	it('should parse phone number character', function () {
		// Accepts leading `+`.
		(0, _inputControl.parsePhoneNumberCharacter)('+').should.equal('+');

		// Doesn't accept non-leading `+`.
		expect((0, _inputControl.parsePhoneNumberCharacter)('+', '+')).to.be.undefined;

		// Parses digits.
		(0, _inputControl.parsePhoneNumberCharacter)('1').should.equal('1');

		// Parses non-European digits.
		(0, _inputControl.parsePhoneNumberCharacter)('٤').should.equal('4');

		// Dismisses other characters.
		expect((0, _inputControl.parsePhoneNumberCharacter)('-')).to.be.undefined;
	});

	it('should format parsed input value', function () {
		var result = void 0;

		// National input.
		result = (0, _inputControl.formatPhoneNumber)('880055535', 'RU', _metadata2.default);
		result.text.should.equal('8 (800) 555-35');
		result.template.should.equal('x (xxx) xxx-xx-xx');

		// International input, no country.
		result = (0, _inputControl.formatPhoneNumber)('+780055535', null, _metadata2.default);
		result.text.should.equal('+7 800 555 35');
		result.template.should.equal('xx xxx xxx xx xx');

		// International input, with country.
		result = (0, _inputControl.formatPhoneNumber)('+780055535', 'RU', _metadata2.default);
		result.text.should.equal('+7 800 555 35');
		result.template.should.equal('xx xxx xxx xx xx');
	});

	it('should parse phone numbers', function () {
		(0, _inputControl.parsePhoneNumber)('+78005553535', _metadata2.default).should.deep.equal({
			country: 'RU',
			phone: '8005553535'
		});

		// No `value` passed.
		(0, _inputControl.parsePhoneNumber)(null, _metadata2.default).should.deep.equal({});
	});

	it('should generate national number digits', function () {
		(0, _inputControl.generateNationalNumberDigits)({
			country: 'FR',
			phone: '509758351'
		}, _metadata2.default).should.equal('0509758351');
	});

	it('should migrate parsed input for new country', function () {
		// No input. Returns `undefined`.
		(0, _inputControl.migrateParsedInputForNewCountry)('', 'RU', 'US', _metadata2.default).should.equal('');

		// Switching from "International" to a country
		// to which the phone number already belongs to.
		// No changes. Returns `undefined`.
		(0, _inputControl.migrateParsedInputForNewCountry)('+18005553535', null, 'US', _metadata2.default).should.equal('+18005553535');

		// Switching between countries. National number. No changes.
		(0, _inputControl.migrateParsedInputForNewCountry)('8005553535', 'RU', 'US', _metadata2.default).should.equal('8005553535');

		// Switching from "International" to a country.
		(0, _inputControl.migrateParsedInputForNewCountry)('+78005553535', null, 'US', _metadata2.default).should.equal('+18005553535');

		// Switching countries. International number.
		(0, _inputControl.migrateParsedInputForNewCountry)('+78005553535', 'RU', 'US', _metadata2.default).should.equal('+18005553535');

		// Switching countries. International number.
		// Country calling code is longer than the amount of digits available.
		(0, _inputControl.migrateParsedInputForNewCountry)('+99', 'KG', 'US', _metadata2.default).should.equal('+1');

		// Switching countries. International number. No such country code.
		(0, _inputControl.migrateParsedInputForNewCountry)('+99', 'KG', 'US', _metadata2.default).should.equal('+1');

		// Switching to "International". National number.
		(0, _inputControl.migrateParsedInputForNewCountry)('8800555', 'RU', null, _metadata2.default).should.equal('+7800555');

		// Switching to "International". International number. No changes.
		(0, _inputControl.migrateParsedInputForNewCountry)('+78005553535', 'RU', null, _metadata2.default).should.equal('+78005553535');
	});

	it('should format phone number in e164', function () {
		// No number.
		expect((0, _inputControl.e164)()).to.be.undefined;

		// International number. Just a '+' sign.
		expect((0, _inputControl.e164)('+')).to.be.undefined;

		// International number.
		(0, _inputControl.e164)('+7800').should.equal('+7800');

		// National number. Without country.
		expect((0, _inputControl.e164)('8800', null)).to.be.undefined;

		// National number. With country. Just national prefix.
		expect((0, _inputControl.e164)('8', 'RU', _metadata2.default)).to.be.undefined;

		// National number. With country. Just national prefix.
		(0, _inputControl.e164)('8800', 'RU', _metadata2.default).should.equal('+7800');
	});

	it('should get country for parsed input', function () {
		// Just a '+' sign.
		(0, _inputControl.getCountryForParsedInput)('+', 'RU', ['US', 'RU'], true, _metadata2.default).should.equal('RU');
		expect((0, _inputControl.getCountryForParsedInput)('+', undefined, ['US', 'RU'], true, _metadata2.default)).to.be.undefined;

		// A country can be derived.
		(0, _inputControl.getCountryForParsedInput)('+78005553535', undefined, ['US', 'RU'], true, _metadata2.default).should.equal('RU');

		// A country can't be derived yet.
		// And the currently selected country doesn't fit the number.
		expect((0, _inputControl.getCountryForParsedInput)('+7', 'FR', ['FR', 'RU'], true, _metadata2.default)).to.be.undefined;
		expect((0, _inputControl.getCountryForParsedInput)('+7800', 'FR', ['FR', 'RU'], true, _metadata2.default)).to.be.undefined;

		// A country can't be derived yet.
		// And the currently selected country doesn't fit the number.
		// Bit "International" option is not available.
		(0, _inputControl.getCountryForParsedInput)('+7', 'FR', ['FR', 'RU'], false, _metadata2.default).should.equal('FR');
		(0, _inputControl.getCountryForParsedInput)('+7800', 'FR', ['FR', 'RU'], false, _metadata2.default).should.equal('FR');
	});

	it('should get country from possibly incomplete international phone number', function () {
		// `001` country calling code.
		expect((0, _inputControl.get_country_from_possibly_incomplete_international_phone_number)('+800', _metadata2.default)).to.be.undefined;

		// Country can be derived.
		(0, _inputControl.get_country_from_possibly_incomplete_international_phone_number)('+33', _metadata2.default).should.equal('FR');

		// Country can't be derived yet.
		expect((0, _inputControl.get_country_from_possibly_incomplete_international_phone_number)('+7800', _metadata2.default)).to.be.undefined;
	});

	it('should compare strings', function () {
		(0, _inputControl.compare_strings)('aa', 'ab').should.equal(-1);
		(0, _inputControl.compare_strings)('aa', 'aa').should.equal(0);
		(0, _inputControl.compare_strings)('aac', 'aab').should.equal(1);
	});

	it('should determine whether to show "International" option', function () {
		(0, _inputControl.has_international_option)(['US', 'RU'], false).should.equal(false);
		(0, _inputControl.has_international_option)(['US', 'RU'], true).should.equal(true);
		(0, _inputControl.has_international_option)(['US', 'RU']).should.equal(false);
		(0, _inputControl.has_international_option)(_countries.countries).should.equal(true);
	});

	it('should strip country calling code from a number', function () {
		// Number is longer than country calling code prefix.
		(0, _inputControl.strip_country_calling_code)('+7800', 'RU', _metadata2.default).should.equal('800');

		// Number is shorter than (or equal to) country calling code prefix.
		(0, _inputControl.strip_country_calling_code)('+3', 'FR', _metadata2.default).should.equal('');

		// `country` doesn't fit the actual `number`.
		// Iterates through all available country calling codes.
		(0, _inputControl.strip_country_calling_code)('+7800', 'FR', _metadata2.default).should.equal('800');

		// No `country`.
		// And the calling code doesn't belong to any country.
		(0, _inputControl.strip_country_calling_code)('+999', null, _metadata2.default).should.equal('');
	});

	it('should get national significant number part', function () {
		// International number.
		(0, _inputControl.get_national_significant_number_part)('+7800555', null, _metadata2.default).should.equal('800555');

		// National number.
		(0, _inputControl.get_national_significant_number_part)('8800555', 'RU', _metadata2.default).should.equal('800555');
	});

	it('should determine of a number could belong to a country', function () {
		// Matching.
		(0, _inputControl.could_number_belong_to_country)('+7800', 'RU', _metadata2.default).should.equal(true);

		// First digit already not matching.
		(0, _inputControl.could_number_belong_to_country)('+7800', 'FR', _metadata2.default).should.equal(false);

		// First digit matching, second - not matching.
		(0, _inputControl.could_number_belong_to_country)('+33', 'AM', _metadata2.default).should.equal(false);

		// Number is shorter than country calling code.
		(0, _inputControl.could_number_belong_to_country)('+99', 'KG', _metadata2.default).should.equal(true);
	});
});
//# sourceMappingURL=input-control.test.js.map