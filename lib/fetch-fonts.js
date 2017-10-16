const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const mkdirp = promisify(require("mkdirp"));
const fetch = require("node-fetch");

const fontCdn = "https://www.thetimes.co.uk/fonts";
const fontDir = `${__dirname}/../dist/public/fonts`;

const fonts = [
  {
    family: "TimesModern-Bold",
    sources: [
      // `${fontCdn}/TimesModern-Bold.woff2`,
      `${fontCdn}/TimesModern-Bold.woff`,
      `${fontCdn}/TimesModern-Bold.ttf`
    ]
  },
  {
    family: "TimesModern-Regular",
    sources: [
      // `${fontCdn}/TimesModern-Regular.woff2`,
      `${fontCdn}/TimesModern-Regular.woff`,
      `${fontCdn}/TimesModern-Regular.ttf`
    ]
  },
  {
    family: "TimesDigital-Regular",
    sources: [
      // `${fontCdn}/TimesDigital-Regular.woff2`,
      `${fontCdn}/TimesDigital-Regular.woff`,
      `${fontCdn}/TimesDigital-Regular.ttf`
    ]
  },
  {
    family: "TimesDigital-Italic",
    sources: [
      // `${fontCdn}/TimesDigital-Italic.woff2`,
      `${fontCdn}/TimesDigital-Italic.woff`,
      `${fontCdn}/TimesDigital-Italic.ttf`
    ]
  },
  {
    family: "TimesDigital-Bold",
    sources: [
      // `${fontCdn}/TimesDigital-Bold.woff2`,
      `${fontCdn}/TimesDigital-Bold.woff`,
      `${fontCdn}/TimesDigital-Bold.ttf`
    ]
  },
  {
    family: "TimesDigital-RegularSC",
    sources: [
      // `${fontCdn}/TimesDigital-RegularSC.woff2`,
      `${fontCdn}/TimesDigital-RegularSC.woff`,
      `${fontCdn}/TimesDigital-RegularSC.ttf`
    ]
  },
  {
    family: "GillSansW01-Medium",
    sources: [
      // `${fontCdn}/GillSansW01-Medium.woff2`,
      `${fontCdn}/GillSansW01-Medium.woff`
      // `${fontCdn}/GillSansW01-Medium.ttf`
    ]
  }
];

const download = (source, dest) =>
  fetch(source).then(
    res =>
      new Promise((resolve, reject) => {
        const stream = fs.createWriteStream(dest);

        stream.on("finish", resolve);
        stream.on("error", reject);

        res.body.pipe(stream);
      })
  );

mkdirp(fontDir).then(() =>
  Promise.all(
    ...fonts.map(({ family, sources }) =>
      sources.map(source => {
        const extension = path.extname(source);
        const dest = `${fontDir}/${family}${extension}`;

        if (!fs.existsSync(dest)) {
          return download(source, dest);
        }
        return Promise.resolve();
      })
    )
  )
);
