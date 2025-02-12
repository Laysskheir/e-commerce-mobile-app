import slugify from "slugify";
import config from "../config/config";

export const generateProductSlug = (text: string): string => {
    return slugify(text, { lower: true, strict: true });
};

// Utility function to generate full image URL
export const generateFullImageUrl = (imagePath: string): string => {
    if (!imagePath) return '';
    return `${config.serverUrl}/${imagePath}`;
};
