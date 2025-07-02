# Webfic Bingo

[![Deploy site](https://github.com/recordcrash/webfic-bingo/actions/workflows/main.yml/badge.svg)](https://github.com/recordcrash/webfic-bingo/actions/workflows/main.yml)

Check out [Webfic Bingo](https://webfic.recordcrash.com).

This is based on [Anime Sedai](https://github.com/egoist/anime-sedai). In this one, you can fill in a list of popular webfic you've read to share instead of anime you've watched.

## Usage

To install dependencies:

```bash
bun install
```

To run:

```bash
bun dev
```

For deployment (if you want analytics) you'll need certain env variables available, you can use .env.production or inject them somehow during your CI/CD. The variables are at .env.example.
