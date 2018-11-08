import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom";

import Application from './components/Application';
import Model from './model/Model';

//// Showdown

const showdown = require('showdown');
const hljs = require('highlightjs');

showdown.extension('highlight', function () {
	return [{
  	type: "output",
  	filter: function (text, converter, options) {
      var left = "<pre><code\\b[^>]*>",
          right = "</code></pre>",
          flags = "g";
      var replacement = function (wholeMatch, match, left, right) {
      	var lang = (left.match(/class=\"([^ \"]+)/) || [])[1];
        left = left.slice(0, 18) + 'hljs ' + left.slice(18);
        if (lang && hljs.getLanguage(lang)) {
        	return left + hljs.highlight(lang, match).value + right;
				} else {
					return left + hljs.highlightAuto(match).value + right;
				}
			};
      return showdown.helper.replaceRecursiveRegExp(text, replacement, left, right, flags);
    }
  }];
});

////

const baseUrl = require('../../package.json').baseUrl;

declare let module: any

import './css/app.css';

let model: Model = new Model();
console.log(`window.location.hostname: `, window.location, window.location.hostname, window.location.host, baseUrl);
// if (window.location.hostname == 'localhost') {
//     process.env.PUBLIC_URL = '';
// } else {
    process.env.PUBLIC_URL = baseUrl;
// }

console.log(`process.env.PUBLIC_URL: `, process.env.PUBLIC_URL);

// basename={process.env.PUBLIC_URL}
model.on('ready', () => {
    ReactDOM.render(
        <HashRouter>
            <Application model={model} />
        </HashRouter>,
        document.getElementById('root')
    );
});

// if (module.hot) {
//     module.hot.accept();
// }
