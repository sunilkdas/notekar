const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt= require('passport-jwt').ExtractJwt;
const User = require("../modals/users");
const Note = require("../modals/notes");
const config= require('../config/database');

module.exports= function(passport){
    let opts= {};
    //jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVlYzk1ZDVhNGFkZTZkNTk1MGMyMGRiOSIsIm5hbWUiOiJzdW5pbCIsImVtYWlsIjoic2tkQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoic2tkZWxmYWl0ZSIsInBhc3N3b3JkIjoiJDJiJDEwJERydGpiSEQyRS5DYWdNejY0emhvSi52cHJwd21mcDJSZVRJL2lvLjFNL1VCZy5ub3RmSlJhIiwiX192IjowfSwiaWF0IjoxNTkwMjkxOTcxLCJleHAiOjE1OTA4OTY3NzF9.ATPel7gXzIGeruvCNklGoAdAdilfOJ91zOiUJnYHrFc
    opts.jwtFromRequest= ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey= config.secret;
    passport.use(new JwtStrategy(opts,(jwt_payload, done)=>{
        console.log(jwt_payload);

        User.getUserById(jwt_payload.user._id, (err, user)=>{
            if(err){
                return done(err,false);
            }
            if(user){
                return done(null,user);
            }
            else{
                return done(null,false);
            }
        })
      
    }))

}
