import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const file = path.join(__dirname, '..', 'json', 'crossfit-main-hero-wods-archive.json');

// This is used to fix the formatting after scrapping, yes... I know the scrapping script is in Python and this is in JS.
fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
    }

    const parsed = JSON.parse(data);

    const arr = parsed.map((item) => {
        let content = '<p>';

        if (item.line_one) {
            const newLineOne = item.line_one.replaceAll('\n', '<br/>\n');
            content += newLineOne;
        }

        if (item.line_two) {
            const newLineTwo = item.line_two.replaceAll('\n', '<br/>\n');
            content += `<br/>\n${newLineTwo}`;
        }

        if (item.line_three) {
            const newLineThree = item.line_three.replaceAll('\n', '<br/>\n');
            content += `<br/>\n${newLineThree}`;
        }

        content += '</p>'

        delete item.line_one;
        delete item.line_two;
        delete item.line_three;

        return {
            ...item,
            content: content,
        }
    });


    fs.writeFile('crossfit-main-hero-wods.json', JSON.stringify(arr), 'utf8', (err) => {
        console.log(err);
    });
})