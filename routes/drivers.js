import { Router } from 'express';
import DriverModel from  '../models/drivers';
import geolib from 'geolib';

const router = Router();

// get all drivers
router.get('/all', (req, res) => {
    let model = new DriverModel();
    model.getAll((err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).json( {
                "message": "contact service provider"
            })
        } 
        res.status(200).json(rows);
    });
});

// get available
router.get('/available', (req, res) => {
    let model = new DriverModel();
    model.getAvailable((err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).json( {
                "message": "contact service provider"
            })
        }
        res.status(200).json(rows);
    });
});

// get available drivers in how many meters
router.post('/available/:approximate', (req, res) => {
    let model = new DriverModel();
    model.getApproximate((err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).json( {
                "message": "contact service provider"
            })
        }
        // calculate approximate
        let returnRows = rows.filter((a) => {
            let distA = geolib.getDistance(req.body, {
                "latitude": a.currentLocation.split(":")[0],
                "longitude": a.currentLocation.split(":")[1]
            });
            console.log("distance is ", distA);
            if (distA <= req.params.approximate) {
                return true;
            }
            return false;
        });
        res.status(200).json(returnRows);
    });
});

// get drivers with id = :id
router.get('/:id', (req, res) => {
    let model = new DriverModel();
    model.getSingle(req.params.id, (err, row) => {
        if (err) {
            console.log(err);
            res.status(500).json( {
                "message": "contact service provider"
            })
        }
        res.status(200).json(row);
    });
});


export default router;