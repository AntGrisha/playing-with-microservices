"use strict";
const { Context } = require('moleculer');
const QueueService = require("moleculer-bull");
const core = require('./client/src/index');

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "client",
	mixins: [QueueService('redis://127.0.0.1:6379')],

	/**
	 * Actions
	 */
	actions: {

		/**
		 * Send email/sms
		 *
		 * @param {String} name - User name
		 */
		send: {
            rest: "POST /send",
			/** @param {Context} ctx  */
			async handler(ctx) {
                return await core.sender(ctx);
			}
		}
	},
};
