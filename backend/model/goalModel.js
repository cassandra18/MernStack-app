const mongoose = require('mongoose');

const goalSchema = mongoose.Schema({
    //add user to the goalSchema to associate the goal to a user
    user: {
        type: mongoose.Schema.Types.ObjectId,//the object id is used to identify the user
        required: true,
        ref: 'User'//the user is the referenec to which the objectId pertain to.
    },

    text: {
        type: String,
        required: [true, 'Please add a text value']
    }
}, {
    timestamps: true //creates an updated at and created at automatically
});

module.exports = mongoose.model('Goal', goalSchema);