const service = require('../services/doctorService');

exports.createDoctor = async(req,res)=>{
    try{
        const { name, specialty, email } = req.body;
            if (!name || !specialty || !email) {
      return res.status(400).json({ error: "Name, specialty, and email are required" });
    }

    // ✅ Check for duplicate email
    const existing = await service.getDoctors();
    if (existing.some(doc => doc.email === email)) {
      return res.status(409).json({ error: "Doctor with this email already exists" });
    }
        const data = await service.createDoctor({ name, specialty, email });
        res.status(201).json(data);
    }catch(err){
        res.status(500).json({error:err.message});
    }
};

exports.getDoctors = async(req,res)=>{
    try{
        const data = await service.getDoctors();
       

        res.json(data);
    }catch(err){
        if (err.message === "Doctor not found") {
     res.status(404).json({ error: err.message });
        }
        res.status(500).json({error:err.message});
    }
};

exports.getDoctor = async(req,res)=>{
    try{
        const data = await service.getDoctorById(req.params.id);
        if (!data) throw new Error("Doctor not found");
        res.json(data);
    }catch(err){
        if (err.message === "Doctor not found") {
            res.status(404).json({ error: err.message });
        }
        res.status(500).json({error:err.message});
    }
};

exports.updateDoctor = async(req,res)=>{
    try{
        const data = await service.updateDoctor(req.params.id,req.body);
        res.json(data);
    }catch(err){
        if (err.message === "Doctor not found") {
            res.status(404).json({ error: err.message });
        }
        res.status(500).json({error:err.message});
    }
};

exports.deleteDoctor = async(req,res)=>{
    try{
        await service.deleteDoctor(req.params.id);
        res.json({message:'Doctor deleted'});
    }catch(err){
        res.status(500).json({error:err.message});
    }
};
