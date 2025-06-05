/* eslint-disable @typescript-eslint/no-explicit-any */
class BaseDto {
    id = 0;
    constructor(data: any) {
      this.id = this.parseNumber(data?.id);
    }
  
    //this function use for if(json.something && parseInt(json.something) > 0) this kind of logic
    parseNumber(value: any, defaultValue: null | number = 0): any {
      const parsedValue = Number(value);
      return !Number.isNaN(parsedValue) && parsedValue > 0
        ? parsedValue
        : defaultValue;
    }
  }
  
  export { BaseDto };
  