# Risedle Interface

This repository contains the interface of Risedle Protocol.

## Get started

You need to install the following:

    node >= 17.8.0
    npm >= 8.5.5

Then clone the repository:

    git clone git@github.com:risedle/interface.git
    cd interface/

Install the dependencies:

    npm install

Run the development server:

    npm run dev

The app entrypoint is on the [`pages/_app.tsx`](./pages/_app.tsx).

To changes component for each page, you may go to directly to the page
component. For example, if you want to update something on the homepage go to
directly to [`pages/index.tsx`](pages/index.tsx).

Risedle Interface is using [Next.js](https://nextjs.org/) and deployed on
[Cloudflare Pages](https://developers.cloudflare.com/pages/).

## Run the storybook

Use the following command to run the storybook:

    npm run storybook
