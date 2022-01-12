const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
//create a schema
const userSchema = new Schema({
    firstname: {
         type: String,
         default: '',
         required: false
    },
    lastname: {
         type: String,
         default: '',
         required: false
    },
    username: {
        type: String,
        required: true,
        unique : true,
        match: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        lowercase : true,
        index: true
    },
    phone: {
         type: String,
         default: '',
         required: false
    },
    avatar: {
        type: String,
        default: '',
        required: false
    },
    password: {
        type : String,
        required : false
    },
    otp: {
        type : Number,
        default:null,
        required: false
    },
    otp_expired_at: { 
        type: Date,
        default:null,
        required: false
    },
    active: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['owner','admin', 'user'],
        default: 'user'
    },
    
    created_at: { 
        type: Date, 
        default: Date.now 
    },
    updated_at: { 
        type: Date, 
        default: Date.now
     },
     is_deleted:{
        type:Boolean,
        default:false
    },
    otp_attempt:{
        type:Number,
        default:0,
        required: false
    },
    otp_next_attempt:{
        type: Date,
        default:null,
        required: false
    },
    last_seen_at:{
        type: Date,
        required: false
    }
});

userSchema.methods.isValidPassword = async function(newPassword){
    try {
      
        //compare 
         return  await bcrypt.compare(newPassword , this.password);

    } catch (error) {
        throw new Error(error);
    }
}    

export default mongoose.models.User || mongoose.model("User", userSchema);
