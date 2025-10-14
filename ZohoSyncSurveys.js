const sql = require('mssql');
const connectDB = require('./Server_Connection');
const axios = require('axios');
const SurveyAPI_URL = 'https://www.zohoapis.com/crm/v7/functions/receive_surveys/actions/execute?auth_type=apikey&zapikey=1003.0006d5095e6ed585b499067e421f261f.2ebf396ebcf8ce81437ad9d64a6704c4';

async function ZohoSyncSurveys() {
  try {
    (async () => {
      const db = await connectDB();
      const result = await db.request().query('SELECT * FROM dbo.SurveyResults WHERE Zohoid = \'\'OR Zohoid IS NULL');
      // Example query
      console.log(result.recordset);
      if(result.recordset.length > 0){
      const payload = {
            "Data":result.recordset
        };
      const Send_Survey = await axios.post(SurveyAPI_URL, payload, {
        headers: {
          'Content-Type': 'application/jnson'
        }

      });
      Survey_list = Send_Survey.data.Creation_list;
      console.log(Survey_list.length)
      for (let index = 0; index < Survey_list.length; index++) {
        console.log()
        // const element = array[index];
        Survey_data = Survey_list[index];
        zoho_id = Survey_data.zoho_id ;
        Feedback_ID = Survey_data.Feedback_ID;
        console.log(zoho_id);
        console.log(Feedback_ID);
        console.log( {"Survey_list":Survey_list[index]});
        const Update_zoho_id = await db.request()
          .input('Zohoid', zoho_id)
          .query('UPDATE dbo.SurveyResults SET Zohoid = @Zohoid WHERE LogId = '+Feedback_ID);
        console.log({"Update_zoho_id":Update_zoho_id.rowsAffected});
      }
      console.log(Survey_list);
      }else{
        console.log("without data");
      }

    })();
  } catch (err) {
    console.error(`❌ Error at ${new Date().toISOString()}`, err.response?.data || err.message);
  }
}
module.exports = ZohoSyncSurveys;
