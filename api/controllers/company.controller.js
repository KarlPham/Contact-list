const db = require("../models");
const Company = db.companies;

// Create and Save a new Company for a specific Contact
exports.create = (req, res) => {
    

    // Create a Company object with the contactId from the URL
    const company = {
        company_name: req.body.company_name,
        company_address: req.body.company_address,
        contact_id: req.params.contactId  // Use contactId from the route
    };

    // Save Company in the database
    Company.create(company)
        .then(data => {
            res.send(data);  // Send back the created company data
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the company."
            });
        });
};

// Retrieve all Companies for a specific Contact
exports.findAll = (req, res) => {
    const contactId = req.params.contactId;

    Company.findAll({
        where: { contact_id: contactId }  // Find companies related to the contactId
    })
    .then(data => {
        res.send(data);  // Send back all companies related to the contact
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving companies."
        });
    });
};

// Find a single Company by ID for a specific Contact
exports.findOne = (req, res) => {
    const companyId = req.params.companyId;
    const contactId = req.params.contactId;

    Company.findOne({
        where: { company_id: companyId, contact_id: contactId }  // Find by companyId and contactId
    })
    .then(data => {
        if (data) {
            res.send(data);  // Send the found company data
        } else {
            res.status(404).send({
                message: `Cannot find company with id=${companyId} for contact with id=${contactId}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving company with id=" + companyId
        });
    });
};

// Update a Company by ID for a specific Contact
exports.update = (req, res) => {
    const companyId = req.params.companyId;
    const contactId = req.params.contactId;

    Company.update(req.body, {
        where: { company_id: companyId, contact_id: contactId }  // Ensure we update by both contactId and companyId
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Company was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update company with id=${companyId} for contact with id=${contactId}. Company was not found or request body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating company with id=" + companyId
        });
    });
};

// Delete a Company by ID for a specific Contact
exports.delete = (req, res) => {
    const companyId = req.params.companyId;
    const contactId = req.params.contactId;

    Company.destroy({
        where: { company_id: companyId, contact_id: contactId }  // Delete based on companyId and contactId
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Company was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete company with id=${companyId} for contact with id=${contactId}. Company was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete company with id=" + companyId
        });
    });
};
