var express = require('express');
var router = express.Router();
var CarController = require('../controllers/car.controller');
var DriverController = require('../controllers/driver.controller');


//CARS
router.get('/cars', CarController.getCars);
router.post('/car', CarController.createCar);
router.get('/car/:registration', CarController.getCarByRegistration);
router.put('/car/:registration', CarController.updateCarByRegistration);
router.delete('/car/:registration', CarController.deleteCarByRegistration);

//DRIVERS
router.get('/drivers', DriverController.getDrivers);
router.post('/driver', DriverController.createDriver);
router.get('/driver/:id', DriverController.getDriverById);
router.put('/driver/:id', DriverController.updateDriverById);
router.delete('/driver/:id', DriverController.deleteDriverById);


module.exports = router;
