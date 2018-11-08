---
id: intro
title: Introduction
sidebar_label: Introduction
---

## react-typescript-static-site-example

This project demonstrates how React and TypeScript can be used to generate a static site that serves a single page app and which can easily be deployed to github pages. You can see a live demo of this site at...

[Demo: react-typescript-static-site-example](https://wwlib.org/react-typescript-static-site-example)

### main components

The main components of this example include:
- a simple React app that uses `react-router` to route requests for pages that use custom components
- an example *Page* component that demonstrates how a page can be generated using data that is passed via the component's props
- an example *Markdown* component that uses showdown to render markdown as HTML
- an example *Blog* component that generates links to posts found in the static/posts directory (markdown files)
- an example *CanvasPage* component
- an example *Chart* component
- an *PixiExample* component
- an HTML5 floating dialog example
- a simple-server.js for hosting the generated site locally

### docusaurus docs

In addition to the main single page app that is generated, this example demonstrates how to include [docusaurus](https://docusaurus.io)-generated documentation.

### hugo blog

This example also demonstrates how to include a [hugo](https://gohugo.io)-generated blog.
