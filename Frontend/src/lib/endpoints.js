export const ENDPOINTS = {
  // User APIs
  REGISTER: '/register',

  // Channel APIs
  GET_ALL_CHANNELS: '/getAllChannels',
  CREATE_CHANNEL: '/createChannel',
  JOIN_CHANNEL: '/joinChannel',
  JOIN_CHANNEL_WITH_NAME: '/joinChannelWithName',

  // Conversation APIs
  SAVE_CONVERSATION: '/saveConversation',
  GET_ALL_CONVERSATIONS: '/getAllConversations',

  // Element APIs (Whiteboard)
  CREATE_ELEMENT: '/createElement',
  UPDATE_ELEMENT: '/updateElement',
  DELETE_ELEMENT: '/deleteElement',
  MOVE_ELEMENT: '/moveElement',
  RESIZE_ELEMENT: '/resizeElement',
  
  // Text APIs
  CREATE_TEXT: '/createText',
  FORMAT_TEXT: '/formatText',
  UPDATE_TEXT: '/updateText',
  
  // Fetch Elements
  GET_ALL_ELEMENTS_BY_CHANNEL: '/getAllElementsByChannel'
};
