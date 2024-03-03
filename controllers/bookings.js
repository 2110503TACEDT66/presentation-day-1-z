const Booking = require('../models/Booking');

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