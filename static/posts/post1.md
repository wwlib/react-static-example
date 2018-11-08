---
title: Post 1  
description: This is the first post  
category:
date: '2018-10-30 09:20:00'
---
### My First post

<img src="./assets/react.png" width="100px">
<img src="./assets/typescript.png" width="100px">
<img src="./assets/bootstrap.png" width="100px">

#### For today...
- topic 1 (react)
- topic 2 (typescript)
- topic 3 (bootstrap)


> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can *put* **Markdown** into a blockquote.

Demo: [http://wwlib.org/react-typescript-static-site-example/](http://wwlib.org/react-typescript-static-site-example/)

See related post: [post2.md](./post2.md)

See related post: [dev-post2.md](./development/dev-post2.md)

#### Code

```js
var str = 'For more information, see Chapter 3.4.5.1';
var re = /see (chapter \d+(\.\d)*)/i;
var found = str.match(re);

console.log(found);

// logs [ 'see Chapter 3.4.5.1',
//        'Chapter 3.4.5.1',
//        '.1',
//        index: 22,
//        input: 'For more information, see Chapter 3.4.5.1' ]

// 'see Chapter 3.4.5.1' is the whole match.
// 'Chapter 3.4.5.1' was captured by '(chapter \d+(\.\d)*)'.
// '.1' was the last value captured by '(\.\d)'.
// The 'index' property (22) is the zero-based index of the whole match.
// The 'input' property is the original string that was parsed.

```
