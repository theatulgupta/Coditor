"use client";

interface LivePreviewProps {
  srcDoc: string;
}

export function LivePreview({ srcDoc }: LivePreviewProps) {
  return (
    <iframe
      title="Live Preview"
      srcDoc={srcDoc}
      sandbox="allow-scripts allow-same-origin"
      frameBorder="0"
      className="w-full h-full"
    />
  );
}
