const rankingCSV =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vQr3ZihchC7_623tqInuQIXkb8EFrt_rweBnvk34nyrFhvILVYUJBAuXxOReXiPaqONa45zhlqVo7WV/pub?gid=1385809585&single=true&output=csv";

const typyCSV =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vQr3ZihchC7_623tqInuQIXkb8EFrt_rweBnvk34nyrFhvILVYUJBAuXxOReXiPaqONa45zhlqVo7WV/pub?gid=1834571824&single=true&output=csv";

const aiCSV =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vQr3ZihchC7_623tqInuQIXkb8EFrt_rweBnvk34nyrFhvILVYUJBAuXxOReXiPaqONa45zhlqVo7WV/pub?gid=930565797&single=true&output=csv";

function showTab(tab){
    document.querySelectorAll(".tab")
        .forEach(t => t.classList.add("hidden"));

    document.getElementById(tab)
        .classList.remove("hidden");
}

async function getCSV(url){

    const response = await fetch(url);
    const text = await response.text();

    return text
        .split("\n")
        .map(r => r.trim())
        .filter(r => r.length > 0)
        .map(r => r.split(","));
}

function cleanRow(row){
    return row.filter(cell => cell.trim() !== "");
}

async function loadRanking(){

    const rows = await getCSV(rankingCSV);

    const headerIndex = rows.findIndex(r =>
        r.includes("Miejsce") &&
        r.includes("Gracz")
    );

    if(headerIndex === -1) return;

    const data = rows
        .slice(headerIndex + 1)
        .map(cleanRow)
        .filter(r => r.length >= 4);

    let podium = "";

    if(data.length >= 3){

        podium = `
        <div class="podium">

            <div class="podium-card silver">
                <h3>🥈 ${data[1][1]}</h3>
                <p>${data[1][2]} pkt</p>
            </div>

            <div class="podium-card gold">
                <h3>🥇 ${data[0][1]}</h3>
                <p>${data[0][2]} pkt</p>
            </div>

            <div class="podium-card bronze">
                <h3>🥉 ${data[2][1]}</h3>
                <p>${data[2][2]} pkt</p>
            </div>

        </div>
        `;
    }

    let table = `
    <table>
    <thead>
    <tr>
        <th>Miejsce</th>
        <th>Gracz</th>
        <th>Punkty</th>
        <th>Koszt</th>
    </tr>
    </thead>
    <tbody>
    `;

    data.forEach(r => {

        table += `
        <tr>
            <td>${r[0]}</td>
            <td>${r[1]}</td>
            <td>${r[2]}</td>
            <td>${r[3]}</td>
        </tr>
        `;
    });

    table += "</tbody></table>";

    document.getElementById("ranking-content").innerHTML =
        podium + table;
}

async function loadTypy(){

    const rows = await getCSV(typyCSV);

    let html = `
    <p style="text-align:center">
    Sprawdzanie danych Typy...
    </p>
    `;

    document.getElementById("typy-content").innerHTML = html;
}

async function loadAI(){

    const rows = await getCSV(aiCSV);

    let html = `
    <p style="text-align:center">
    Sprawdzanie danych AI...
    </p>
    `;

    document.getElementById("ai-content").innerHTML = html;
}

loadRanking();
loadTypy();
loadAI();

setInterval(() => {
    loadRanking();
},60000);
