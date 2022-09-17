const Contact = require("../model/contactModel")

exports.index = (req, res) => {
    Contact.get((err, contacts) => {
        if (err) {
            res.json({
                status: "error",
                message: 'No such contact!',
                error: err,
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
            res.json({
                message: 'Sorry failed to create contact!',
                error: err
            })
        } else {
            res.json({
                message: "New contact created!",
                data: contact
            })
        }
    })
}

exports.view = (req, res) => {
    Contact.findById(req.params.contact_id, (err, contact) => {
        if (err) {
            res.json({
                message: 'Sorry cannot find that contact!',
                error: err
            })
        } else if (contact === null) {
            res.json({
                message: 'Sorry cannot find that contact!',
            })
        } else {
            res.json({
                message: "Contact details leading...",
                data: contact
            })
        }
    })
}

exports.update = (req, res) => {
    Contact.findById(req.params.contact_id, (err, contact) => {
        if (err) {
            res.send({
                message: 'sorry cannot find that contact!',
                error: err
            })
        } else if (contact === null) {
            res.json({
                message: 'Sorry cannot find that contact!'
            })
        } else {
            contact.name = req.body.name ? req.body.name : contact.name
            contact.gender = req.body.gender ? req.body.gender : contact.gender
            contact.email = req.body.email ? req.body.email : contact.email
            contact.phone = req.body.phone ? req.body.phone : contact.phone
    
            contact.save((err) => {
                if (err) {
                    res.json({
                        message: 'sorry something wrong happened',
                        error: err
                    })
                } else {
                    res.json({
                        message: "Contact info updated",
                        data: contact
                    })
                }
            })
        }
    })
}

exports.delete = (req, res) => {
    Contact.findOneAndDelete({
        _id: req.params.contact_id
    }, (err, contact) => {
        if (err) {
            res.send({
                message: 'sorry cannot find that id',
                error: err
            })
        } else if (!contact) {
            res.json({
                message: 'sorry cannot find that id'
            })
        } else {
            res.json({
                status: "success",
                message: "Contact deleted"
            })
        }
    })
}
