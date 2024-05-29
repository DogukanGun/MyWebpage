export const replaceImageLinks = (input: string): { images: string[], texts: string[] } => {
    // Regular expression to find all image src links
    const imgTagRegex = /<img[^>]+src="([^">]+)"/g;
    // Regular expression to find all text within <p> tags
    const pTagRegex = /<p>(.*?)<\/p>/g;

    // Array to store the extracted image URLs
    const images: string[] = [];
    // Array to store the extracted texts within <p> tags
    const texts: string[] = [];

    // Replace all matches with an empty string and extract image URLs
    const replacedInput = input.replace(imgTagRegex, (match, captureGroup) => {
        images.push(captureGroup);
        return '';
    });

    // Extract text within <p> tags
    let match;
    while ((match = pTagRegex.exec(replacedInput)) !== null) {
        texts.push(match[1]);
    }

    return { images, texts };
};
export const extractImageUrls = (input: string): string[] => {
    // Regular expression to find all image src links
    const imgTagRegex = /<img[^>]+src="([^">]+)"/g;

    // Array to store the extracted URLs
    const urls: string[] = [];

    // Variable to store the match results
    let match;

    // Loop through all matches and extract the URLs
    while ((match = imgTagRegex.exec(input)) !== null) {
        urls.push(match[1]);
    }

    return urls;
};