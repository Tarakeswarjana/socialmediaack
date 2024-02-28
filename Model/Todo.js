// const mongoose = require("mongoose")
// const schema = new mongoose.Schema({
//     todo: String
// })
// const todo = new mongoose.model("todo", schema)
// module.exports = todo;

const mongoose = require("mongoose")
const schema = new mongoose.Schema({
    todo: String,
    count: String
})
const todo = new mongoose.model("todo", schema)
module.exports = todo


