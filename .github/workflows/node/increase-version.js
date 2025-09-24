import {readFile, writeFile} from "fs/promises";

function regexReplace(str, regex, replacer) {
    const matchArray = regex.exec(str);
    const [fullMatch, ...groups] = matchArray;

    return str.substring(0, matchArray.index) + replacer(...groups) + str.substring(matchArray.index + fullMatch.length);
}

function increaseVersion(versionString, increaseType) {
    increaseType = increaseType?.toLowerCase();

    const splitVersion = versionString.split(".");
    const index = ["major", "minor", "patch"].indexOf(increaseType);

    if (index === -1) throw new Error(`Unknown increase type "${increaseType}".`);

    splitVersion[index] = parseInt(splitVersion[index]) + 1;

    for (let i = index + 1; i < splitVersion.length; i++) {
        splitVersion[i] = 0;
    }

    return splitVersion.join(".");
}

const filePath = process.argv[2];
const increaseType = process.argv[3];

let csProjTxt = await readFile(filePath, "utf-8");

await writeFile(filePath, regexReplace(csProjTxt, /<Version>(.+?)<\/Version>/, (version) => `<Version>${increaseVersion(version, increaseType)}</Version>`));