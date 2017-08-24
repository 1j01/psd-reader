/*
	psd-reader - centralized async handler
	By Epistemex (c) 2015-2017
	www.epistemex.com
*/

/**
 * Provide the function that will do the micro-task, one task per iteration.
 * As well as a callback function when done. func must itself keep track of
 * position/count etc.
 *
 * @param {function} func - function that returns true if done, false if not
 * @param {function} callback - callback function when done
 * @private
 */
PsdReader.prototype._async = function(func, callback) {

	var _psd = PsdReader,
		blockSize = _psd._bSz,
		delay = _psd._delay,
		block = blockSize,
		timeout = _psd._to,
		done = false,
		lastTime = Date.now() + timeout;

	(function _async() {

		while(!done && Date.now() < lastTime) {
			while(!done && --block > 0) done = func();
			block = blockSize;
		}

		if (!done) {
			lastTime = Date.now() + delay + timeout;
			setTimeout(_async, delay);
		}
		else callback();
	})();
};