var connection = require("../config/connection.js");

function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
};

function objToSql(ob) {
    var arr = [];
    for (var key in ob) {
        var value = ob[key];
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
}

var orm = {
    selectAll: function (tableSelect, cb) {
        var hotdog = "SELECT * FROM " + tableSelect + ";";
        connection.query(hotdog, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    insertOne: function (table, cols, vals, cb) {
        var hotdog = "INSERT INTO " + table;

        hotdog += " (";
        hotdog += cols.toString();
        hotdog += ") ";
        hotdog += "VALUES (";
        hotdog += printQuestionMarks(vals.length);
        hotdog += ") ";

        connection.query(hotdog, vals, function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },

    updateOne: function (table, objColVals, condition, cb) {
        var hotdog = "UPDATE " + table;

        hotdog += " SET ";
        hotdog += objToSql(objColVals);
        hotdog += " WHERE ";
        hotdog += condition;

        connection.query(hotdog, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    }
};


module.exports = orm;