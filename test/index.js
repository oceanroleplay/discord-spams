import { SpamMeta } from "../src/index.js";
async function main() {
    await SpamMeta.refreshMasterList();
    if (SpamMeta.isSpam("if you need cars, goto https://disocrds.gift/NverABbCacD, get a free car now")) {
        console.log("given message contain spam link");
    }
}
main();
//# sourceMappingURL=index.js.map