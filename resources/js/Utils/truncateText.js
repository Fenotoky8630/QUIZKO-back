export function truncateText(text, limit = 100){
    return text.length > limit ? `${text.substring(0, limit)} .......` : text;
};