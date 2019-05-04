import { Router } from 'express';
import TripModel from '../models/trips';

const router = Router();

// create trip
router.post('/', (req, res) => {
    let model = new TripModel();
    model.createTrip(req.body, (tripID) => {
        res.status(200).json({
            "message": "Trip created",
            "tripID": tripID
        });
    }, () => {
        res.status(500).json({
            "message": "Trip not created"
        });
    });
    
});

// mark trip as complete
router.get('/:id/complete', (req, res) => {
    let model = new TripModel();
    model.complete(req.params.id, (err) => {
        if (err) {
            console.log("Complete trip error: ", err);
            res.status(500).json({
                "message": "Trip complete operation failed."
            });
        }
        console.log("complete trip successful");
        res.status(200).json({
            "message": "Trip complete"
        });
    });
});

// get all active trips
router.get('/active', (req, res) => {
    let model = new TripModel();
    model.getActive((err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).json( {
                "message": "contact service provider"
            })
        } 
        res.status(200).json(rows);
    });
});


export default router;