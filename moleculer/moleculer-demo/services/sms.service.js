"use strict";

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "sms",

	/**
	 * Events
	 */
	events: {
        'sms.send': {
            group: 'message',
            handler(data) {
                this.logger.info(`Sending SMS to ${data.phone}, "${data.message}"`);
            }
        }
	},
};
