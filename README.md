<div align="center">
  <h1><code>KLWE</code></h1>
  <p>
    <a href="https://github.com/luxbe/klwe" target="_blank">
      <img alt="Stars" src="https://img.shields.io/github/stars/luxbe/klwe">
    </a>
  </p>

<strong>A tool to develop and edit <a href="https://kustom.rocks">KLWP</a> presets</strong>

<sub>๐งก Built with SvelteKit ๐งก</sub>

</div>

## About

Kustom Live Web Editor (KLWE) is designed to help you develop your klwp presets more easily.

## Setup

```bash
git clone https://github.com/luxbe/klwe
cd klwe
npm i
```

## ๐ป Develop

### ๐ ๏ธ Start a development server

After installing the required dependencies, you can start the development server with the following command:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

### ๐ฌ Test the application

To run unit-tests with [jest](https://jestjs.io/), run the following command:

```bash
npm run test

# or start testing in watch mode for your tests to automatic rerun
npm run test:watch
```

### ๐งฑ Build the application

Before creating a production version of your app, install an [adapter](https://kit.svelte.dev/docs#adapters) for your target environment. Then run:

```bash
npm run build
```

## ๐ License

Copyright ยฉ 2021 [luxbe](https://github.com/luxbe)<br />
This project is [MIT](https://github.com/luxbe/klwe/blob/master/LICENSE) licensed
