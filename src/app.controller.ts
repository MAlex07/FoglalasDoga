import { Controller, Get, Post, Render, Body } from '@nestjs/common';
import { AppService } from './app.service.js';
import { FoglalasDTO } from './foglalasokDTO.dto.js';
import { error } from 'console';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async getFogalasok() {
    return {
      foglasok: await this.appService.getFoglalasok(),
    };
  }

  @Post()
  @Render('index')
  async ujFoglalas(@Body() body: FoglalasDTO) {
    const name = String(body.name ?? '').trim();
    const email = String(body.email ?? '').trim();
    const startDateszoveg = String(body.startDate ?? '').trim();
    const startDate = new Date(startDateszoveg);
    const guestsszoveg = String(body.guests ?? '').trim();
    const guests = Number(guestsszoveg);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      return {
        foglasok: await this.appService.getFoglalasok(),
        error: 'Nem megfelően adta meg az emailcímet!'
      };
    }

    if(name == ""){
      return{
        foglasok: await this.appService.getFoglalasok(),
        error: 'A név mező nem lehet üres'
      }
      
    };

    if(guests < 1 || guests > 10){
      return{
        foglasok: await this.appService.getFoglalasok(),
        error: 'A vendégek száma minimum 1 és maximum 10'
      }
    }

    await this.appService.ujFoglalas({
      name,
      email,
      startDate : startDateszoveg,
      guests
    });

    return{
      foglasok: await this.appService.getFoglalasok(),
      success: 'A foglalás sikeres volt'
    };
    
  }
}
