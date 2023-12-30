export function isValidTable(data: any) {
    if(!data || data === null || data === undefined || !Array.isArray(data)) return false;

    return true;
}