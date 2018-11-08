console.log(`pre-build:`);

const fs = require('fs');
const path = require('path');
const fm = require('front-matter');

/**
 * Explores recursively a directory and returns all the filepaths and folderpaths in the callback.
 * https://ourcodeworld.com/articles/read/420/how-to-read-recursively-a-directory-in-node-js
 * @see http://stackoverflow.com/a/5827895/4241030
 * @param {String} dir
 * @param {Function} done
 */
function filewalker(dir, extensionFilter, done) {
    let results = [];

    fs.readdir(dir, function(err, list) {
        if (err) return done(err);

        var pending = list.length;

        if (!pending) return done(null, results);

        list.forEach(function(file){
            file = path.resolve(dir, file);

            fs.stat(file, function(err, stat){
                // If directory, execute a recursive call
                if (stat && stat.isDirectory()) {
                    // Add directory to array [comment if you need to remove the directories from the array]
                    // results.push(file);

                    filewalker(file, extensionFilter, function(err, res){
                        results = results.concat(res);
                        if (!--pending) done(null, results);
                    });
                } else {
                    if (extensionFilter) {
                        if (file.split('.').pop() === extensionFilter) {
                            results.push(file);
                        }
                    } else {
                        results.push(file);
                    }

                    if (!--pending) done(null, results);
                }
            });
        });
    });
};

function processMarkdownFile(file, root) {
    console.log(`processing: ${file}`);
    let data = fs.readFileSync(file, 'utf8');
    var content = fm(data);
    console.log(`content: `, content.attributes);

    let url = file.split(root)[1];
    let urlParts = url.split('/');
    let categoryFolder = urlParts.length == 2 ? urlParts[0] : '';
    let category = content.attributes.category || categoryFolder || '';
    console.log(`category: `, category);
    if (!categories[category]) {
        categories[category] = {
          category: category,
          posts: []
        }
    }

    let post = {
        title: content.attributes.title || '',
        description: content.attributes.description || '',
        url: url || '',
        category: category,
        date: content.attributes.date || '',
        markdown: content.body
    }
    categories[category].posts.push(post);
}

function compareDates(post1, post2) {
  if (post1.date < post2.date) {
    return -1;
  }
  if (post1.date > post2.date) {
    return 1;
  }
  return 0;
}

let posts = [];
let categories = {};

filewalker('static/posts/', 'md', (err, data) => {
    if(err){
        throw err;
    }
    console.log(data);
    data.forEach(file => {
        processMarkdownFile(file, 'static/posts/');
    });
    console.log(`categories: `, categories);
    let keys = Object.keys(categories);
    keys.forEach(key => {
        category = categories[key];
        category.posts = category.posts.sort(compareDates);
    })
    let posts = keys.map(function(k) { return categories[k]; });
    console.log(`posts: `, posts);
    fs.writeFileSync('./static/posts/posts.json', JSON.stringify(posts, null, 2));
});
