const vragen = [
    // Optellen
    { vraag: "2 + 3 =", antwoorden: ["4", "5", "6", "7"], correct: 1 },
    { vraag: "4 + 5 =", antwoorden: ["8", "9", "10", "11"], correct: 2 },
    { vraag: "6 + 2 =", antwoorden: ["7", "8", "9", "10"], correct: 3 },
    { vraag: "3 + 7 =", antwoorden: ["9", "10", "11", "12"], correct: 0 },
    { vraag: "5 + 4 =", antwoorden: ["8", "9", "10", "11"], correct: 1 },
    // Aftrekken
    { vraag: "10 - 3 =", antwoorden: ["4", "5", "6", "7"], correct: 2 },
    { vraag: "8 - 2 =", antwoorden: ["4", "5", "6", "7"], correct: 1 },
    { vraag: "9 - 5 =", antwoorden: ["3", "4", "5", "6"], correct: 0 },
    { vraag: "12 - 6 =", antwoorden: ["4", "5", "6", "7"], correct: 2 },
    { vraag: "15 - 9 =", antwoorden: ["4", "5", "6", "7"], correct: 3 },
    // Vermenigvuldigen
    { vraag: "3 x 4 =", antwoorden: ["9", "12", "15", "18"], correct: 1 },
    { vraag: "5 x 2 =", antwoorden: ["8", "10", "12", "15"], correct: 0 },
    { vraag: "7 x 3 =", antwoorden: ["18", "21", "24", "27"], correct: 1 },
    { vraag: "4 x 6 =", antwoorden: ["20", "24", "28", "32"], correct: 1 },
    { vraag: "8 x 5 =", antwoorden: ["35", "40", "45", "50"], correct: 1 },
    // Delen
    { vraag: "10 ÷ 2 =", antwoorden: ["4", "5", "6", "7"], correct: 2 },
    { vraag: "18 ÷ 3 =", antwoorden: ["4", "5", "6", "7"], correct: 1 },
    { vraag: "12 ÷ 4 =", antwoorden: ["2", "3", "4", "5"], correct: 2 },
    { vraag: "20 ÷ 5 =", antwoorden: ["3", "4", "5", "6"], correct: 1 },
    { vraag: "24 ÷ 6 =", antwoorden: ["3", "4", "5", "6"], correct: 0 },
    // Meer optellen
    { vraag: "6 + 3 =", antwoorden: ["8", "9", "10", "11"], correct: 1 },
    { vraag: "7 + 4 =", antwoorden: ["10", "11", "12", "13"], correct: 2 },
    { vraag: "9 + 2 =", antwoorden: ["10", "11", "12", "13"], correct: 0 },
    { vraag: "8 + 5 =", antwoorden: ["13", "14", "15", "16"], correct: 1 },
    { vraag: "5 + 6 =", antwoorden: ["11", "12", "13", "14"], correct: 2 },
    // Meer aftrekken
    { vraag: "15 - 7 =", antwoorden: ["5", "6", "7", "8"], correct: 3 },
    { vraag: "18 - 9 =", antwoorden: ["7", "8", "9", "10"], correct: 0 },
    { vraag: "20 - 12 =", antwoorden: ["6", "7", "8", "9"], correct: 1 },
    { vraag: "25 - 15 =", antwoorden: ["8", "9", "10", "11"], correct: 2 },
    { vraag: "30 - 18 =", antwoorden: ["10", "11", "12", "13"], correct: 0 },
    // Meer vermenigvuldigen
    { vraag: "6 x 4 =", antwoorden: ["20", "22", "24", "26"], correct: 2 },
    { vraag: "7 x 5 =", antwoorden: ["30", "35", "40", "45"], correct: 1 },
    { vraag: "8 x 6 =", antwoorden: ["40", "45", "48", "50"], correct: 2 },
    { vraag: "9 x 7 =", antwoorden: ["58", "60", "63", "70"], correct: 2 },
    { vraag: "10 x 8 =", antwoorden: ["75", "80", "85", "90"], correct: 1 },
    // Meer delen
    { vraag: "24 ÷ 4 =", antwoorden: ["4", "5", "6", "7"], correct: 0 },
    { vraag: "35 ÷ 5 =", antwoorden: ["6", "7", "8", "9"], correct: 1 },
    { vraag: "42 ÷ 6 =", antwoorden: ["6", "7", "8", "9"], correct: 2 },
    { vraag: "49 ÷ 7 =", antwoorden: ["6", "7", "8", "9"], correct: 3 },
    { vraag: "56 ÷ 8 =", antwoorden: ["6", "7", "8", "9"], correct: 0 },
    // Nog meer optellen
    { vraag: "11 + 8 =", antwoorden: ["18", "19", "20", "21"], correct: 0 },
    { vraag: "14 + 9 =", antwoorden: ["21", "22", "23", "24"], correct: 0 },
    { vraag: "17 + 7 =", antwoorden: ["23", "24", "25", "26"], correct: 1 },
    { vraag: "20 + 6 =", antwoorden: ["25", "26", "27", "28"], correct: 2 },
    { vraag: "23 + 5 =", antwoorden: ["27", "28", "29", "30"], correct: 3 },
    // Nog meer aftrekken
    { vraag: "30 - 11 =", antwoorden: ["18", "19", "20", "21"], correct: 1 },
    { vraag: "35 - 15 =", antwoorden: ["18", "19", "20", "21"], correct: 2 },
    { vraag: "40 - 18 =", antwoorden: ["18", "19", "20", "21"], correct: 3 },
    { vraag: "45 - 21 =", antwoorden: ["18", "19", "20", "21"], correct: 0 },
    { vraag: "50 - 25 =", antwoorden: ["18", "19", "20", "21"], correct: 1 },
    // Nog meer vermenigvuldigen
    { vraag: "11 x 9 =", antwoorden: ["90", "99", "100", "110"], correct: 1 },
    { vraag: "13 x 7 =", antwoorden: ["85", "91", "95", "104"], correct: 2 },
    { vraag: "16 x 8 =", antwoorden: ["118", "120", "128", "136"], correct: 1 },
    { vraag: "19 x 6 =", antwoorden: ["110", "114", "117", "120"], correct: 3 },
    { vraag: "22 x 5 =", antwoorden: ["108", "110", "115", "120"], correct: 1 },
    // Nog meer delen
    { vraag: "56 ÷ 7 =", antwoorden: ["6", "7", "8", "9"], correct: 1 },
    { vraag: "63 ÷ 9 =", antwoorden: ["6", "7", "8", "9"], correct: 0 },
    { vraag: "72 ÷ 8 =", antwoorden: ["6", "7", "8", "9"], correct: 2 },
    { vraag: "81 ÷ 9 =", antwoorden: ["6", "7", "8", "9"], correct: 3 },
    { vraag: "90 ÷ 10 =", antwoorden: ["6", "7", "8", "9"], correct: 0 },
];
