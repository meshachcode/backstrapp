define(["underscore", "backbone", "../models/todo", "lib/backbone/localStorage"], function (_, Backbone, Todo, Store) {

    var TodoList = Backbone.Collection.extend({
        model: Todo,
        localStorage: new Store("b$-Todos"),
        done: function () {
            return this.filter(function (todo) {
                return todo.get('done');
            });
        },
        remaining: function () {
            return this.without.apply(this, this.done());
        },
        nextOrder: function () {
            if (!this.length) return 1;
            return this.last().get('order') + 1;
        },
        comparator: function (todo) {
            return todo.get('order');
        }


    });

    return new TodoList;
});