const db=require('../db_connection');
const sacSchema=db.Schema({
    equipment_id : {type:String},
        student_id : {type:String},
        issue_date : {type:String},
        return_date : {type:String},
        loan : {type:Number}
       
});
module.exports=db.model('sac_records',sacSchema);