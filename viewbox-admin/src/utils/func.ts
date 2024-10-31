export function getEnumNames (e: any) {
    return Object.keys(e)
        .map(k => e[k])
        .filter(v => typeof v === 'number')
        .map(x => String(x));
}

export function getEnumValues<T extends number> (e: any) {
    return Object.keys(e)
        .map(k => e[k])
        .filter(v => typeof v === 'number') as T[];
}