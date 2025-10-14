const express = require('express');
const connectDB = require('./Server_Connection');
const ZohoSyncSurveys = require('./ZohoSyncSurveys');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const axios = require('axios');
app.use(cors());
app.use(express.json());

app.get('/daley', (req, res) => {
  const delay = parseInt(req.query.delay) || 0;
  console.log(`Received request, delaying by ${delay}ms`);
  setTimeout(() => {
    res.json({ message: `Response delayed by ${delay} ms` });
  }, delay);
});

app.listen(PORT, () => {
  console.log(`API is running ons port ${PORT}`);
});

app.get('/', (req, res) => res.send('Flyin API Worker Running...'));
app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));

// === Zoho API Task ===

const AutoDispatierAPI_URL = 'https://www.zohoapis.com/crm/v7/functions/repair_availability_new_v/actions/execute?auth_type=apikey&zapikey=1003.0006d5095e6ed585b499067e421f261f.2ebf396ebcf8ce81437ad9d64a6704c4';

const payload = {
  arguments: {
    // Replace or adjust this structure if Zoho requires something specific
    message: "Triggered from Render every 20s"
  }
};

async function callZohoFunction() {
  
  try {
    const res = await axios.post(AutoDispatierAPI_URL, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(`✅ Success at ${new Date().toISOString()}`, res.data);

    
    console.log(`✅ Success at ${new Date().toISOString()}`, res.data);
  } catch (err) {
    console.error(`❌ Error at ${new Date().toISOString()}`, err.response?.data || err.message);
  }
  console.log("⏳ Starting 20s loop to call Zoho API...");
}
async function runZohoSyncSurveys() { 
  const zohosync = await ZohoSyncSurveys();
}

// callZohoFunction();
setInterval(callZohoFunction, 20 * 1000);
setInterval(runZohoSyncSurveys, 5 * 1000);
