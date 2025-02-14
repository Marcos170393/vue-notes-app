export default class DateInfo {

  /**
   * 
   * @returns Date(Y-M-D H-M-S)
   */
   getCurrentTime(){
    return new Date().toISOString().slice(0, 19).replace('T', ' ');
  }
  
  /**
   * 
   * @returns Date(YYYY)
   */
   getDate() {
    const date = this.getCurrentTime().split(' ')[0];
    return date;
  }
}