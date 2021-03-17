const glob = require('glob')
const fs = require('fs')
const Bundler = require('parcel-bundler');
const Path = require('path')

const helperFile = (file) => Path.join(__dirname, file)

const testGlob = process.argv[2]

const testFiles = glob.sync(testGlob, {
  absolute: true
});

const entryFileContents = testFiles
  .map(file => `require('${Path.relative(__dirname, file)}')`)
  .concat(["require('./setup.ts')"])
  .join("\n")

fs.writeFileSync(helperFile('./testBundle.ts'), entryFileContents)

const bundlerOptions = {
  outDir: helperFile("testDist"),
  outFile: 'index.html'
}

new Bundler(helperFile("index.html"), bundlerOptions)
  .serve(2222)