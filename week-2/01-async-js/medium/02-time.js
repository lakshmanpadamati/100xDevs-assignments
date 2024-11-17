const date=new Date()
function PrintTime(){
    console.log(date.toTimeString().split(" ")[0])
    console.log(date.toLocaleTimeString())
}
setInterval(PrintTime, 1000);
