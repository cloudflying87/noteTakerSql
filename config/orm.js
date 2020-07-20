const connection = require('./connection');

class ORM {
    constructor(connection){
        this.connection = connection;
    }

    selectAll(table){
      const queryString = 'SELECT * from ??'
      return this.connection.query(queryString,[table])
    }
    
    selectOneNote(id){
        const queryString = 'SELECT title,text from notes where id=?;'
        return this.connection.query(queryString,[id])
    }

    deleteOneNote(id){
        const queryString = 'DELETE from notes where id=?;'
        return this.connection.query(queryString,[id])
    }
    
    createOneNote(title,text){
        const queryString = 'INSERT into notes (title,text) value (?,?)'
        return this.connection.query(queryString,[title,text])
    }
    
}


module.exports = new ORM(connection);

const test = new ORM(connection);