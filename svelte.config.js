import preprocess from 'svelte-preprocess';
import wasmPackPlugin from 'vite-plugin-wasm-pack';

const wasmPack = wasmPackPlugin.default;

const scssAliases = (aliases) => {
    return (url) => {
        for (const [alias, aliasPath] of Object.entries(aliases)) {
            if (url.indexOf(alias) === 0) {
                return {
                    file: url.replace(alias, aliasPath),
                };
            }
        }
        return url;
    };
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: [
        preprocess({
            scss: {
                prependData: "@use '@/styles/abstracts' as *;",
                importer: [
                    scssAliases({
                        '@/': process.cwd() + '/src/',
                    }),
                ],
            },
        }),
    ],
    kit: {
        target: '#app',
        vite: {
            resolve: {
                alias: {
                    '@/': process.cwd() + '/src/',
                },
            },
            plugins: [wasmPack([], 'kustom')],
        },
    },
};

export default config;
