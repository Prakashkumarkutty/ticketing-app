const Joi = require("joi");

const createTicketSchema = Joi.object({
    title: Joi.string().min(1).max(255).required(),
    description: Joi.string().min(1).required(),
    priority: Joi.string().valid("Low", "Medium", "High").default("Low"),
    status: Joi.string().valid("Open", "In Progress", "Closed").default("Open")
});

const updateTicketSchema = Joi.object({
    title: Joi.string().min(1).max(255),
    description: Joi.string().min(1),
    priority: Joi.string().valid("Low", "Medium", "High"),
    status: Joi.string().valid("Open", "In Progress", "Closed")
});

module.exports = { createTicketSchema, updateTicketSchema };
