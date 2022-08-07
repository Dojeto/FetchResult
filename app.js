const request = require("request");
const ejs = require('ejs');
const path = require('path');
const cheerio = require("cheerio");
const express = require("express");
const app = express();

const static_path = path.join(__dirname,'views');
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('views',static_path);
app.set('view engine', 'ejs');


let seatno = 2208081;

let arr2 = []

while(seatno!=2208231)
{
    arr2.push(seatno)
    seatno++;
}

let arr3 = new Array();

arr2.forEach((value,index)=>{
    let arr = new Array();
     const url =
     `https://ums.cvmu.ac.in/GenerateResultHTML/858/${value}.html`; 
     request(url,(err,response,html)=>{
        //  console.log(response.statusCode);
         const $ = cheerio.load(html);
         
         $('tbody').find('tr').each((index,elemet)=>{
             arr.push($(elemet).html());
         })
        //  console.dir(arr[4].slice(67,arr[4].length-5));
        //  console.dir(arr[18].slice(73,arr[18].length-12));

        let str = arr[4].slice(67,arr[4].length-5);
        let num = (arr[18].slice(73,arr[18].length-12)).toString();

         arr3.push([num,str]);
         arr3.sort();
         arr3.reverse();
        })
    })

    app.get("/",(req,resp)=>{
       resp.render('Home',{
          people : arr3
       });
   })

app.listen(port, () => {
        console.log(`Listening On ${port}`);
});
    

    