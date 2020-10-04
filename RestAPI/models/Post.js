const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        required: true
    }, 
    description: {
        type: String,
        required: true
    },
    transaction_amount: {
        type: Number,

    },
    previous_balance: {
        type: Number
    },  
    current_balance: {
        type: Number
    }
});

module.exports = mongoose.model('Posts', PostSchema);