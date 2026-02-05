import dataBase from "../DATABASE/database.mjs";

const createPackage = async(req, res) => {
    try {
        // Basic validation
        const { senderName, receiverName, description } = req.body;
        if (!senderName || !receiverName || !description) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // GENERATING UNIQUE TRACKER ID
        function generateTrackingNumber() {
            const prefix = "TRK";
            const year = new Date().getFullYear();
            const random = Math.random().toString(36).substring(2, 8).toUpperCase();
            return `${prefix}-${year}-${random}`;
        }

        const trackingNumber = generateTrackingNumber();

        const sql =  "INSERT INTO tracker_info (tracking_number, sender_name, receiver_name, description, status) VALUES (?, ?, ?, ?, 'Pickup')";
            
        dataBase.query(sql, [trackingNumber, senderName, receiverName, description], (err, results) => {
            if (err) {
                console.error(err)
                return res.json({ message: "Error Creating Package" })
            }
            if (results) {
                console.log("Package, Successfully Created");
                return res.status(201).json({ message: "Package, successfully created", trackingNumber })
            }
        })

    } catch (error) {
        console.error("Error creating package:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export default createPackage;