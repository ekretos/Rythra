import fs from 'fs';
import path from 'path';

const docsDir = 'docs/src/content/docs/reference';

function addFrontmatter(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            addFrontmatter(filePath);
        } else if (file.endsWith('.md')) {
            let content = fs.readFileSync(filePath, 'utf-8');
            if (!content.startsWith('---\n')) {
                const title = path.basename(file, '.md');
                const frontmatter = `---\ntitle: ${title}\ndescription: API Reference for ${title}\n---\n\n`;
                fs.writeFileSync(filePath, frontmatter + content);
                console.log(`Added frontmatter to ${filePath}`);
            }
        }
    }
}

addFrontmatter(docsDir);
