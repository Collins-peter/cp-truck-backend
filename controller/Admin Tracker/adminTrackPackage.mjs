import dataBase from "../DATABASE/database.mjs";

const adminTrackPackage = async(req, res) => {
    
    const {trackId} = req.params;
    if (!trackId || trackId.trim() === '') {
        return res.status(400).json({ success: false, error: "Tracking ID is required" });
    }
    try{
        const sql = "SELECT * FROM tracker_info WHERE tracking_number = ?";
        dataBase.query(sql, [trackId], (err, results) => {
            if (err) {
                console.error("Query error: ", err);
                return res.status(500).json({ message: "Database error" });
            } 
            console.log("DB result: ", results);
            
            if (results.length === 0) {
                return res.status(404).json({ message: "Tracking number not found" });
            } else {
                res.json(results[0]);
        }
        })

       
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}


export default adminTrackPackage;