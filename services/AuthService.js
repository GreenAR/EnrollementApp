const User 			= require('./../models').Staffmember;
const validator     = require('validator');
console.log(require('./../models').Staffmember);
const getUniqueKeyFromBody = function(body){// this is so they can send in 3 options unique_key, email, or phone and it will work
    let unique_key = body.unique_key;
    if(typeof unique_key==='undefined'){
        if(typeof body.email != 'undefined'){
            unique_key = body.email
        }else{
            unique_key = null;
        }
    }

    return unique_key;
}
module.exports.getUniqueKeyFromBody = getUniqueKeyFromBody;

const createUser = async function(userInfo){
    let unique_key, auth_info, err;

    auth_info={}
    auth_info.status='create';

    unique_key = getUniqueKeyFromBody(userInfo);
    if(!unique_key) TE('An email was not entered.');

    if(validator.isEmail(unique_key)){
        auth_info.method = 'email';
        userInfo.email = unique_key;

        [err, user] = await to(User.create(userInfo));
        if(err) TE('user already exists with that email');

        return user;

    }else{
        TE('A valid email was not entered.');
    }
}
module.exports.createUser = createUser;

const authUser = async function(userInfo){//returns token
    let unique_key;
    let auth_info = {};
    auth_info.status = 'login';
    unique_key = getUniqueKeyFromBody(userInfo);

    if(!unique_key) TE('Please enter an email to login');


    if(!userInfo.password) TE('Please enter a password to login');

    let user;
    if(validator.isEmail(unique_key)){
        auth_info.method='email';

        [err, user] = await to(User.findOne({where:{email:unique_key}}));
        console.log(err, user, unique_key);
        if(err) TE(err.message);

    }else{
        TE('A valid email was not entered');
    }

    if(!user) TE('Not registered');

    [err, user] = await to(user.comparePassword(userInfo.password));

    if(err) TE(err.message);

    return user;

}
module.exports.authUser = authUser;