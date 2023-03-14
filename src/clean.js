import db from './db.js'
import { User } from "./models/user.js"

await db.authenticate()
  .catch(error => console.error(error))
// выведет Executing (default): SELECT 1+1 AS result при успешном подключении

await User.drop();
