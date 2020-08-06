let MySql = require('sync-mysql');
let env = require('../environments/dbEnvironment.js');

console.log("env.environment.db", env.environment);
let conn = new MySql(env.environment.db);


function executeQuery(queryStr) {

    return conn.query(queryStr);
}

function executeQueryParam(queryStr, param) {
    return conn.query(queryStr, param);
}

//columns & values can be array or string
//string e.g. "userId, email, password, createdAt, type"
// array e.g. [password, email, firstTime, isAdmin, new Date().getTime(), status, verified, socialId, id];
function insert(tableName, columns, values) {
    //"INSERT INTO user (userId, email, password) VALUES(?, ?, ?)", [userId, email, password]

    if (!columns || !tableName) return console.log("error");
    let statement = "INSERT INTO " + tableName + " (";
    
    if (columns instanceof Array) {
        statement += columns.join(", ");
    } else {
        statement += columns;
    }


    if (values instanceof Array) {
        let questionMarks = [];
        values.forEach(element => {
            questionMarks.push("?");
        });
        statement += ") VALUES (" + questionMarks.join(", ") + ");";
        console.log("executeQuery :", statement);
        console.log(" Param : ", values);
        return executeQueryParam(statement, values);

    } else {
        statement += ") VALUES ('" + values + "');";
        console.log("executeQueryParam :", statement);
        return executeQuery(statement);
    }

}

function getUpdateStatement(tableName, columnsWithValues, conditions) {
    console.log("condition", conditions);
    if (!columnsWithValues || !tableName) return console.log("error");

    if (columnsWithValues instanceof Array) columnsWithValues = columnsWithValues.join(", ");

    let statement = "update " + tableName + " set " + columnsWithValues;

    if (conditions) statement += " where " + conditions;

    console.log("update ", statement);
    return statement;
}

function getInsertStatement(tableName, columns, values) {
    //"INSERT INTO user (userId, email, password) VALUES(?, ?, ?)", [userId, email, password]

    if (!columns || !tableName) return console.log("error");
    let statement = "INSERT INTO " + tableName + " (";
    let _columns = "";
    let _values = "";

    if (columns instanceof Array && values instanceof Array) {
        for (let index = 0; index < columns.length; index++) {
            let val = typeof values[index] == "string" ? "'" + values[index] + "'" : values[index];
            if (val != undefined && val != '') {
                _columns += "`" + columns[index] + "`, ";
                _values += val + ", ";
            }
        }

        _columns = _columns.substring(0, _columns.length - 2);
        _values = _values.substring(0, _values.length - 2);
        statement = statement + _columns + ") VALUES (" + _values + ")";

    } else {
        statement += columns;
        statement += ") VALUES ('" + values + "')";
    }
    return statement;

}
function bulkInsert(tableName, columns, values) {
    if (!columns || !tableName
        || !values instanceof Array)
        return console.log("error");

    let statement = "INSERT INTO " + tableName + " (";

    if (columns instanceof Array) {
        statement += columns.join(", ");
    } else {
        statement += columns;
    }

    statement += ") VALUES ";
    let count = 0;
    values.forEach(function (item) {
        statement += item;
        count++;
        if (count !== values.length)
            statement += ",";
        else
            statement += ";";
    })
    console.log("bulkInsert statement", statement);
    return executeQuery(statement)
}

//columns can be array or string
function select(tableName, columns, conditions) {
    if (!columns || !tableName) return console.log("error");

    if (tableName instanceof Array) tableName = tableName.join(", ");
    if (columns instanceof Array) columns = columns.join(", ");

    let statement = "select " + columns + " from " + tableName;

    if (conditions) statement += " where " + conditions;

    console.log("select : ", statement);
    return executeQuery(statement);
}

//
function update(tableName, columnsWithValues, conditions) {
    console.log("condition", conditions);
    if (!columnsWithValues || !tableName) return console.log("error");

    if (columnsWithValues instanceof Array) columnsWithValues = columnsWithValues.join(", ");

    let statement = "update " + tableName + " set " + columnsWithValues;

    if (conditions) statement += " where " + conditions;

    console.log("update ", statement);
    return executeQueryParam(statement);
}

function deleteQuery(tableName, conditions) {
    if (!tableName) return console.log("error");
    let statement = "DELETE FROM " + tableName;

    if (conditions) statement += " where " + conditions;

    console.log(statement);
    return executeQuery(statement);
}

exports.executeQuery = executeQuery;
exports.executeQueryParam = executeQueryParam;
exports.conn = conn;
exports.insert = insert;
exports.deleteQuery = deleteQuery;
exports.update = update;
exports.select = select;
exports.bulkInsert = bulkInsert;
exports.getInsertStatement = getInsertStatement;
exports.getUpdateStatement = getUpdateStatement;