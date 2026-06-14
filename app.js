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

async function loadRanking(){

    const response = await fetch(rankingCSV);
    const text = await response.text();

    const rows = text
        .trim()
        .split("\n")
        .slice(1)
        .filter(r => r.trim() !== "")
        .map(r => r.split(","));

    let podium = `
    <div class="podium">
        <div class="silver">
            🥈<br>${rows[1][1]}<br>${rows[1][2]} pkt
        </div>

        <div class="gold">
            🥇<br>${rows[0][1]}<br>${rows[0][2]} pkt
        </div>

        <div class="bronze">
            🥉<br>${rows[2][1]}<br>${rows[2][2]} pkt
        </div>
    </div>
    `;

    let table = `
    <table>
    <tr>
        <th>Miejsce</th>
        <th>Gracz</th>
        <th>Punkty</th>
        <th>Koszt</th>
    </tr>
    `;

    rows.forEach(r=>{
        table += `
        <tr>
            <td>${r[0]}</td>
            <td>${r[1]}</td>
            <td>${r[2]}</td>
            <td>${r[3]}</td>
        </tr>
        `;
    });

    table += "</table>";

    document.getElementById("ranking-content")
    .innerHTML = podium + table;
}

async function loadTypy(){

    const response = await fetch(typyCSV);
    const text = await response.text();

    const rows = text
        .trim()
        .split("\n")
        .slice(1)
        .filter(r => r.trim() !== "")
        .map(r => r.split(","));

    let html = '<div class="cards">';

    rows.forEach(r=>{

        html += `
        <div class="card">
            <h3>${r[0]}</h3>

            <p>${r[1]}</p>
            <p>${r[2]}</p>
            <p>${r[3]}</p>
            <p>${r[4]}</p>
            <p>${r[5]}</p>
            <p>${r[6]}</p>
            <p>${r[7]}</p>
            <p>${r[8]}</p>

            <hr>

            <p><b>Koszt:</b> ${r[9]}</p>
            <p><b>Punkty:</b> ${r[10]}</p>
        </div>
        `;
    });

    html += '</div>';

    document.getElementById("typy-content")
    .innerHTML = html;
}

async function loadAI(){

    const response = await fetch(aiCSV);
    const text = await response.text();

    const rows = text.trim().split("\n");

    let html = `
    <div class="ai-box">
    `;

    rows.forEach(row=>{

        html += `
        <div class="ai-row">
            ${row}
        </div>
        `;
    });

    html += "</div>";

    document.getElementById("ai-content")
    .innerHTML = html;
}

loadRanking();
loadTypy();
loadAI();

setInterval(()=>{
    loadRanking();
    loadTypy();
    loadAI();
},60000);
