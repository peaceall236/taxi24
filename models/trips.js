import sqlite3 from 'sqlite3';
import path from 'path';


export default class TripModel {
    constructor() {
        let sqlite = sqlite3.verbose();
        this.db = new sqlite.Database(path.resolve(__dirname, '../db/taxi.db'), (err) => {
            if (err) {
                console.log('Error when creating the database', err);
            } else {
                console.log("Database connection created")
            }
        });
    }

    createTrip(body, successCall, failCall) {
        console.log("Accessing create trip api function");
        var insertTrip = "INSERT INTO trips (driverID, riderID, departure, destination, distance) VALUES(?,?,?,?,?)";
        var insertInvoice = "INSERT INTO invoices(tripID, dueAmount, pendingAmount) VALUES(?,?,?)";

        this.db.serialize(() => {
            let that = this;
            this.db.run('BEGIN');
            this.db.run(insertTrip, [body.driverID, body.riderID, body.departure,
                body.destination, body.distance], function (err) {
                    if (err) {
                        console.log("Create trip error: ", err);
                        that.db.run("ROLLBACK");
                        failCall();
                    } else {
                        var price = parseFloat(process.env.PRICE_PER_KILOMETER) * parseFloat(body.distance);
                        var tripID = this.lastID;
                        that.db.run(insertInvoice, [tripID, price, price], (err) => {
                            if (err) {
                                console.log("Create invoice error: ", err);
                                that.db.run("ROLLBACK");
                                failCall();
                            } else {
                                console.log("create trip successful");
                                that.db.run("COMMIT");
                                successCall(tripID);
                            }
                        });
                    }
            });
        });
    }

    complete(tripID, callback) {
        console.log("Accessing complete trip api function");
        const sql = "UPDATE trips set status = 2 WHERE tripID = ?";
        this.db.run(sql, [tripID], callback);
    }

    getActive(callback) {
        console.log("Accessing active trip api function");
        const sql = "SELECT * FROM trips WHERE status = 1";
        this.db.all(sql, [], callback);
    }
}