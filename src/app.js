import express from "express";
import { User } from "./models/user.js";
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();

// устанавливаем ejs как язык шаблонов
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

// рендерим таблицу
app.get('/', async function(req, res) {

  // По заданию: со статусом On и в порядке времени регистрации.
  const users = await User.findAll({where: { status: 'On' },
  order: [
      ['registerDate', 'DESC'],
  ],
  });
  
  res.render('index', {users: users});
});

app.listen(8080);
console.log('Server is listening on port 8080');
