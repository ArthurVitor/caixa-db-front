export default class DateUtils {
    public static getFormattedDateFromString(string?: string): Date {
        if (!string) {
          return new Date();
        }
        
        let spaceSplit = string.split(" ");
    
        let [day, month, year] = spaceSplit[0].split("/");
        let [hour, minute, second] = spaceSplit[1].split(":");
    
        return new Date(Number(year), Number(month), Number(day), Number(hour), Number(minute), Number(second));
    }
    
    public static getFormattedDate(date?: Date): string {
        if (!date)
            return "00/00/0000";

        return (date.getDay() < 10 ? "0" + date.getDay() : date.getDay()) + "/" + date.getMonth() + "/" + date.getFullYear();
    }

    public static getFormattedTime(date?: Date): string {
        if (!date)
            return "00:00:00";

        return (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":" + date.getMinutes() + ":" + date.getSeconds();
    }
}