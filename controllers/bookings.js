const Booking = require('../models/Booking');
const Company = require('../models/Company');

exports.getBookings=async (req, res, next)=>{
    let query;
    if(req.user.role !== 'admin'){
        query=Booking.find({user:req.user.id}).populate({
            path: 'company' ,
            select: 'name province tel'
        }); 
    } 
    else{ 
        if (req.params.companyId) {
            console.log(req.params.companyId);
            query= Booking.find({company: req.params.companyId }).populate({
                path: 'company' ,
                select: 'name province tel'
            }); 
        }
        else query = Booking.find().populate({
            path: 'company' ,
            select: 'name province tel'
        }); 
    }
    try {
        const bookings= await query;

        res.status(200).json({
            success: true ,
            count: bookings.length ,
            data: bookings
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false, 
            message: "Cannot find Booking"
        });
    }
};

exports.getBooking=async (req,res,next)=>{
    try {
        const booking = await Booking.findById(req.params.id).populate({
            path: 'company',
            select: 'name description tel'
        });

        if(!booking){
            return res.status(404).json({success: false, message:`No booking with the id of ${req.params.id}`});
        }

        if(booking.user.toString()!== req.user.id && req.user.role !== 'admin'){
            return res.status(401).json({success: false, message: `User ${req.user.id} is not authorized to get this booking`});
        }
        
        res.status(200).json({
            success:true,
            data: booking
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Cannot find Booking"});
    }
};

exports.addBooking=async (req,res,next)=>{
    try {
        req.body.company=req.params.companyId ;

        const company = await Company.findById(req.params.companyId) ;

        if(!company){
            return res.status(404).json({success: false, message:`No company with the id of ${req.params.companyId}`});
        }

        req.body.user=req.user.id;

        const existedBookings = await Booking.find({user: req.user.id});

        if(existedBookings.length >= 3 && req.user.role !== 'admin'){
            return res.status(400).json({success:false,message:`The user with ID ${req.user.id} has already made 3 bookings` });
        }

        const booking = await Booking.create(req.body) ;

        res.status(200).json({
            success:true,
            data: booking
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Cannot create Booking"});
    }
};

exports.updateBooking=async (req, res, next) =>{
    try {
        let booking= await Booking.findById(req.params.id);

        if(!booking){
            return res.status(404).json({success: false, message:`No booking with the id of ${req.params.id}`});
        }

        if(booking.user.toString()!== req.user.id && req.user.role !== 'admin'){
            return res.status(401).json({success: false, message: `User ${req.user.id} is not authorized to update this booking`});
        }

        booking=await Booking.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: booking
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Cannot update Booking"});
    }
};

exports.deleteBooking=async (req, res, next) =>{
    try {
        const booking= await Booking.findById(req.params.id);

        if(!booking){
            return res.status(404).json({success: false, message:`No booking with the id of ${req.params.id}`});
        }
        
        if(booking.user.toString()!== req.user.id && req.user.role !== 'admin'){
            return res.status(401).json({success: false, message: `User ${req.user.id} is not authorized to delete this booking`});
        }

        await booking.deleteOne() ;
        res.status(200).json({
            success: true ,
            data: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Cannot delete Booking"});
    }
};
        