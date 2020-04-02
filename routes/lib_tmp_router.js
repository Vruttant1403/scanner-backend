var express=require('express');
var router=express.Router();
var tmp_lib=require('../models/lib_tmp');
var lib=require('../models/library');
const date = require('date-and-time');
router.get('/:id?',function(req,res,next){
    if(req.params.id)
    {
    const id1=req.params.id;
    tmp_lib.find({user_id:req.params.id},function(err,docs){
        if(err)
        {
            console.log(err);
            res.json(err);
        }
        else
        {
            console.log(docs.length);
            //res.json(docs);
            if(docs.length==0){
                // res.json(docs);
                console.log("hi");
                var x=Date.now();
                //x=Date.now();
                //console.log(x);
                var dat_obj=new Date(x);
                var d1=new Date();
                var h=d1.getHours();
                var m=d1.getMinutes();
                var s=d1.getSeconds();
                console.log("time"+h+":"+m+":"+s);
                const tmp=new tmp_lib({
                    user_id : id1,
                    //in_time : dat_obj.getTime(),
                    in_time:new String(h+":"+m+":"+s),
                    out_time:null,
                    date:new Date(dat_obj.getFullYear(),dat_obj.getMonth(),dat_obj.getDate())
                });
                console.log(tmp);
                tmp.save(function(err,result){
                    if(err)
                    {
                        res.json(err);
                    }
                    else{
                        res.json(result);
                    }
                });
            }
            else{


                tmp_lib.find({user_id:id1},function(err,docs1){
                    console.log(docs);
                    if(err)
                    {
                        res.json(err);
                    }// wait ek min
                    else
                    {
                        //res.json(docs);
                        console.log(docs1[0]);
            
                        const now = new Date();
                        let curtime=date.format(now,'HH:mm:ss')
                        docs1[0].out_time=curtime;
                        //date:new Date(dat_obj.getFullYear(),dat_obj.getMonth(),dat_obj.getDate()+1)
                        
                        docs1[0].save(function(err1,res1){
                            if(err1)
                            {
                                res.json(err1);
                            }
                            else
                            {
                                //res.json(res1);
                                    const lib1=new lib({
                                    user_id : docs1[0].user_id,
                                    in_time :docs1[0].in_time,
                                    out_time:docs1[0].out_time,
                                    date:docs1[0].date
                                    
                                    
                                });
                                console.log(lib1);
                                lib1.save(function(err,result){
                                    if(err)
                                    {
                                        res.json(err);
                                    }
                                    else{
                                        //res.json(result);



                                        tmp_lib.deleteOne({user_id:id1},function(err,result){
                                            if(err)
                                            {
                                                res.json(err);
                                            }
                                            else
                                            {
                                                res.json(result);
                                            }
                                        })







                                    }
                                });
                                



                            }
                        });
            
                    }
                });



            }
        }
    });
}
else{
    tmp_lib.find().count(function(err,rows){
        if(err)
        {
            res.json(err);
        }
        else{
            console.log(rows);
            let x=200-rows;
            console.log(x);
            res.json(x);
            //res.redirect('/equipment/');
        }
    })
}
});

router.post('/',function(req,res,next){
    var x=Date.now();
    //x=Date.now();
    //console.log(x);
    var dat_obj=new Date(x);
    var d1=new Date();
    var h=d1.getHours();
    var m=d1.getMinutes();
    var s=d1.getSeconds();
    console.log("time"+h+":"+m+":"+s);
    const tmp=new tmp_lib({
        user_id : req.body.user_id,
        //in_time : dat_obj.getTime(),
        in_time:new String(h+":"+m+":"+s),
        out_time:null,
        date:new Date(dat_obj.getFullYear(),dat_obj.getMonth(),dat_obj.getDate())
    });
    console.log(tmp);
    tmp.save(function(err,result){
        if(err)
        {
            res.json(err);
        }
        else{
            res.json(result);
        }
    });
})
router.put('/:id',function(req,res,next){
    tmp_lib.findById(req.params.id,function(err,docs){
        console.log(docs);
        if(err)
        {
            res.json(err);
        }// wait ek min
        else
        {
            //res.json(docs);
        


            docs.out_time=Date.now(),
            //date:new Date(dat_obj.getFullYear(),dat_obj.getMonth(),dat_obj.getDate()+1)
            
            docs.save(function(err1,res1){
                if(err1)
                {
                    res.json(err1);
                }
                else
                {
                    res.json(res1);
                }
            });

        }
    });
});


router.delete('/:id',function(req,res,next){
    tmp_lib.deleteOne({_id:req.params.id},function(err,result){
        if(err)
        {
            res.json(err);
        }
        else
        {
            res.json(result);
        }
    })
});

module.exports=router
