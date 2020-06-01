Facebook Ads Manager APIs

## Setting up

In the project directory, run `npm install`

### Running the project

Run the project

    node index

Using nodemon, if you prefer

    nodemon index

The server will run on port 5000.

## APIs

This project exposes 4 API endpoints for performing CRUD operations on Facebook ad campaigns.

Access token to play around with the APIs is here. It may be revoked in the future.

    EAAIXtjZBWts4BAPArQvcLZCcBJ8ArOnZC7vhe8WCAyr9Nqpcxqx30cdfMHf5EfSb33Kef7KbMjnNBs6IAafh1ZAU6ZB86jZALFqDEwVXi2KrmDk0CYUOdsZAdPZCxS6RtysJ9ZAZBmlPizITFNZCisulwim8S8LGzf4EfMt2tWKelEWjQZDZD

### Create new campaign

    POST /campaigns
    Headers:
      Authorization: Bearer [access_token]
    Query params:
      ad_account_id: string
        description: the facebook ad account id
      campaign_name: string
        description: name of the campaign
      objective: enum
        - POST_ENGAGEMENT

### Get all campaigns

    GET /campaigns
    Headers:
      Authorization: Bearer [access_token]
    Query params:
      ad_account_id: string
        description: the facebook ad account id

### Update existing campaign

    PUT /campaigns/:campaignId
    Headers:
      Authorization: Bearer [access_token]
    Query params:
      campaign_id: string
        description: id of the ad campaign
      campaign_id: string
        description: new name of the campaign

### Delete a campaign

    DELETE /campaigns/:campaignId
    Headers:
      Authorization: Bearer [access_token]
