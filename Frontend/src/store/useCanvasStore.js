import { create } from 'zustand';
import api from '../lib/api';
import { ENDPOINTS } from '../lib/endpoints';
import { useChannelStore } from './useChannelStore';

// Helper to extract text from any field returned by backend/agent (case-insensitive)
function extractTextContent(el) {
  if (!el) return '';

  // 1. Direct text fields with Capital / camelCase / snake_case checks
  const directText = el.Text ?? el.text ?? el.TEXT ?? el.content ?? el.Content ?? el.message ?? el.value ?? el.title ?? el.name ?? el.label ?? el.description ?? el.newText ?? el.new_text;
  if (typeof directText === 'string' && directText.trim()) {
    return directText.trim();
  }

  // 2. Case-insensitive key search for any property containing 'text' or 'content'
  for (const [key, val] of Object.entries(el)) {
    if (typeof val === 'string' && val.trim()) {
      const lowerKey = key.toLowerCase();
      if (lowerKey === 'text' || lowerKey === 'content' || lowerKey === 'message' || lowerKey === 'newtext') {
        return val.trim();
      }
    }
  }

  // 3. Check if shape field contains text instead of geometry
  if (typeof el.shape === 'string' && el.shape.trim()) {
    const s = el.shape.trim().toLowerCase();
    if (s !== 'rectangle' && s !== 'circle' && s !== 'square' && s !== 'triangle' && s !== 'box' && s !== 'shape') {
      return el.shape.trim();
    }
  }

  // 4. Check if type field contains the text
  if (typeof el.type === 'string' && el.type.trim()) {
    const t = el.type.trim().toLowerCase();
    if (t !== 'text' && t !== 'shape' && t !== 'rectangle' && t !== 'circle' && t !== 'square' && t !== 'triangle' && t.length > 3) {
      return el.type.trim();
    }
  }

  // 5. Nested data object
  if (el.data && typeof el.data === 'object') {
    return extractTextContent(el.data);
  }

  return '';
}

