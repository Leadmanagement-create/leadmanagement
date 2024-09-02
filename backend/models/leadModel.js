import Joi from 'joi';
import mongoose from 'mongoose';
const { Schema, Types } = mongoose;

const leadSchema = new Schema({
  leadId: {
    type: Types.ObjectId,
    default: () => new Types.ObjectId(),
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  emailAddress: {
    type: String,
    required: true
  },
  dateDiscovered: {
    type: Date,
    default:null,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  dateUpdated: {
    type: Date,
    default: Date.now
  },
  assigneeId: {
    type: Types.ObjectId,
    default:null
    
  },
  
  assignedDate: {
    type: Date,
    required: false
  },
  source:{
    type:String,
    required:true
  },
  status: {
    type: Boolean,
    default: true,
},
businessType:{
  type:String,
  required:false
},
riskLevel:{
  type:String,
  enum: ['HIGH','LOW','MEDIUM'],
},
ageOfBusiness:{
  type:String,
  required:false
},
interestLevel:{
  type:String,
  required:false
},
currentProcessor:{
  type:String,
  required:false
},
timeframeToSwitch:{
  type:String,
  required:false
},
contactReason:{
  type:String,
  required:false
},
companyName:{
  type:String,
},

});

const leadValidation = Joi.object({
  name: Joi.string().optional(),
  phoneNumber: Joi.string().optional(),
  emailAddress: Joi.string().required(),
  // assigneeId: Joi.string().optional(),
  status:Joi.boolean().optional(),
  source: Joi.string().optional(),
  leadId: Joi.string().optional(),
  assignee: Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string(),
    email: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    password:Joi.string().optional()
  }).optional()
});

const Lead = mongoose.model('Lead', leadSchema);

export { Lead, leadValidation };
