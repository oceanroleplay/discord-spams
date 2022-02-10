import { SpamMeta } from "../src/index.js";

async function main() {
  await SpamMeta.instance.init();

  console.log(
    SpamMeta.instance.isSpam(
      "I need cars, goto https://disocrds.gift/NverABbCacD okay buddy"
    )
  );
}

main();