export const useCanvasStore = create((set, get) => ({
  elements: [],
  selectedElementId: null,
  isLoading: false,

  setSelectedElementId: (id) => set({ selectedElementId: id }),

  // 1. GET /getAllElementsByChannel?channelId=...
  fetchElements: async (channelId) => {
    if (!channelId) return;
    try {
      const response = await api.get(`${ENDPOINTS.GET_ALL_ELEMENTS_BY_CHANNEL}?channelId=${channelId}`);
      
      // Ensure we have an array
      const rawElements = Array.isArray(response) ? response : (response?.data || []);
      console.log('🎨 [Canvas] Fetched raw elements:', rawElements);

      const mappedElements = rawElements.map((el, idx) => {
        const rawType = (el.type || '').toLowerCase();
        const rawShape = (el.shape || '').toLowerCase();
        const textContent = extractTextContent(el);
        
        const posX = el.positionX ?? el.positionx ?? el.x ?? 250;
        const posY = el.positionY ?? el.positiony ?? el.y ?? 250;
        const widthVal = el.sizeX ?? el.sizex ?? el.width ?? 180;
        const heightVal = el.sizeY ?? el.sizey ?? el.height ?? 100;
        const fontSizeVal = el.fontSize ?? el.font_size ?? el.fontsize ?? el.FontSize ?? null;
        const fontVal = el.font ?? el.Font ?? null;
        
        // Handle color with dark mode fallback
        let colorVal = el.color && el.color !== 'null' ? el.color : null;
        if (colorVal === 'black' || colorVal === '#000000') {
          colorVal = '#ffffff';
        }

        // Determine shape and normalized element type
        const shapeValue = rawShape || (rawType !== 'shape' && rawType !== 'text' ? rawType : 'rectangle');
        let normalizedType = 'rectangle';
        if (rawType === 'text' || rawShape === 'text' || (!rawShape && textContent && !el.sizeX && !el.sizex)) {
          normalizedType = 'text';
        } else if (shapeValue === 'circle') {
          normalizedType = 'circle';
        } else if (shapeValue === 'square') {
          normalizedType = 'square';
        } else if (shapeValue === 'triangle') {
          normalizedType = 'triangle';
        } else if (shapeValue === 'rectangle') {
          normalizedType = 'rectangle';
        } else {
          normalizedType = shapeValue;
        }

        const defaultBgColor =
          normalizedType === 'circle' ? 'rgba(168, 85, 247, 0.25)' :
          normalizedType === 'triangle' ? 'rgba(245, 158, 11, 0.25)' :
          normalizedType === 'square' ? 'rgba(59, 130, 246, 0.25)' :
          'rgba(56, 189, 248, 0.25)';

        const defaultBorderColor =
          normalizedType === 'circle' ? 'rgba(168, 85, 247, 0.6)' :
          normalizedType === 'triangle' ? 'rgba(245, 158, 11, 0.6)' :
          normalizedType === 'square' ? 'rgba(59, 130, 246, 0.6)' :
          'rgba(56, 189, 248, 0.6)';

        return {
          id: el.id ?? `el-${idx}`,
          raw: el,
          rawType: el.type,
          shape: el.shape || shapeValue,
          type: normalizedType,
          x: Number(posX),
          y: Number(posY),
          width: Number(widthVal),
          height: Number(heightVal),
          content: textContent,
          text: textContent,
          style: {
            backgroundColor: colorVal || defaultBgColor,
            borderColor: colorVal || defaultBorderColor,
            color: colorVal || '#ffffff',
            fontSize: fontSizeVal ? (String(fontSizeVal).includes('px') ? fontSizeVal : `${fontSizeVal}px`) : '16px',
            fontFamily: fontVal || 'Inter, system-ui, -apple-system, sans-serif',
          }
        };
      });

      set({ elements: mappedElements, isLoading: false });
    } catch (error) {
      console.error('❌ [Canvas] Failed to fetch elements:', error);
      set({ isLoading: false });
    }
  },

  // 2. POST /createElement
  addElement: async (elementPayload) => {
    const channelId = useChannelStore.getState().activeChannelId;
    if (!channelId) {
      alert('Please select or create a channel first!');
      return;
    }

    try {
      await api.post(ENDPOINTS.CREATE_ELEMENT, {
        type: elementPayload.type || 'shape',
        shape: elementPayload.shape || 'rectangle',
        positionX: elementPayload.positionX ?? 250,
        positionY: elementPayload.positionY ?? 250,
        sizeX: elementPayload.sizeX ?? 180,
        sizeY: elementPayload.sizeY ?? 100,
        text: elementPayload.text ?? null,
        font: elementPayload.font ?? null,
        fontSize: elementPayload.fontSize ?? null,
        color: elementPayload.color ?? 'rgba(56, 189, 248, 0.3)',
        imageUrl: null,
        channelId: { id: channelId }
      });
      await get().fetchElements(channelId);
    } catch (error) {
      console.error('Failed to create element:', error);
    }
  },

  // 3. POST /updateElement
  updateElement: async (element) => {
    try {
      await api.post(ENDPOINTS.UPDATE_ELEMENT, element);
      const channelId = useChannelStore.getState().activeChannelId;
      if (channelId) get().fetchElements(channelId);
    } catch (error) {
      console.error('Failed to update element:', error);
    }
  },

  // 4. DELETE /deleteElement?id=...
  deleteElement: async (id) => {
    const targetId = id || get().selectedElementId;
    if (!targetId) return;

    set(state => ({
      elements: state.elements.filter(el => el.id !== targetId),
      selectedElementId: state.selectedElementId === targetId ? null : state.selectedElementId
    }));

    try {
      await api.delete(`${ENDPOINTS.DELETE_ELEMENT}?id=${targetId}`);
    } catch (error) {
      console.error('Failed to delete element:', error);
    }
  },

  // 5. POST /moveElement?id=...&newX=...&newY=...
  updateElementPos: async (id, x, y) => {
    set(state => ({
      elements: state.elements.map(el => el.id === id ? { ...el, x, y } : el)
    }));

    try {
      await api.post(`${ENDPOINTS.MOVE_ELEMENT}?id=${id}&newX=${x}&newY=${y}`);
    } catch (error) {
      console.error('Failed to move element:', error);
    }
  },

  // 6. POST /resizeElement?id=...&newWidth=...&newHeight=...
  updateElementSize: async (id, width, height) => {
    set(state => ({
      elements: state.elements.map(el => el.id === id ? { ...el, width, height } : el)
    }));

    try {
      await api.post(`${ENDPOINTS.RESIZE_ELEMENT}?id=${id}&newWidth=${width}&newHeight=${height}`);
    } catch (error) {
      console.error('Failed to resize element:', error);
    }
  },

  // 7. POST /createText?text=...&x=...&y=...&channelId=...
  createText: async (text, x = 250, y = 250) => {
    const channelId = useChannelStore.getState().activeChannelId;
    if (!channelId) {
      alert('Please select or create a channel first!');
      return;
    }

    try {
      await api.post(
        `${ENDPOINTS.CREATE_TEXT}?text=${encodeURIComponent(text)}&x=${x}&y=${y}&channelId=${channelId}`
      );
      await get().fetchElements(channelId);
    } catch (error) {
      console.error('Failed to create text:', error);
    }
  },

  // 8. POST /formatText?id=...&font=...&fontSize=...&color=...
  formatText: async (id, font, fontSize, color) => {
    try {
      await api.post(
        `${ENDPOINTS.FORMAT_TEXT}?id=${id}&font=${encodeURIComponent(font)}&fontSize=${fontSize}&color=${encodeURIComponent(color)}`
      );
      const channelId = useChannelStore.getState().activeChannelId;
      if (channelId) get().fetchElements(channelId);
    } catch (error) {
      console.error('Failed to format text:', error);
    }
  },

  // 9. POST /updateText?id=...&newText=...
  updateText: async (id, newText) => {
    try {
      await api.post(
        `${ENDPOINTS.UPDATE_TEXT}?id=${id}&newText=${encodeURIComponent(newText)}`
      );
      const channelId = useChannelStore.getState().activeChannelId;
      if (channelId) get().fetchElements(channelId);
    } catch (error) {
      console.error('Failed to update text:', error);
    }
  }
}));
