import database from "./../DATABASE/database.mjs";

const trackPackage = async(req, res) => {
    const { trackingNumber } = req.params;
    try {
        const sql = "SELECT * FROM tracker_info WHERE tracking_number = ?";
        database.query(sql, [trackingNumber], (err, results) => {
            if (err) {
                console.error("Database error: ", err)
                res.json({ message: "Database error" })
            }

            if (results.length === 0) {
                res.json({ message: "Tracking number not found" })
            } else {
                res.json(results[0], { message: "Successfully tracked" });
                console.log("successfully tracked");
            }
        })

    } catch (error) {
        console.error("Error Fetching Data: ", error);
    }
}

export default trackPackage;