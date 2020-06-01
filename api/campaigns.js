const express = require("express");
const router = express.Router();

const axios = require("axios");

/*
const accessToken =
  "EAAIXtjZBWts4BAPArQvcLZCcBJ8ArOnZC7vhe8WCAyr9Nqpcxqx30cdfMHf5EfSb33Kef7KbMjnNBs6IAafh1ZAU6ZB86jZALFqDEwVXi2KrmDk0CYUOdsZAdPZCxS6RtysJ9ZAZBmlPizITFNZCisulwim8S8LGzf4EfMt2tWKelEWjQZDZD";
*/

function getAccessTokenError() {
  return {
    error: {
      code: 101010,
      message:
        "Access token must be specified in Authorization header: Bearer [access_token]"
    }
  };
}

function getErrorMessage(code, message) {
  return {
    error: {
      code: code,
      message: message
    }
  };
}

/*
Create a new Facebook ad campaign

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
*/

router.post("/", (req, res) => {
  let authorization = req.headers.authorization;

  if (!authorization || !authorization.trim()) {
    return res.status(403).send(getAccessTokenError());
  }

  var accessToken = authorization.substring("Bearer ".length);

  var accountId = req.query.ad_account_id;
  var campaignName = req.query.campaign_name;
  var objective = req.query.objective;

  var accountId = req.query.ad_account_id;

  if (!accountId) {
    return res
      .status(400)
      .send(getErrorMessage(101012, "Ad account id must be specified"));
  }

  if (
    !campaignName ||
    !campaignName.trim() ||
    !objective ||
    !objective.trim()
  ) {
    return res.status(400).send(getErrorMessage(101011, "Invalid data"));
  }

  return axios
    .post("https://graph.facebook.com/v7.0/act_" + accountId + "/campaigns", {
      access_token: accessToken,
      special_ad_categories: "['none']",
      name: campaignName,
      objective: objective
    })
    .then(result => {
      res.send(result.data);
    })
    .catch(err => {
      res.send(err.response.data);
    });
});

/*
Get existing Facebook ad campaigns

GET /campaigns
Headers:
  Authorization: Bearer [access_token]
Query params:
  ad_account_id: string
      description: the facebook ad account id
*/
router.get("/", (req, res) => {
  let authorization = req.headers.authorization;

  if (!authorization || !authorization.trim()) {
    return res.status(403).send(getAccessTokenError());
  }

  var accessToken = authorization.substring("Bearer ".length);

  var accountId = req.query.ad_account_id;

  if (!accountId) {
    return res
      .status(400)
      .send(getErrorMessage(101012, "Ad account id must be specified"));
  }

  return axios
    .get("https://graph.facebook.com/v7.0/act_" + accountId + "/campaigns", {
      params: {
        access_token: accessToken,
        fields: "['name']"
      }
    })
    .then(result => {
      res.send(result.data);
    })
    .catch(err => {
      res.send(err.response.data);
    });
});

/*
Update an existing Facebook ad campaign

PUT /campaigns/:campaignId
Headers:
  Authorization: Bearer [access_token]
Query params:
  campaign_id: string
    description: id of the ad campaign
  campaign_id: string
    description: new name of the campaign
*/
router.put("/:campaignId", (req, res) => {
  let authorization = req.headers.authorization;

  if (!authorization || !authorization.trim()) {
    return res.status(403).send(getAccessTokenError());
  }

  var accessToken = authorization.substring("Bearer ".length);

  var campaignId = req.params.campaignId;
  var campaignName = req.query.campaign_name;

  if (!campaignName || !campaignName.trim()) {
    return res.status(400).send(getErrorMessage(101011, "Invalid data"));
  }

  return axios
    .post("https://graph.facebook.com/v7.0/" + campaignId, {
      access_token: accessToken,
      name: campaignName
    })
    .then(result => {
      res.send(result.data);
    })
    .catch(err => {
      res.send(err.response.data);
    });
});

/*
Delete a Facebook ad campaign

DELETE /campaigns/:campaignId
Headers:
  Authorization: Bearer [access_token]
*/
router.delete("/:campaignId", (req, res) => {
  let authorization = req.headers.authorization;

  if (!authorization || !authorization.trim()) {
    return res.status(403).send(getAccessTokenError());
  }

  var accessToken = authorization.substring("Bearer ".length);

  var campaignId = req.params.campaignId;

  return axios
    .delete("https://graph.facebook.com/v7.0/" + campaignId, {
      params: {
        access_token: accessToken
      }
    })
    .then(result => {
      res.send(result.data);
    })
    .catch(err => {
      res.send(err.response.data);
    });
});

module.exports = router;
