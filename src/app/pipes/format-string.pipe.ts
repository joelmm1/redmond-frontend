import { Pipe, PipeTransform } from '@angular/core';
import { FuncsService } from '../services/funcs.service';



@Pipe({
  name: 'formatString'
})
export class FormatStringPipe implements PipeTransform {

  constructor( private funcs: FuncsService ) {}
  
  transform(value: string, type: 'handle' | 'camel' | 'fromCamel' | 'fromHandle' | 'fromPathHandle' | 'capitalize'): string {
    switch (type) {
      case 'handle': return this.funcs.handleize(value);
      case 'camel': return this.funcs.camelcase(value);
      case 'fromCamel': return (() => this.funcs.fromCamelCase(value))();
      case 'fromHandle': return value.split('-').join(' ');
      case 'fromPathHandle': return value.split('_').join(' ');
      case 'capitalize': return this.funcs.capitalize(value);
      default: throw new Error(`Invalid safe type specified: ${type}`);
    }
  }

}
