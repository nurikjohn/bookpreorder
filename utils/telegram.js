const axios = require('axios');

require('dotenv').config();

const token = process.env.TOKEN;
const channel_id = process.env.CHANNEL_ID;

exports.sendOrder = (text) =>
  axios.post(
    `https://api.telegram.org/bot${token}/sendMessage?chat_id=${channel_id}&text=${encodeURIComponent(
      text
    )}&parse_mode=HTML`
  );
