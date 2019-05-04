import sqlite3 from 'sqlite3';
import path from 'path';


export default class DriverModel {
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

    getAll(callback) {
        const sql = "SELECT * FROM drivers";
        this.db.all(sql, [], callback);
    }
    getAvailable(callback) {
        const sql = "SELECT * FROM drivers WHERE status = 1";
        this.db.all(sql, [], callback);
    }
    getSingle(id, callback) {
        const sql = "SELECT * FROM drivers WHERE driverID = ?";
        this.db.get(sql, [id], callback);
    }
    getApproximate(callback) {
        const sql = "SELECT * FROM drivers WHERE status = 1";
        this.db.all(sql, [], callback);
    }
}