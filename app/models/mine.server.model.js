'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Mine Schema
 */
var MineSchema = new Schema({
    position:{type:Array,
               default:[
                   { sizeX: 2, sizeY: 1, row: 0, col: 0 ,color: '#d9522c'},
                   { sizeX: 2, sizeY: 2, row: 0, col: 2 ,color: '#009900'},
                   { sizeX: 1, sizeY: 1, row: 0, col: 4 ,color: '#ae193e'},
                   { sizeX: 1, sizeY: 1, row: 0, col: 5 ,color: '#0099ab'},
                   { sizeX: 2, sizeY: 1, row: 1, col: 0 ,color: '#fba919'},
                   { sizeX: 1, sizeY: 1, row: 1, col: 4 ,color: '#fbf9e9'},
                   { sizeX: 1, sizeY: 2, row: 1, col: 5 ,color: '#2d87ef'},
                   { sizeX: 1, sizeY: 1, row: 2, col: 0 ,color: '#5b39b6'},
                   { sizeX: 2, sizeY: 1, row: 2, col: 1 ,color: '#474747'},
                   { sizeX: 1, sizeY: 1, row: 2, col: 3 ,color: '#d9522c'}
               ]},
	images:{type:Array,
        default:[{
            url: '../modules/core/img/brand/hiding-the-map.jpg',
            caption: 'This is slide one description',
            id: 'item1'
             },
            {
                url: '/modules/core/img/brand/finding-the-key.jpg',
                caption: 'This is slide two description',
                id: 'item2'
            },
            {
                url: '/modules/core/img/brand/lets-get-out-of-here.jpg',
                caption: 'This is slide three description',
                id: 'item3'
            },
            {
                url: '/modules/core/img/brand/theres-the-buoy.jpg',
                caption: 'This is slide four description',
                id: 'item4'
            },
            {url: '/modules/core/img/the-battle.jpg',
                caption: 'This is slide four description',
                id: 'item5'}]},
    color:{type:String,default:'#009900'},
    directive:{type:Array,
               default:[
                        'directive',
                        'directive',
                        'directive',
                        'directive',
                        'directive',
                        'directive',
                        'directive',
                        'directive',
                        'directive',
                        'directive'
                      ]},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	      }
   });

mongoose.model('Mine', MineSchema);
