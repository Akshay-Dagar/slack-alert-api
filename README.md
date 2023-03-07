# Prerequisite: 
Create a slack app and a webhook for that app. Link it to your slack channel. ref: https://youtu.be/sxtC40gUS2A

# How to Run
1. Clone this repo
2. Install dependencies (cd to project dir -> npm install)
3. Create a .env file with your slack webhook url (see .env.sample)
4. Run "npm start" command
5. Import this curl into postman and send request (this can also be done via command prompt or python etc.):

    curl --location 'http://localhost:5000/alert' \
        --header 'Content-Type: application/json' \
        --data-raw '{
            "RecordType": "Bounce",
            "Type": "SpamNotification",
            "TypeCode": 512,
            "Name": "Spam notification",
            "Tag": "",
            "MessageStream": "outbound",
            "Description": "The message was delivered, but was either blocked by the user, or classified as spam, bulk mail, or had rejected content.",
            "Email": "zaphod@example.com",
            "From": "notifications@honeybadger.io",
            "BouncedAt": "2023-02-27T21:41:30Z",
        }'