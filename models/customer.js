'use strict';

module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('Customer', {
        firstname                   : DataTypes.STRING,
        lastname                    : DataTypes.STRING,
        email                       : {type: DataTypes.STRING, allowNull: true, unique: true, validate: { isEmail: {msg: "Email invalid."} }},
        email_verified              : { type: DataTypes.BOOLEAN, defaultValue: false },
        region                      : DataTypes.STRING,
        country                     : DataTypes.STRING,
        phone_number                : {type: DataTypes.STRING, validate: { len: {args: [7, 20], msg: "Phone number invalid, too short."}, isNumeric: { msg: "not a valid phone number."} }},
        phone_number_verified       : { type: DataTypes.BOOLEAN, defaultValue: false },
        subscription_date           : { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        birthdate                   : DataTypes.STRING,
        gender                      : DataTypes.ENUM('MALE', 'FEMALE'),
        zip_code                    : DataTypes.INTEGER,
        government_id               : DataTypes.STRING,
        agency_name                 : DataTypes.STRING,
    });

    Model.associate = function(models){
        this.Staffmember = this.belongsTo(models.Staffmember,{foreignKey: 'staffmemberId'});
    };

    Model.prototype.getJWT = function () {
        let expiration_time = parseInt(CONFIG.jwt_expiration);
        return "Bearer "+jwt.sign({user_id:this.id}, CONFIG.jwt_encryption, {expiresIn: expiration_time});
    };

    Model.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return Model;
};