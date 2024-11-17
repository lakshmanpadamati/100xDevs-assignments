// counter using setTimeout

let count=0;
function PrintCount(){
    console.log(count);
    count++;
    setTimeout(PrintCount,1000);
}
PrintCount();