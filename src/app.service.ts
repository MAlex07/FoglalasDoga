import { Injectable } from '@nestjs/common';
import mysql from 'mysql2/promise';
import { Fogalalas } from './fogalalasok.js';
import { FoglalasDTO } from './foglalasokDTO.dto.js';

const mysqlConnection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'reservations13e',
});

@Injectable()
export class AppService {
  async getFoglalasok(): Promise<Fogalalas[]>{
    const[result] = await mysqlConnection.execute(
        "SELECT * FROM reservations"
      );
      return(result as any[]).map((item) => ({
        id: item.id,
        name: item.name,
        email: item.email,
        startDate: item.startDate,
        guests: item.guests
      }))
  }

  async ujFoglalas(body: FoglalasDTO){
    const [result] = await mysqlConnection.execute(
      "INSERT INTO reservations (name, email, startDate, guests) VALUES (?,?,?,?)",
      [body.name, body.email, body.startDate, body.guests]
    );
    return result;
  }
}
