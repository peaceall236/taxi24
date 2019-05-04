import { Router } from 'express';
import RiderModel from '../models/riders';
import geolib from 'geolib';

const router = Router();

// retrieve all riders
router.get('/all', (req, res) => {
    const model = new RiderModel();
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

// retrieve rider with id = :id
router.get('/:id', (req, res) => {
    const model = new RiderModel();
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

// retrieve :size drivers who are nearby
router.post('/drivers/:size', (req, res) => {
    const model = new RiderModel();
    model.getNear((err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).json( {
                "message": "contact service provider"
            })
        }
        // find drivers nearby
        let returnRows = rows.sort((a, b) => {
            let distA = geolib.getDistance(req.body, {
                "latitude": a.currentLocation.split(":")[0],
                "longitude": a.currentLocation.split(":")[1]
            });
            let distB = geolib.getDistance(req.body, {
                "latitude": b.currentLocation.split(":")[0],
                "longitude": b.currentLocation.split(":")[1]
            });
            return (distA - distB);
        });
        if (returnRows.length > req.params.size) {
            res.status(200).json(returnRows.splice(req.params.size, returnRows - req.params.size));
        } else
            res.status(200).json(returnRows);
    });
});

export default router;