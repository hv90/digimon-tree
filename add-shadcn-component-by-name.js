const { exec } = require('child_process');

const componentName = process.argv[2];

const command = `npx shadcn@latest add ${componentName}`;

exec(command, (err, stdout, stderr) => {
  if (err) {
    console.error(`Error when adding component: ${err.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});
