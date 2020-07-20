const orm = require('../config/orm.js')

class Notes {
    selectAll(table){
        return orm.selectAll(table)
    };

    createOneNote(title,text){
        return orm.createOneNote(title, text);
    };

    deleteOneNote(id) {
        return orm.deleteOneNote(id)
    };

};

module.exports = new Notes()