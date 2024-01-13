const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get('/data', async (req, res) => {
    try {
        const data = await fs.readFile('cards.json', 'utf-8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/data', async (req, res) => {
    try {
        const updatedData = req.body;
        await fs.writeFile('cards.json', JSON.stringify(updatedData, null, 2), 'utf-8');
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});