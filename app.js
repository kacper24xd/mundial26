const rankingCSV =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vQr3ZihchC7_623tqInuQIXkb8EFrt_rweBnvk34nyrFhvILVYUJBAuXxOReXiPaqONa45zhlqVo7WV/pub?gid=1385809585&single=true&output=csv";

const typyCSV =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vQr3ZihchC7_623tqInuQIXkb8EFrt_rweBnvk34nyrFhvILVYUJBAuXxOReXiPaqONa45zhlqVo7WV/pub?gid=1834571824&single=true&output=csv";

const aiCSV =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vQr3ZihchC7_623tqInuQIXkb8EFrt_rweBnvk34nyrFhvILVYUJBAuXxOReXiPaqONa45zhlqVo7WV/pub?gid=930565797&single=true&output=csv";

function showTab(tab) {
    document.querySelectorAll(".tab").forEach(t => {
        t.classList.add("hidden");
    });

    document.getElementById(tab).classList.remove("hidden");
}

async function getCSV(url) {
    const response = await fetch(url);
    const text = await response.text();

    return text
        .split("\n")
        .map(r => r.trim())
        .filter(r => r.length > 0)
        .map(r => r.split(","));
}

async function loadRanking() {

    const rows = await getCSV(rankingCSV);

    const data = rows.slice(1);

    let podium = "";

    if (data.length >= 3) {
        podium = `
        <div class="podium">

            <div class="podium-card silver">
                <div class="place">🥈 2 miejsce</div>
                <h3>${data[1][1]}</h3>
                <p>${data[1][2]} pkt</p>
            </div>

            <div class="podium-card gold">
                <div class="place">🥇 Lider</div>
                <h3>${data[0][1]}</h3>
                <p>${data[0][2]} pkt</p>
            </div>

            <div class="podium-card bronze">
                <div class="place">🥉 3 miejsce</div>
                <h3>${data[2][1]}</h3>
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

    data.forEach(row => {

        if (!row[1]) return;

        table += `
        <tr>
            <td>${row[0] || ""}</td>
            <td>${row[1] || ""}</td>
            <td>${row[2] || ""}</td>
            <td>${row[3] || ""}</td>
        </tr>
        `;
    });

    table += `
        </tbody>
    </table>
    `;

    document.getElementById("ranking-content").innerHTML =
        podium + table;
}

async function loadTypy() {

    const rows = await getCSV(typyCSV);

    const data = rows.slice(1);

    let html = `<div class="cards">`;

    data.forEach(row => {

        if (!row[0]) return;

        html += `
        <div class="player-card">

            <h3>${row[0]}</h3>

            <div class="team-list">
                <div class="team">${row[1] || ""}</div>
                <div class="team">${row[2] || ""}</div>
                <div class="team">${row[3] || ""}</div>
                <div class="team">${row[4] || ""}</div>
                <div class="team">${row[5] || ""}</div>
                <div class="team">${row[6] || ""}</div>
                <div class="team">${row[7] || ""}</div>
                <div class="team">${row[8] || ""}</div>
            </div>

            <br>

            <p><b>Koszt:</b> ${row[9] || ""}</p>
            <p><b>Punkty:</b> ${row[10] || ""}</p>

        </div>
        `;
    });

    html += "</div>";

    document.getElementById("typy-content").innerHTML = html;
}

async function loadAI() {

    const rows = await getCSV(aiCSV);

    let html = `<table>`;

    rows.forEach((row, index) => {

        html += "<tr>";

        row.forEach(col => {

            if (index === 0) {
                html += `<th>${col}</th>`;
            } else {
                html += `<td>${col}</td>`;
            }

        });

        html += "</tr>";
    });

    html += "</table>";

    document.getElementById("ai-content").innerHTML = html;
}

loadRanking();
loadTypy();
loadAI();

setInterval(() => {
    loadRanking();
    loadTypy();
    loadAI();
}, 60000);
