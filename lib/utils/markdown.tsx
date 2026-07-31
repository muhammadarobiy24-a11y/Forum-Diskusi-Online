import React from 'react';

// Regex to match image markdown: ![alt text](url)
const IMAGE_REGEX = /!\[([^\]]*)\]\(([^)]+)\)/g;

// Regex to match video markdown: [video](url)
const VIDEO_REGEX = /\[video\]\(([^)]+)\)/g;

export function stripMarkdown(content: string): string {
  // Remove image tags completely
  let stripped = content.replace(IMAGE_REGEX, "");
  
  // Remove video tags completely
  stripped = stripped.replace(VIDEO_REGEX, "");
  
  // You could add more markdown stripping rules here if needed
  
  return stripped.trim();
}

export function renderMarkdownMedia(content: string): React.ReactNode {
  // First we split by line breaks to preserve paragraphs
  const lines = content.split('\n');

  return lines.map((line, lineIndex) => {
    if (!line.trim()) {
      return <br key={`br-${lineIndex}`} />;
    }

    // Process each line for markdown patterns
    const elements: React.ReactNode[] = [];
    let lastIndex = 0;

    // A combined regex to find either image or video to preserve order
    const MEDIA_REGEX = /(?:!\[([^\]]*)\]\(([^)]+)\))|(?:\[video\]\(([^)]+)\))/g;
    let match;

    while ((match = MEDIA_REGEX.exec(line)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        elements.push(line.substring(lastIndex, match.index));
      }

      const isImage = match[0].startsWith('![');
      const isVideo = match[0].startsWith('[video]');

      if (isImage) {
        const alt = match[1];
        const url = match[2];
        elements.push(
          <div key={`img-${match.index}`} className="my-4 max-w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={url} 
              alt={alt || "Post image"} 
              className="w-full h-auto object-cover max-h-[600px]"
              loading="lazy"
            />
          </div>
        );
      } else if (isVideo) {
        const url = match[3];
        elements.push(
          <div key={`vid-${match.index}`} className="my-4 max-w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
            <video 
              src={url} 
              controls 
              className="w-full h-auto max-h-[600px] bg-black/50"
              preload="metadata"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        );
      }

      lastIndex = MEDIA_REGEX.lastIndex;
    }

    // Add remaining text
    if (lastIndex < line.length) {
      elements.push(line.substring(lastIndex));
    }

    return (
      <p key={`line-${lineIndex}`} className="mb-4 last:mb-0">
        {elements.length > 0 ? elements : line}
      </p>
    );
  });
}
