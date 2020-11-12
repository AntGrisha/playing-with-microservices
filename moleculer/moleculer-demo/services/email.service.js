"use strict";

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "email",

	/**
	 * Events
	 */
	events: {
        'email.send': {
            group: 'message',
            handler(data) {
                this.logger.info(`Sending email to ${data.email}, "${data.message}"`);
            }
        }
	},
};
