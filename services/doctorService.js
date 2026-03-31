const Doctor = require('../models/Doctor.js');

exports.createDoctor = async (data)=>{
    return await Doctor.create(data);
};

exports.getDoctors = async ()=>{
    return await Doctor.findAll();
};

exports.getDoctorById = async (id)=>{
    return await Doctor.findByPk(id);
};

exports.updateDoctor = async (id,data)=>{
    const doc = await Doctor.findByPk(id);
    if(!doc) throw new Error('Doctor not found');
    return await doc.update(data);
};

exports.deleteDoctor = async (id)=>{
    const doc = await Doctor.findByPk(id);
    if(!doc) throw new Error('Doctor not found');
    return await doc.destroy();
};
