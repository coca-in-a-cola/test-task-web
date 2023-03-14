import db from './db.js'
import { parse } from "csv-parse";
import fs from 'fs'
import { config } from "../app.config.js"
import { User } from "./models/user.js"

await db.authenticate()
  .catch(error => console.error(error))
// выведет Executing (default): SELECT 1+1 AS result при успешном подключении

await db.sync();

const userFields = ['nickname', 'email', 'registerDate', 'status']

fs.createReadStream(config.csvfilepath)
  .pipe(parse({ delimiter: ";", from_line: 2 }))
  .on("data", async function (row) {
    const obj = userFields.reduce((o, k, i) => ({...o, [k]: row[i]}), {})
    console.log(obj);
    const resp = await User.create(obj);
    console.log(resp);
  })
  .on("end", function () {
    console.log("Парсинг файла окончен");
  })
  .on("error", function (error) {
    console.log(error.message);
  });


//
//await db.close()