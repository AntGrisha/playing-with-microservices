const { Context } = require("moleculer");
const ApiGateway = require("moleculer-web");

/**
 * 
 * @param {Context} ctx 
 */
const sender = async (ctx) => {
    ctx.service.logger.info(ctx.params); // body
    if (!ctx.params.email || !ctx.params.message) {
        throw new ApiGateway.Errors.BadRequestError('Email or(and) message was not provided');
    }
    ctx.service.createJob("message.send", ctx.params);
    return {
        message: 'Message placed in the Queue!'
    }
}

module.exports = { sender };