const fs = require("fs");
const path = require("path");



const root = {
    move: null,
    children: {},
};

const databaseFolder = path.join(
    __dirname,
    "..",
    "data",
    "database"
);

const files = fs
    .readdirSync(databaseFolder)
    .filter(file => file.endsWith(".tsv"));

const lines = [];

for (const fileName of files) {

    console.log("Reading", fileName);

    const filePath = path.join(databaseFolder, fileName);

    const fileContents = fs.readFileSync(filePath, "utf8");

    const fileLines = fileContents.split(/\r?\n/);

    // Skip the header row from every file
    lines.push(...fileLines.slice(1));

}

// Create an array that will hold every opening
const openings = [];

for (let i = 1; i < lines.length; i++) {

    if (!lines[i].trim()) continue;

    const [eco, name, pgn] = lines[i].split("\t");

    const moves = pgn
        .replace(/\d+\./g, "")
        .trim()
        .split(/\s+/);

    openings.push({
        eco,
        name,
        moves,
    });
}

// Build the opening tree
for (const opening of openings) {

    let current = root;

    for (const move of opening.moves) {

        if (!current.children[move]) {

    current.children[move] = {
        move,
        children: {},
    };

}

current = current.children[move];

    }

    current.openingName = opening.name;
    current.eco = opening.eco;

}

// Test the tree
console.log("Total openings:", openings.length);

console.log();

console.log("First moves:");

console.log(Object.keys(root.children));

const outputPath = path.join(
    __dirname,
    "..",
    "data",
    "books",
    "master.json"
);

fs.writeFileSync(
    outputPath,
    JSON.stringify(root, null, 2)
);

console.log("Opening book saved!");



console.log("Opening book saved successfully!");