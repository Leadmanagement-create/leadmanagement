import * as leadService from '../services/leadServices.js'; 


const createLead = async (req, res) => {
  try {
    const lead = await leadService. createLead(req.body);
    res.status(200).json({
      message: 'Lead created successfully',
      data: lead,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

 const getLead = async (req, res) => {
  try {
    const lead = await leadService.getLeadById(req.params.id);
    if (lead) {
      res.json({
        message: 'Lead found successfully',
        Data: lead,
      });
    } else {
      res.status(404).json({ message: 'Lead not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

 const updateLead = async (req, res) => {
  try {
    const lead = await leadService.updateLead(req.params.id, req.body);
    if (lead) {
      res.status(200).json({
        message: 'Lead updated successfully',
        data: lead,
      });
    } else {
      res.status(404).json({ message: 'Lead not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateLeadByEmail = async (req, res) => {
  try {
    const lead = await leadService.updateLeadByEmail(req.body.emailAddress, req.body);
    res.status(200).json({
      message: 'Lead updated successfully',
      data: lead,
    });
  } catch (error) {
    if (error.message === 'Lead not updated or not found') {
      res.status(404).json({ message: 'Lead not found' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const updateLeadwithassigneeId = async (req, res) => {
  const { id } = req.params;
  const leadData = req.body;
  
  try {
    const updatedLead = await leadService.updateLeadwithassigneeId(id, leadData);
    res.status(200).json({ message: 'Lead updated successfully', data: updatedLead });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteLead = async (req, res) => {
  try {
    const id  = req.params.id;
    
    const lead = await leadService.deleteLead(id);

    res.status(200).json({
       message: 'Lead status updated to inactive successfully' ,
      data:lead
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllLeads = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) ;
    
    const searchQuery = req.query.search || '';

    const {totalCount,leads} = await leadService.getAllLeads(page, limit, searchQuery);
    res.status(200).json({
      message: 'Leads retrieved successfully',
      data: leads,
      totalCount
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export {createLead,
  getLead,
  updateLead,
  deleteLead,
  getAllLeads,
  updateLeadwithassigneeId,
  updateLeadByEmail
}