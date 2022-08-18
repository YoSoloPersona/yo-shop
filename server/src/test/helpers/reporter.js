import reporters from 'jasmine-reporters';

const junitReporter = new reporters.JUnitXmlReporter({
    savePath: __dirname,
    consolidateAll: false
});
jasmine.getEnv().addReporter(junitReporter)