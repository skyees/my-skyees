'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Web Schema
 */
var WebSchema = new Schema({
    merchantid:Number,
    organization: String,
    basketitemlabel:String,
    detail1:String,
    detail2:{type: String,default:'',trim:true },
    linkcode: String,
    imagefile: String,
    created: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Web', WebSchema);
