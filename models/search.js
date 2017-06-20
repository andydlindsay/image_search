const mongoose = require('mongoose');

// search schema
const searchSchema = mongoose.Schema({
    'term': {
        type: String
    },
    'when': {
        type: Date,
        default: Date.now
    }
});

// export search
const Search = module.exports = mongoose.model("Search", searchSchema, "searches");
