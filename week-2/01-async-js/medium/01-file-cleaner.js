const data = "hello         world    my    name   is       raman";

function cleanData(data){
let finalData=""
const words=data.split(" ");
finalData=words.filter(word=>word!="").reduce((accumulator,word)=>{
    accumulator+=" "+word
    return accumulator;
},"")
console.log(finalData)
}
cleanData(data)
