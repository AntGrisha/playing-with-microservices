"use strict";
const { Context } = require('moleculer');
const DbMixin = require('../mixins/db.mixin');
const QueueService = require("moleculer-bull");
const uuid = require('uuid');

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
    name: "consumer",
    mixins: [QueueService('redis://127.0.0.1:6379'), DbMixin('messages')],

    queues: {
        async "message.send"(job) {
            this.logger.info('Message has been received!');
            const data = job.data;
            await this.adapter.insert({ ...data, messageId: uuid.v4() });
            this.broker.broadcast('email.send', { email: data.email, message: data.message }, 'message');
            if (data.phone) {
                this.broker.broadcast('sms.send', { phone: data.phone, message: data.message }, 'message');
            }
            return this.Promise.resolve({
                done: true,
                id: job.data.id,
                worker: process.pid
            });
        }
    },

	/**
	 * Service started lifecycle event handler
	 */
	async started() {
	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {

	}
};
