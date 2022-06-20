const db = require('../models');
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if(!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    }
    Tutorial.create(tutorial).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Tutorial."
        });
    })
};

exports.findALL = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    Tutorial.findAll({ where: condition })
        .then((data) => { res.send(data); })
            .catch((err) => {res.status(500)
                .send({ message: err.message || "Some error occurred while retrieving tutorials." });
            });};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Tutorial.findByPk(id).then(data => {
        if(data) res.send(data);
        else res.status(404).send({ message: `Cannot find tutorial with id = ${id}`});
    }).catch(err => {
        res.status(500).send({
            message: `Cannot find tutorial with id = ${id}`
        });
    })}

exports.update = (req, res) => {
    const id = req.params.id;
    Tutorial.update(req.body,{
        where: {id: id}
    }).then(num => {
        if(num === 1) res.send({message : "Tutorial was update successfully."});
        else res.send({message : `Cannot update tutorial with id = ${id}. Maybe turorial was not found or req.body is empyt`})
    }).catch(err => {
        res.status(500).send({
            message : `Error updating tutorial with id = ${id}`
        })
    })};
exports.delete = (req, res) => {
    const id = req.params.id;
    Tutorial.destroy({
        where: {id: id}
    }).then(num => {
        if(num === 1) res.send({message : "Tutorial was deleted successfully"});
        else res.send({message : `Cannot delete tutorial with id = ${id}`});
    }).catch(err => {
        res.status(500).send({message : `Could not delete tutorial with id = ${id}`});
    })
};
exports.deleteAll = (req, res) => {
    Tutorial.destroy({
        where:{},
        truncate: false
    }).then(nums => {
        res.send({message : `${nums} tutorial was deleted successfully`});
    }).catch(err => {
        res.status(500).send({message : err.message || "Some error occurred"});
    })
};
exports.findAllPublished = (req, res) => {
    Tutorial.findALL({
        where: {published : true}
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({message : err.message || "Some error occurred"})
    })
};

