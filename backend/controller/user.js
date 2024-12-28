import user from "../models/models.js";

export const addRecord = async (req, res) => {
    const { name, age } = req.body;
    console.log(req.body)
    const sampleData = new user({ name, age });
    try {
        await sampleData.save();
        res.status(201).send('Data added successfully!');
    } catch (err) {
        res.status(500).send('Failed to add data: ' + err.message);
    }
};

export const getAllRecords = async (req, res) => {
    try {
        const records = await user.findAll();;
        res.status(200).json(records);
    } catch (err) {
        res.status(500).send('Failed to fetch records: ' + err.message);
    }
};
