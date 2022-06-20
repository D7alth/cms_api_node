module.exports = app => {
    const tutorials = require('../controllers/tutorial.controller');   
    var router = require("express").Router();

    router.post('/', tutorials.create);
    router.get('/', tutorials.findALL);
    router.get('/published', tutorials.findAllPublished);
    router.get('/:id', tutorials.findOne);
    router.put('/:id', tutorials.update);
    router.delete('/:id', tutorials.delete);
    router.delete('/', tutorials.deleteAll);
    app.use('/api/tutorials', router);

}