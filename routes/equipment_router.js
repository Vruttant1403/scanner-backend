var express=require('express');
var router=express.Router();
var equipment=require('../models/equipment');
//wait ek min
router.get('/:id?',function(req,res,next){
    if(req.params.id)
    {
    equipment.findById(req.params.id,function(err,docs){
        if(err)
        {
            console.log(err);
            res.json(err);
        }
        else
        {
            console.log(docs);
            //res.json(docs);
            res.render('update_equipment',{
                title:'display by id',
                equipment:docs,
                error:null
            })
        }
    });
}
else
{
  
    equipment.find(function(err,docs){
        if(err)
        {
            console.log(err);
            res.json(err);
        }
        else
        {
            console.log(docs);
            //res.json(docs);
            res.render('display_equipment',{
                title:'display',
                equipments:docs,
                errors:null
            })
        }
    
    });
}

});




router.post('/',function(req,res,next){
    const equi=new equipment({
        equipment_id : req.body.equipment_id,
        student_id : req.body.student_id,
        issue_date : req.body.issue_date,
        return_date : req.body.return_date,
        loan : req.body.loan
        
    });
    console.log(equi);
    equi.save(function(err,result){
        if(err)
        {
            res.json(err);
        }
        else{
            res.json(result);
        }
    });
})

router.post('/:id',function(req,res,next){
    equipment.findById(req.params.id,function(err,docs){
        console.log(docs);
        if(err)
        {
            res.json(err);
        }// wait ek min
        else
        {
            //res.json(docs);
            docs.equipment_id = req.body.equipment_id;
            docs.student_id = req.body.student_id;
            docs.issue_date = req.body.issue_date;
            docs.return_date = req.body.return_date;
            docs.loan = req.body.loan;
            
            docs.save(function(err1,res1){
                if(err1)
                {
                    res.json(err1);
                }
                else
                {
                    //res.json(res1);
                    res.redirect('/equipment');
                }
            });

        }
    });
});



router.get('/delete/:id',function(req,res,next){
    equipment.deleteOne({_id:req.params.id},function(err,result){
        if(err)
        {
            res.json(err);
        }
        else{
            //res.json(result);
            res.redirect('/equipment');
        }
    })
});

module.exports=router;
