import path from 'path';
import fs from 'fs/promises';

const workoutsPreMadeService = {
    async getJSONFileContents(collection: string) {
        // This feels disgusting, I should fix it at some point
        const file = path.join(__dirname, '..', '..', 'json', String(collection) + '.json')
        const buffer = await fs.readFile(file);
        const str = buffer.toString();
        return JSON.parse(str);
    }
};

export default workoutsPreMadeService;