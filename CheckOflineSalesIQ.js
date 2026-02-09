const axios = require('axios');
const AutoDispatierAPI_URL = 'https://www.zohoapis.com/crm/v7/functions/checkofflnestatus/actions/execute?auth_type=apikey&zapikey=1003.0006d5095e6ed585b499067e421f261f.2ebf396ebcf8ce81437ad9d64a6704c4';

const payload = {
  arguments: {
    // Replace or adjust this structure if Zoho requires something specific
    message: "Triggered from Render every 20s"
  }
};

async function CheckOflineSalesIQ() {
  
  try {
    const res = await axios.post(AutoDispatierAPI_URL, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(`✅ Success CheckOflineSalesIQ at ${new Date().toISOString()}`, res.data);

    
    console.log(`✅ Success CheckOflineSalesIQ at ${new Date().toISOString()}`, res.data);
  } catch (err) {
    console.error(`❌ Error CheckOflineSalesIQ at ${new Date().toISOString()}`, err.response?.data || err.message);
  }
  console.log("⏳ Starting 120s loop to call Zoho API CheckOflineSalesIQ");
}

module.exports = CheckOflineSalesIQ;