This is a Github OAuth App project that uses [Cotter](https://www.cotter.app), [Next.js](https://nextjs.org/), [Github API](https://docs.github.com/en/rest) to get user's repository list.

## Getting Started

1. Follow the tutorial at [Cotter's Blog](https://blog.cotter.app/the-simplest-way-to-authorize-github-oauth-apps-with-nextjs-and-cotter/).
2. Get your Cotter API Keys on [Cotter's Dashboard](https://dev.cotter.app).
3. Export your API Keys:

```bash
export COTTER_API_KEY_ID=<API KEY ID>
export COTTER_API_SECRET_KEY=<API SECRET KEY>
yarn dev
```

4. Replace all `API_KEY_ID` variables with your API KEY ID
5. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.
