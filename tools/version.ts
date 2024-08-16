import { execa } from "execa";

const version = process.argv[2];

async function main() {
  if (!version) {
    throw new Error("Missing version number");
  }
  //   step one
  const stepOne = execa("npm", ["run", "sync", version], {
    stdio: "pipe",
  });
  stepOne.stdout.on("data", (data) => {
    console.log(`sync: ${data}`);
  });
  // 监听标准错误流并实时打印
  stepOne.stderr.on("data", (data) => {
    console.error(`syncerr: ${data}`);
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
