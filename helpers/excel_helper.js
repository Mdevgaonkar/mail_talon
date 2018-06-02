const request = require('request');
const authHelper = require('../helpers/auth');
const sheets = require('./excel/sheets');


const excel_drive_item_id = 'F084686CF62DAC50!106';

async function log_PI_to_excel(req) {
    let parms = {
        module: 'excel_helper',
        auth: false,
        errors: [],
        debug: []
    };

    // const PIs = req.body.PIs;

    const accessToken = await authHelper.getAccessToken(req.cookies);
    if (accessToken) {
        parms.auth = true;
        //get all sheet names
        let sheet_list = await sheets.getAllSheets(accessToken, excel_drive_item_id);

        //get current month and year (Oct-18) and see if it exists else create
        let now = new Date();
        let month = now.toLocaleString('en-us', {
            month: "short"
        });
        let year = now.toLocaleString('en-us', {
            year: "2-digit"
        });
        let current_sheet_name = month + '-' + year;

        if (sheet_list.body.sheets.indexOf(current_sheet_name) == -1) {
            //create new sheet
            let new_sheet = await sheets.createNewSheet(accessToken, excel_drive_item_id, current_sheet_name);
            if (new_sheet.body) {
                //create new table

            }


        } else {
            //write to that 
        }

    }


}

exports.log_PI_to_excel = log_PI_to_excel;