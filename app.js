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

    const data = rows
        .slice(1)
        .map(cleanRow)
        .filter(r => r.length >= 11)
        .filter(r =>
            r[0] &&
            r[0] !== "Gracz" &&
            !r[0].includes("Zespół")
        );

    let html = '<div class="cards">';

    data.forEach(r => {

        html += `
        <div class="player-card">

            <h3>${r[0]}</h3>

            <div class="team-list">
                <div class="team">${r[1] || ""}</div>
                <div class="team">${r[2] || ""}</div>
                <div class="team">${r[3] || ""}</div>
                <div class="team">${r[4] || ""}</div>
                <div class="team">${r[5] || ""}</div>
                <div class="team">${r[6] || ""}</div>
                <div class="team">${r[7] || ""}</div>
                <div class="team">${r[8] || ""}</div>
            </div>

            <div style="margin-top:15px">
                <p><b>Koszt:</b> ${r[9] || ""}</p>
                <p><b>Punkty:</b> ${r[10] || ""}</p>
            </div>

        </div>
        `;
    });

    html += "</div>";

    document.getElementById("typy-content").innerHTML = html;
}

async function loadAI(){

    const response = await fetch(aiCSV);
    const text = await response.text();

    const lines = text.split("\n");

    const models = [
        "Chat GPT",
        "Copilot",
        "Gemini",
        "Use AI",
        "Claude Opus",
        "Preplexity"
    ];

    let html = `
    <div class="ai-grid">
    `;

    models.forEach(model => {

        html += `
        <div class="ai-card">
            <h3>🤖 ${model}</h3>
            <ul>
        `;

        lines.forEach(line => {

            if(
                line.includes("%") &&
                !line.includes("Średnia") &&
                !line.includes("Podsumowanie")
            ){

                const parts = line.split(",");

                for(let i=0;i<parts.length;i++){

                    const value = parts[i].trim();

                    if(
                        value &&
                        value.includes("%") &&
                        i > 0
                    ){

                        const player = parts[i-1]?.trim();

                        if(
                            player &&
                            player.length > 2 &&
                            !player.includes("%")
                        ){
                            html += `
                            <li>
                                ${player} - ${value}
                            </li>
                            `;
                        }
                    }
                }
            }

        });

        html += `
            </ul>
        </div>
        `;
    });

    html += `
    </div>

    <div class="ai-summary">
        <h3>📊 Podsumowanie AI</h3>
        <p>
        Średnie szanse wszystkich modeli AI
        </p>
    </div>
    `;

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
