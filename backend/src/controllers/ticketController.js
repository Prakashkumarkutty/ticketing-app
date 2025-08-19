const Ticket = require("../models/tickets.models");
const { createTicketSchema, updateTicketSchema } = require("../validators/ticket.validator");

exports.createTicket = async (req, res) => {
    try {
        const { error, value } = createTicketSchema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({
                status: false,
                errors: error.details.map(err => err.message)
            });
        }


        const ticket = await Ticket.create(value);

        res.status(201).json({ status: true, ticket });
    } catch (error) {
        console.error('Error creating ticket:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


exports.getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.findAll({
            order: [['created_at', 'DESC']]
        })
        if (!tickets || tickets.length === 0) {
            return res.status(200).json({ status: true, tickets: [], message: "No tickets found" });
        }
        res.status(200).json({ status: true, tickets, message: "Ticket fetched successfully" })
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.updateStatus = async (req, res) => {
    try {
        const { id } = req.params;

        const { error, value } = updateTicketSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                status: false,
                errors: error.details.map(err => err.message)
            });
        }

        const ticket = await Ticket.findByPk(id);
        if (!ticket) {
            return res.status(404).json({ error: "Ticket not found" });
        }

        await ticket.update(value);

        res.status(200).json({ status: true, ticket, message: "Ticket updated successfully" });
    } catch (error) {
        console.error("Error updating ticket:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};