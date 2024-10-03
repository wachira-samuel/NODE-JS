const fs = require('fs');
const path = require('path');

function directoryToTree(rootDir, depth) {
    function getDirectoryTree(currentPath, currentDepth) {
        const stats = fs.statSync(currentPath);
        const name = path.basename(currentPath);

        const node = {
            name: name,
            path: path.relative(process.cwd(), currentPath),
            type: stats.isDirectory() ? 'dir' : 'file',
            size: stats.size,
        };

        if (stats.isDirectory() && currentDepth < depth) {
            node.children = [];
            const files = fs.readdirSync(currentPath);
            for (const file of files) {
                const childPath = path.join(currentPath, file);
                node.children.push(getDirectoryTree(childPath, currentDepth + 1));
            }
        }

        return node;
    }

    return getDirectoryTree(rootDir, 0);
}

// Example usage:
console.log(JSON.stringify(directoryToTree('dummy_dir', 5), null, 4));
