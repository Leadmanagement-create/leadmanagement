import { Lead, leadValidation } from '../models/leadModel.js';
import { io } from '../app.js';
import { sendEmail } from '../utils/mailer.js';
import emailSchedulers from '../models/emailSchedulerModel.js';
import CampaignEvent from '../models/campaignEventModel.js';
import Template from '../models/templateModel.js';
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';


const createLead = async (leadData) => {
  try {
    // const { templateId } = leadData;

    const existingEvents = await CampaignEvent.find({
      name: 'ADD_LEAD',
    });
    if (existingEvents.length === 0) {
      throw new Error(`No campaign event found with the name:`);
    }

    const template = await Template.findOne({});
    if (!template) {
      throw new Error(`No template found `);
    }
    const emailBody = template.body;
    const emailSubject = template.subject;

    const lead = new Lead(leadData);
    const savedLead = await lead.save();
    io.emit('leadCreated', savedLead);

    // Prepare email body as a Map
    // const emailText = new Map([
    //   ['Name', savedLead.name],
    //   ['Phone Number', savedLead.phoneNumber],
    //   ['Email', savedLead.emailAddress],
    // ]);

    if (!savedLead.emailAddress) {
      throw new Error('Email address is missing for the lead.');
    }

    for (const event of existingEvents) {


      // const existingSchedule = await emailSchedulers.findOne({
      //   to: savedLead.emailAddress,
      //   subject: template.subject,
      //   isSent: false,
      // });

      // if (!existingSchedule) {
      const emailSchedulerEntry = new emailSchedulers({
        body: emailBody,
        to: savedLead.emailAddress,
        subject: emailSubject,
        // templateId
        period: event.period,
        time: new Date(Date.now() + event.period * 60000),
        isSent: false,
        detail: '',
      });

      await emailSchedulerEntry.save();
    }

    // }

    await sendEmail(savedLead.emailAddress, 'New Lead Created', emailBody);

    await savedLead.save();
    return savedLead;
  } catch (error) {
    console.error('Error creating lead:', error);
    throw new Error('Error creating lead');
  }
};





const getLeadById = async (id) => {
  try {
    return await Lead.findOne({ _id: id });
  } catch (error) {
    console.error('Error retrieving lead by ID:', error);
    throw new Error('Error retrieving lead by ID');
  }
};

const updateLead = async (id, leadData) => {
  if (!leadData.assigneeId) {
    throw new Error('Assignee ID is required');
  }


  const updatedLead = await Lead.findOneAndUpdate(
    { _id: id },
    leadData,
    { new: true }
  );
  if (!updatedLead) {
    throw new Error('Lead not updated');
  }

  return updatedLead;
};



const DEFAULT_PASSWORD = 'assignee123';

const hashDefaultPassword = async () => {
  return await bcrypt.hash(DEFAULT_PASSWORD, 10);
};
const updateLeadByEmail = async (emailAddress, leadData) => {
  const { error } = leadValidation.validate(leadData);
  if (error) {
    throw new Error('Validation Error: ' + error.message);
  }

  if (leadData.assignee) {
    let user = await User.findOne({ email: leadData.assignee.email });
    if (!user) {
      const hashedPassword = await hashDefaultPassword();
      user = new User({
        first_name: leadData.assignee.first_name,
        last_name: leadData.assignee.last_name,
        email: leadData.assignee.email,
        phoneNumber: leadData.assignee.phoneNumber,
        role: 'assignees',
        password: hashedPassword
      });
      await user.save(); // Save the new user
    }
    leadData.assigneeId = user._id; // Set the user's ID on the lead
  }

  // Update the lead
  const updatedLead = await Lead.findOneAndUpdate(
    { emailAddress },
    leadData,
    { new: true }
  );

  if (!updatedLead) {
    throw new Error('Lead not updated or not found');
  }

  return updatedLead;
};



const deleteLead = async (id) => {
  try {
    const updatedLead = await Lead.findOneAndUpdate(
      { _id: id },
      { $set: { status: false } },
      { new: true }
    );
    return updatedLead
  } catch (error) {
    console.error('Error updating lead status:', error);
    throw new Error(error.message);
  }
};

const getAllLeads = async (page, limit, searchQuery) => {
  try {
    const skip = (page - 1) * limit;
    const query = { status: true };
    //const totalCount = await Lead.countDocuments(query);

    // if (searchQuery) {
    if (searchQuery && searchQuery.length >= 3) {
      query.$or = [
        { name: { $regex: searchQuery, $options: 'i' } },
        { emailAddress: { $regex: searchQuery, $options: 'i' } },
        { source: { $regex: searchQuery, $options: 'i' } },
        { phoneNumber: { $regex: searchQuery, $options: 'i' } }
      ];
    }

    const leads = await Lead.find(query).sort({ dateDiscovered: -1, dateCreated: -1 })
      .skip(skip)
      .limit(limit);


    return {
      // totalCount,
      totalCount: await Lead.countDocuments(query),

      leads: leads,
    };
    // return sortedLeads;
  } catch (error) {
    throw new Error('Error retrieving all leads');
  }
};


const updateLeadwithassigneeId = async (id, leadData) => {
  try {
    const find = await Lead.findOne({ _id: id })

    if (!id) {
      throw new Error('id is required');
    }

    if (typeof leadData !== 'object') {
      throw new Error('Invalid lead data');
    }
    const updatedLead = await Lead.findOneAndUpdate(
      { _id: id },
      { $set: leadData },
      { new: true }
    );

    if (!updatedLead) {
      throw new Error('Lead not found');
    }

    return updatedLead;
  } catch (error) {
    throw new Error(`Unable to update lead: ${error.message}`);
  }
};
export {
  createLead,
  getLeadById,
  updateLead, deleteLead,
  getAllLeads,
  updateLeadwithassigneeId,
  updateLeadByEmail
}
