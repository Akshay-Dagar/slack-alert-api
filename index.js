import express from "express";
import dotenv from 'dotenv'
import fetch from "node-fetch";

const app = express();
app.use(express.json());
dotenv.config();

const slackHookUrl = process.env.SLACK_HOOK_URL

//send alert to desired slack channel
const sendAlertToSlack = async msg => {
    try {
        const payload = { text: msg };
        const res = await fetch(slackHookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })

        if (!res.ok) {
            const err = await res.text();
            throw new Error(`Failed to send Slack alert: ${err}`);
        }
        return await res.text()
    }
    catch (err) {
        throw err
    }
}

//check if payload is of type SpamNotification
app.post('/alert', async (req, res) => {
    try {
        const payload = req.body;
        if (!payload.Email || !payload.Type) {
            return res.status(400).send('Bad Request');
        }
        
        if (payload.Type === 'SpamNotification') {
          const response = await sendAlertToSlack(payload.Email);
          res.status(200).send('Alert sent to slack channel');
        } else {
          res.status(200).send('Not a spam email');
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
})

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server listening on port ${process.env.PORT || 5000}`);
});