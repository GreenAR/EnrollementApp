const Customer          = require('../models').Customer;

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;

    if(!body.unique_key && !body.email){
        return ReE(res, 'Please enter an email to register.');
    } else{
        let err, user;

        [err, user] = await to(Customer.create(body));

        if(err) return ReE(res, err, 422);
        return ReS(res, {message:'Successfully created new Customer.', customer:user.toWeb()}, 201);
    }
}
module.exports.create = create;

const createWithStaffmember = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;

    if(!body.unique_key && !body.email){
        return ReE(res, 'Please enter an email to register.');
    } else{
        let err, customer,customer2;
        [err, customer] = await to(Customer.create(body));
        if(err) return ReE(res, err, 422);

        customer.setStaffmember(req.user);

        [err, customer2] = await to(customer.save());
        if(err) return ReE(res, err, 422);

        return ReS(res, {message:'Successfully created new Customer.',customer:customer2}, 201);
    }
}
module.exports.createWithStaffmember = createWithStaffmember;

