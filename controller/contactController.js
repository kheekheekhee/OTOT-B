const Contact = require("../model/contactModel")

exports.index = (req, res) => {
    Contact.get((err, contacts) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            })
        }
        res.json({
            status: "success",
            message: "Contacts retrieved successfully",
            data: contacts,
        })
    })
}

exports.new = (req, res) => {
    const contact = new Contact()
    contact.name = req.body.name
    contact.gender = req.body.gender
    contact.email = req.body.email
    contact.phone = req.body.phone

    contact.save((err) => {
        if (err) {
            res.json(err)
        }
        res.json({
            message: "New contact created!",
            data: contact
        })
    })
}

exports.view = (req, res) => {
    Contact.findById(req.params.contact_id, (err, contact) => {
        if (err) {
            res.send(err)
        }
        res.json({
            message: "Contact details leading...",
            data: contact
        })
    })
}

exports.update = (req, res) => {
    Contact.findById(req.params.contact_id, (err, contact) => {
        if (err) {
            res.send(err)
        }

        contact.name = req.body.name ? req.body.name : contact.name
        contact.gender = req.body.gender
        contact.email = req.body.email
        contact.phone = req.body.phone

        contact.save((err) => {
            if (err) {
                res.json(err)
            }
            res.json({
                message: "Contact info updated",
                data: contact
            })
        })
    })
}

exports.delete = (req, res) => {
    Contact.remove({
        _id: req.params.contact_id
    }, (err, contact) => {
        if (err) {
            res.send(err)
        }
        res.json({
            status: "success",
            message: "Contact deleted"
        })
    })
}
