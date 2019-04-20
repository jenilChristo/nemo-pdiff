export function writeFileToPath(data, path) {
    try {
        await to(writeFile(path, data.replace(/^data:image\/png;base64,/, ''), 'base64'));
    }
    catch (ex) {
        throw new Error("Error in Writing screenshot to file");
    }
    return;
}