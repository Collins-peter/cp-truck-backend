import dataBase from "../DATABASE/database.mjs";


const updateStatus = async(req, res) => {
    
    const { trackingId, status } = req.body;

    // Input validation
    if (!status || status.trim() === '') {
        return res.status(400).json({ error: "Invalid status: must be a non-empty string" });
    }
    if (!trackingId) {
        return res.status(400).json({ error: "Invalid tracking number: must be a string" });
    }

    try {

        const result = dataBase.execute(
            "UPDATE tracker_info SET status = ? WHERE tracking_number = ?",
            [status.trim(), trackingId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Package not found" });
        } else {

            //REAL-TIME EMIT
            io.emit("statusUpdated", {
                trackingId,
                status,
                success: "Status Successfully Updated"
            })

            res.json({ success: true });
        }

    } catch (error) {
        console.error("Error updating status:", error);
        res.status(500).json({ error: "Failed to update status" });
    }
};


export default updateStatus;