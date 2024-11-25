const mongoose = require('mongoose');

const menuschema = mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    price:{
        type:Number,
        required:true
    },
    taste:{
        type:String,
        enum:['sweet','spicy','sour'],
        required:true
    },
    is_drink:{
        type :Boolean,
        default:false
    },
    ingredients:{
        type : [String],
        default:[]
    },
    num_sales:{
        type:Number,
        default:0
    }
});

const menuitem = mongoose.model('menuitem',menuschema);
module.exports = menuitem;