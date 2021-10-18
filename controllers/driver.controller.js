const Driver = require('../models/driver');

exports.getDrivers = async function (req, res) {
    const findMany = Driver.find({}).populate("car").then((results) => {
        return res.status(200).json(results);
    }).catch((fail) => {
        console.log(fail);
        return res.status(200).json({error: fail});
    });
}

exports.getDriverById = async function (req, res) {
    const findOne = Driver.find({_id: req.params.id}).populate("car").then((result) => {
        return res.status(200).json(result);
    }).catch((fail) => {
        console.log(fail);
        //return res.status(500).json({error: fail});
        return res.status(200).json({error: 'Unable to find driver with ' + req.params.id + ' id!'})
    });
}

exports.updateDriverById = async function (req, res) {
    const findOne = Driver.find({_id: req.params.id}, (fail, result) => {
        if (result) {
            const updateOne = Driver.updateOne({
                lastname: req.body.lastname,
                firstname: req.body.firstname,
                car: req.body.car
            }, (fail, success) => {
                if (success) {
                    return res.status(200).json({success: 'Successfully updated ' + req.params.id + ' driver!'});
                }
                if (fail) {
                    console.log(fail);
                    return res.status(200).json({success: 'Unable to update ' + req.params.id + ' driver!'});
                }
            });
        }
        if (fail) {
            console.log(fail);
            return res.status(200).json({error: 'Unable to update this driver!'});
        }
    });
}

exports.deleteDriverById = async function (req, res) {
    const deleteOne = Driver.deleteOne({_id: req.params.id}, (fail, success) => {
        if (success) {
            if (success.deletedCount > 0) {
                return res.status(200).json({success: 'Successfully deleted driver ' + req.params.id + ' !'});
            } else {
                return res.status(200).json({success: 'This driver does not exist!'});
            }
        }
        if (fail) {
            console.log(fail);
            return res.status(200).json({success: 'This driver does not exist!'});
        }
    })
}

exports.createDriver = async function (req, res) {
    const data = req.body;
    const newDriver = {
        car: data.car,
        lastname: data.lastname,
        firstname: data.firstname
    }
    const createDriver = Driver.insertMany(newDriver, (fail, success) => {
        if (success) {
            if (success.length > 0) {
                return res.status(200).json({success: 'Successfully created driver with id #' + success[0]._id + ' !'});
            } else {
                return res.status(200).json({error: 'Unable to create the driver !'});
            }
        }
        if (fail) {
            console.log(fail);
            return res.status(200).json({error: fail.name});
        }
    })
}