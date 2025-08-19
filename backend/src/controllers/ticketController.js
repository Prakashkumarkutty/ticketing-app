const Ticket = require("../models/tickets.models");

exports.createTicket = async (req, res) => {
    try {
        const { title, description, priority } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                status: false,
                error: 'Title and description are required'
            });
        }

        if (priority && !['Low', 'Medium', 'High'].includes(priority)) {
            return res.status(400).json({
                status: false,
                error: 'Priority must be Low, Medium, or High'
            });
        }

        const ticket = await Ticket.create({
            title,
            description,
            priority: priority || 'Low',
            status: 'Open'
        });

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
        const { status, title, description, priority } = req.body;

        const ticket = await Ticket.findByPk(id);
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        if (status && ['Open', 'In Progress', 'Closed'].includes(status)) {
            ticket.status = status;
        }
        if (title) ticket.title = title;
        if (description) ticket.description = description;
        if (priority && ['Low', 'Medium', 'High'].includes(priority)) {
            ticket.priority = priority;
        }

        await ticket.save();
        res.status(200).json({ status: true, ticket, message: "Ticket updated successfully" });
    } catch (error) {
        console.error('Error updating ticket:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}