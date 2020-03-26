const db=require('../db_connection');
const equipmentSchema=db.Schema({
        equipment_id : {type:String},
        student_id : {type:String},
        issue_date : {type:String},
       
       
});
module.exports=db.model('equipments_borrows',equipmentSchema);