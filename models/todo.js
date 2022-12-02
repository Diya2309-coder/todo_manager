'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static addTodo({title, dueDate}){
      return this.create({title: title, dueDate: dueDate,completed: false}) //"this is the reference of the todo class itself"
    }

    markAsCompleted(id){//instance method
      return Todo.update({completed: false},{
        where : {
          id
        }
      })//"this" is the reference to a instance of class todo
    }
  }
  Todo.init({
    title: DataTypes.STRING,
    dueDate: DataTypes.DATEONLY,
    completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};