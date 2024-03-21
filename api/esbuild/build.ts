import { build, analyzeMetafile, BuildOptions } from 'esbuild';

(async () => {
    const result = await build({
        entryPoints: [{ in: './src/index.ts', out: 'yo-shop-api.min' }],
        bundle: true,
        minify: true,
        sourcemap: true,
        platform: 'browser',
        outdir: './dist/browser',
        metafile: true
    });
    console.log(result);

    const meta = await analyzeMetafile(result.metafile, { verbose: true });
    console.log(meta);
})();
