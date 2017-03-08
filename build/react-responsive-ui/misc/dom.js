'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.submit_parent_form = submit_parent_form;
exports.get_scrollbar_width = get_scrollbar_width;
exports.is_reachable = is_reachable;
// https://github.com/halt-hammerzeit/react-responsive-ui/blob/master/source/misc/dom.js

function submit_parent_form(node) {
	while (node.parentElement) {
		node = node.parentElement;
		if (node instanceof HTMLFormElement) {
			// Won't use `node.submit()` because it bypasses `onSubmit`.
			// Will click the submit button instead.
			var submit = node.querySelector('button[type=submit]');
			if (submit) {
				submit.click();
				return true;
			}
		}
	}
}

function get_scrollbar_width() {
	// // `window.innerWidth` has a bug:
	// // it's decreases as the page scale is increased.
	// // Therefore not using it.
	// // (Full width) - (Width minus scrollbar)
	// return document.body.clientWidth - window.innerWidth

	return 17;
}

function is_reachable(element, ancestor) {
	if (element === ancestor) {
		return true;
	}

	while (element = element.parentElement) {
		if (element === ancestor) {
			return true;
		}
	}
}

// function find_ancestor_by_class(element, class_name)
// {
// 	while ((element = element.parentElement) && !element.classList.contains(class_name)) {}
// 	return element
// }

// function is_descendant(element, ancestor)
// {
// 	while (element = element.parentElement)
// 	{
// 		if (element === ancestor)
// 		{
// 			return true
// 		}
// 	}
// }
//# sourceMappingURL=dom.js.map