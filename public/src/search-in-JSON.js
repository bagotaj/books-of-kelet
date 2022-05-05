import { readFileSync } from 'fs';

const boundingBoxes = [];

const data = readFileSync('books-text.json', 'utf8');

const booksData = JSON.parse(data);
const blocks = booksData[0]['fullTextAnnotation']['pages'][0]['blocks'];

for (let i = 0; i < blocks.length; i++) {
  boundingBoxes.push(blocks[i]['boundingBox']);
}

console.log(boundingBoxes);
