import React from 'react';
import ShapeRenderer from './ShapeRenderer';
import TextElementRenderer from './TextElementRenderer';

export default function ElementRenderer({ element }) {
  if (!element) return null;

  const rawType = (element.type || element.raw?.type || '').toLowerCase();
  const rawShape = (element.shape || element.raw?.shape || '').toLowerCase();

  // If element is a text element, delegate to TextElementRenderer
  if (rawType === 'text' || rawShape === 'text') {
    return <TextElementRenderer element={element} />;
  }

  // Route shapes (circle, square, triangle, rectangle, fallback) to ShapeRenderer
  return <ShapeRenderer element={element} />;
}
