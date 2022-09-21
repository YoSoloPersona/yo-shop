import reporters from 'jasmine-reporters';

const junitReporter = new reporters.JUnitXmlReporter({
    savePath: './test-results', // путь для сохранения результатов
    consolidateAll: false,
    filePrefix: 'xmloutput'
});
jasmine.getEnv().addReporter(junitReporter)