var nodemailer=require('nodemailer');
var demo={
    sendMail:function(demo,callback){
        var transporter=nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:'vidhipshah10@gmail.com',
                pass:"Vidhi@12345678"
            }
        });
        let email_id=demo.id+"@daiict.ac.in";
        var mailOptions={
            from:'vidhipshah10@gmail.com',
            to:email_id,
            subject:"equipment borrowed",
            text:"You have borrowed this "+demo.equipment+ " and make sure you return before this "+demo.return_date+ " otherwise pentaly is charged"
        };
        transporter.sendMail(mailOptions,function(error,info){
            if(error){
                console.log(error)
            }
            else{
                console.log('email sent'+info.response);
            }
        });
        
    }
}
module.exports=demo;