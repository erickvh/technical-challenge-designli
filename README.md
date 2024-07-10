### Take home challenge (Node.js)

#### Pre-requisites

- Node.js >= 18.0.0
- Yarn >= 1.22.0

#### Installation

```bash
yarn install
```

#### Running the tests

```bash
yarn test
```

#### Running the application

```bash
yarn start:dev
```

#### Endpoints

- POST /ses-events-parser (Easy challenge)
- POST /json-email-extractor (Real challenge)

You can take a look at the API documentation by running the application and visiting the `/api` endpoint.
[http://localhost:3000/docs](http://localhost:3000/docs)
[https://take-home-challenge-beta.vercel.app/docs](https://take-home-challenge-beta.vercel.app/docs)

#### Challenge

#### Problem 1 (Easy challenge)

The solution to this problem can be found in the `src/ses-parser` directory. The `ses-parser` module is responsible for parsing the SES events and returning the number of emails that were delivered successfully.

The module exports a single function `parseSesEvents` that takes an array of SES events and returns the number of emails that were delivered successfully and with each of their veredit status.

The endpoint should receive an array of SES events

```json
{
  "Records": [
    {
      "eventVersion": "1.0",
      "ses": {
        "receipt": {
          "timestamp": "2015-09-11T20:32:33.936Z",
          "processingTimeMillis": 222,
          "recipients": ["recipient@example.com"],
          "spamVerdict": {
            "status": "PASS"
          },
          "virusVerdict": {
            "status": "PASS"
          },
          "spfVerdict": {
            "status": "PASS"
          },
          "dkimVerdict": {
            "status": "PASS"
          },
          "dmarcVerdict": {
            "status": "PASS"
          },
          "dmarcPolicy": "reject",
          "action": {
            "type": "SNS",
            "topicArn": "arn:aws:sns:us-east-1:012345678912:example-topic"
          }
        },
        "mail": {
          "timestamp": "2015-09-11T20:32:33.936Z",
          "source": "61967230-7A45-4A9D-BEC9-87CBCF2211C9@example.com",
          "messageId": "d6iitobk75ur44p8kdnnp7g2n800",
          "destination": ["recipient@example.com"],
          "headersTruncated": false,
          "headers": [
            {
              "name": "Return-Path",
              "value": "<0000014fbe1c09cf-7cb9f704-7531-4e53-89a1-5fa9744f5eb6-000000@amazonses.com>"
            },
            {
              "name": "Received",
              "value": "from a9-183.smtp-out.amazonses.com (a9-183.smtp-out.amazonses.com [54.240.9.183]) by inbound-smtp.us-east-1.amazonaws.com with SMTP id d6iitobk75ur44p8kdnnp7g2n800 for recipient@example.com; Fri, 11 Sep 2015 20:32:33 +0000 (UTC)"
            },
            {
              "name": "DKIM-Signature",
              "value": "v=1; a=rsa-sha256; q=dns/txt; c=relaxed/simple; s=ug7nbtf4gccmlpwj322ax3p6ow6yfsug; d=amazonses.com; t=1442003552; h=From:To:Subject:MIME-Version:Content-Type:Content-Transfer-Encoding:Date:Message-ID:Feedback-ID; bh=DWr3IOmYWoXCA9ARqGC/UaODfghffiwFNRIb2Mckyt4=; b=p4ukUDSFqhqiub+zPR0DW1kp7oJZakrzupr6LBe6sUuvqpBkig56UzUwc29rFbJF hlX3Ov7DeYVNoN38stqwsF8ivcajXpQsXRC1cW9z8x875J041rClAjV7EGbLmudVpPX 4hHst1XPyX5wmgdHIhmUuh8oZKpVqGi6bHGzzf7g="
            },
            {
              "name": "From",
              "value": "sender@example.com"
            },
            {
              "name": "To",
              "value": "recipient@example.com"
            },
            {
              "name": "Subject",
              "value": "Example subject"
            },
            {
              "name": "MIME-Version",
              "value": "1.0"
            },
            {
              "name": "Content-Type",
              "value": "text/plain; charset=UTF-8"
            },
            {
              "name": "Content-Transfer-Encoding",
              "value": "7bit"
            },
            {
              "name": "Date",
              "value": "Fri, 11 Sep 2015 20:32:32 +0000"
            },
            {
              "name": "Message-ID",
              "value": "<61967230-7A45-4A9D-BEC9-87CBCF2211C9@example.com>"
            },
            {
              "name": "X-SES-Outgoing",
              "value": "2015.09.11-54.240.9.183"
            },
            {
              "name": "Feedback-ID",
              "value": "1.us-east-1.Krv2FKpFdWV+KUYw3Qd6wcpPJ4Sv/pOPpEPSHn2u2o4=:AmazonSES"
            }
          ],
          "commonHeaders": {
            "returnPath": "0000014fbe1c09cf-7cb9f704-7531-4e53-89a1-5fa9744f5eb6-000000@amazonses.com",
            "from": ["sender@example.com"],
            "date": "Fri, 11 Sep 2015 20:32:32 +0000",
            "to": ["recipient@example.com"],
            "messageId": "<61967230-7A45-4A9D-BEC9-87CBCF2211C9@example.com>",
            "subject": "Example subject"
          }
        }
      },
      "eventSource": "aws:ses"
    }
  ]
}
```

The endpoint returns a json object with the following structure:

```json
[
  {
    "spam": true,
    "virus": true,
    "dns": true,
    "mes": "septiembre",
    "retrasado": false,
    "emisor": "61967230-7A45-4A9D-BEC9-87CBCF2211C9",
    "receptor": ["recipient"]
  }
]
```

#### Problem 2 (Real Challenge)

The solution to this problem can be found in the `src/json-email-extractor` directory. The `json-email-extractor` module is responsible for extracting json documents and return them back as a json.

In order to simplify the sample data, we should use the following `.eml` files to test the endpoint:

- [Email with json attachment](https://raw.githubusercontent.com/erickvh/technical-challenge-designli/feature/json-extractor-from-email-file/sample-emails/email-json-attached.eml)
- [Email with url to json attachment](https://raw.githubusercontent.com/erickvh/technical-challenge-designli/feature/json-extractor-from-email-file/sample-emails/email-page-with-json.eml)
- [Email with web page with json files](https://raw.githubusercontent.com/erickvh/technical-challenge-designli/feature/json-extractor-from-email-file/sample-emails/email-page-with-json.eml)

The solution proposed for this problem is to return the json values for each concern also in case the email has a json file attached or a link to a json file, the solution should return the json values for each concern.

The endpoint should receive an email file url

```json
{
  "fileUrl": "https://raw.githubusercontent.com/erickvh/technical-challenge-designli/feature/json-extractor-from-email-file/sample-emails/email-direct-json-link.eml"
}
```

The endpoint returns a json object with the following structure:

```json
{
  "webpage": {},
  "attachment": {},
  "json-link": {}
}
```
