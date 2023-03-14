// Db
import { DataTypes } from 'sequelize'
import db from '../db.js'
import { config } from '../../app.config.js'

const MS_TO_MINUTES = 60000;

export const User = db.define("User",
  {
    nickname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },

    registerDate: {
      type: DataTypes.INTEGER,
      allowNull: false,

      /**
       * По условию задачи, дата должна храниться в формате INTEGER,
       * Однако её будем вводить-выводить строкой с '.', ':' и ''. Поэтому прописал дополнительные
       * Геттеры и сеттеры
       * 
       * P.S. очень странно, что нам нужно хранить даты в integer
       */
      get() {
        // Выводим дату
          return new Date(this.getDataValue('registerDate') * MS_TO_MINUTES);
      },
      set(value) {
        const parts = value.split(' ');
        const time = parts[parts.length - 1].split(':').map(str => Number(str));
        const date = parts[parts.length - 2].split('.').reverse().map(str => Number(str));

        // По хорошему можно было вот этот datetime хранить
        const datetime = new Date(date[0], date[1] - 1, date[2], time[0], time[1]);

        // А так делаем танцы с бубном - чтобы влезло в int, надо убрать милисекунды
        // из расчёта, что в одной минуте 60000 миллисекунд
        this.setDataValue('registerDate', datetime.getTime() / MS_TO_MINUTES);
      }
    },

    status: {
      type: DataTypes.STRING
    },
  },

  {
    freezeTableName: true,
    timestamps: false
  }
)
