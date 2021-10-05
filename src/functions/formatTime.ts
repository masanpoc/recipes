export function formatTime(time:number):string {
    let formatted = time;
    if(time<3){
        formatted=time*60;
    }
   
    return String(formatted)
}