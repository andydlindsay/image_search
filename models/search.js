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

// add search term
module.exports.addSearch = function(newSearch, callback) {
    newSearch.save(callback);
}

// get last 10 search terms
module.exports.getSearches = function(callback) {
    Search.find({})
        .sort({ 'when': 'desc' })
        .limit(10)
        .exec(callback);
}