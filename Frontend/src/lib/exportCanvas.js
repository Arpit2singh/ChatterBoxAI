import { toPng, toSvg } from 'html-to-image';

export async function downloadCanvasAsPng(elements, channelName = 'canvas') {
  const node = document.getElementById('canvas-board');
  if (!node) return;

  try {
    // If there are elements, calculate bounding box to capture the active drawing area nicely
    let cropArea = { width: 1920, height: 1080 };
    
    if (elements && elements.length > 0) {
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      
      elements.forEach(el => {
        const x = Number(el.x) || 0;
        const y = Number(el.y) || 0;
        const w = Number(el.width) || 160;
        const h = Number(el.height) || 100;
        
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x + w);
        maxY = Math.max(maxY, y + h);
      });

      const padding = 100;
      cropArea = {
        width: Math.max(maxX + padding, 1200),
        height: Math.max(maxY + padding, 800),
      };
    }

    const dataUrl = await toPng(node, {
      backgroundColor: '#03040c',
      width: cropArea.width,
      height: cropArea.height,
      pixelRatio: 2, // High resolution
    });

    const link = document.createElement('a');
    link.download = `chatterbox-${channelName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error('Failed to download canvas PNG:', error);
    alert('Could not export canvas image.');
  }
}

export function downloadCanvasAsJson(elements, channelName = 'canvas') {
  try {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(elements, null, 2));
    const link = document.createElement('a');
    link.download = `chatterbox-${channelName.toLowerCase().replace(/\s+/g, '-')}-backup.json`;
    link.href = dataStr;
    link.click();
  } catch (error) {
    console.error('Failed to export JSON:', error);
  }
}
