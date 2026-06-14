```javascript
const rankingCSV =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vQr3ZihchC7_623tqInuQIXkb8EFrt_rweBnvk34nyrFhvILVYUJBAuXxOReXiPaqONa45zhlqVo7WV/pub?gid=1385809585&single=true&output=csv";

const typyCSV =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vQr3ZihchC7_623tqInuQIXkb8EFrt_rweBnvk34nyrFhvILVYUJBAuXxOReXiPaqONa45zhlqVo7WV/pub?gid=1834571824&single=true&output=csv";

const aiCSV =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vQr3ZihchC7_623tqInuQIXkb8EFrt_rweBnvk34nyrFhvILVYUJBAuXxOReXiPaqONa45zhlqVo7WV/pub?gid=930565797&single=true&output=csv";

function showTab(tab){
document.querySelectorAll(".tab")
.forEach(t=>t.classList.add("hidden"));

document.getElementById(tab)
.classList.remove("hidden");
}

async function loadCSV(url,target){

const response = await fetch(url);
const text = await response.text();

const rows = text.trim().split("\n");

let html = "<table>";

rows.forEach((row,index)=>{

const cols = row.split(",");

html += "<tr>";

cols.forEach(col=>{

html += index===0
? `<th>${col}</th>`
: `<td>${col}</td>`;

});

html += "</tr>";

});

html += "</table>";

document.getElementById(target).innerHTML = html;
}

loadCSV(rankingCSV,"ranking-content");
loadCSV(typyCSV,"typy-content");
loadCSV(aiCSV,"ai-content");

setInterval(()=>{
loadCSV(rankingCSV,"ranking-content");
loadCSV(typyCSV,"typy-content");
loadCSV(aiCSV,"ai-content");
},60000);
```
