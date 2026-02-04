import {marked} from 'marked';
import sanitizeHtmlLibrary from 'sanitize-html';
import TurndownService from 'turndown';


export async function  sanitizeMarkdownContent(markdownContent:string ): Promise<string> {
    const turndownService = new TurndownService();

    // 1. Convert markdown to html
    const convertedHtml = await  marked.parse(markdownContent);

    // 2. Sanitize  the html
    const sanitizedHtml = sanitizeHtmlLibrary(convertedHtml, {
        allowedTags: sanitizeHtmlLibrary.defaults.allowedTags.concat(['img'])
    });

    // 3. Convert the sanitized html back to markdown
    const sanitizedMarkdown = turndownService.turndown(sanitizedHtml);

    return sanitizedMarkdown;
}

