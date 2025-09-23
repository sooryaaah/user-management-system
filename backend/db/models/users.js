const mongoose = require('mongoose');
new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    loginCount:{
        type:Number,
        
    },
    attendance:[
        {
            present:{
                type:Boolean,
                require: true
            },
            date:{
                type:Date,
                require:true
            }
        }
    ],
    tasks:[
        {
            task:{
                type:String
            },
            start:{
                type:Boolean
            },
            completed:{
                type:Boolean,
                default:false
            }
        }
    ],
    permission:{
        type:Boolean,
        default: true
    
    }
})



