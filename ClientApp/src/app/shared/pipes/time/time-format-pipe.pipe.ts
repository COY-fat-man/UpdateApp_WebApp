import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipePipe implements PipeTransform {

  transform(value: string | null|undefined):string {
    try {
      if(value ==undefined || value==null){
        return "--/--/-- --:--:--";  
      }
      else{
        return moment(value).format("DD-MM-YYYY HH:mm:ss");
      }
    } catch (error) {
      return "--/--/-- --:--:--";  
    }
    
  }

}
