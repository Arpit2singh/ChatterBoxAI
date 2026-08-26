import json

from dotenv import load_dotenv 
from livekit.agents import AutoSubscribe, JobContext, WorkerOptions, cli , AgentSession , Agent , function_tool , ConversationItemAddedEvent
from livekit.plugins import openai, silero , groq
from datetime import datetime 
import os
import requests
import uuid
from openai import OpenAI
import asyncio

load_dotenv() 

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
    base_url="https://api.groq.com/openai/v1"
)

system_instruction_for_relative_position="""you will get the data of the elements where you will get the element id yuo have to find the actual coordinate of the element and then you have to find the relative position of the new element with respect to the existing elements and then you have to return the actual coordinate of the new element in x and y axis. you will get the data in json format where you will get the list of elements with their id and their coordinates and you will get the id of the element with respect to which you have to find the relative position of the new element. you will also get the relative position of the new element with respect to the existing element. you have to return the actual coordinate of the new element in x and y axis in json format. """

system_instruction = """You are a helpful AI teammate participating in a live voice channel with multiple users, similar to a knowledgeable colleague sitting in on a group call.

Guidelines:
- Listen to the conversation naturally. Only respond when directly addressed (e.g., someone says "hey agent" or asks you a question) or when given a clear task to do.
- Keep responses conversational and concise, since this is spoken audio, not text — avoid long monologues, bullet points, or anything that sounds unnatural when read aloud.
- When given a task, acknowledge it briefly first (e.g., "Sure, working on it") before executing, so users know you've understood.
- You are aware that multiple people may be speaking in this channel. Pay attention to context and avoid interrupting or responding to every single utterance.
- If you don't understand something clearly, ask for clarification instead of guessing.
- Maintain a friendly, professional, and helpful tone at all times."""


# create_element
# update_element
# delete_element
# move_element
# resize_element
# create_text
# format_text


@function_tool
async def get_elements():
    """Fetches the list of all elements currently present in the canvas. Use this when the user wants to see what elements are available."""
    response = requests.get(f"http://localhost:8080/getAllElementsByChannel?channelId={CURRENT_CHANNEL_ID}")
    return response.json()
    
    
@function_tool
async def create_element(element_type : str , element_shape : str , position_x : float , position_y : float):
    """Creates a new element of the specified type, shape, and position. Use this when the user wants to add a new element to the canvas. If the user refers to another existing element (e.g. 'above the circle', 'next to the box'), first call get_elements to find that element's id and position, then calculate the new position yourself before calling this tool."""
  
    response = requests.post("http://localhost:8080/createElement", json={
    "type": element_type,
    "shape": element_shape,
    "positionX": position_x,
    "positionY": position_y,
    "channelId": {
    "id": CURRENT_CHANNEL_ID
    }
    })
    return f"Creating a {element_type} with shape {element_shape} at position {position_x}, {position_y}. with response: {response.json()['id']}"

@function_tool
async def update_element(element_id : int , type : str , shape : str , position_x : float , position_y : float ):

    
    """Updates the properties of an existing element. Use this when the user wants to change an element's attributes."""
    response = requests.post("http://localhost:8080/updateElement", json={
    "id": element_id,
    "type": type,
    "shape": shape,
    "positionX": position_x,
    "positionY": position_y,
    "channelId": { "id": CURRENT_CHANNEL_ID }
        })
    return f"Updating element {element_id} with new properties: {response.json()}."
    

@function_tool
async def delete_element(element_id :int):
    """Deletes an existing element. Use this when the user wants to remove an element from the canvas."""
    response = requests.delete(f"http://localhost:8080/deleteElement?id={element_id}")  
    return f"Deleting element {element_id}."

@function_tool
async def move_element(element_id :int , new_position_x : float , new_position_y : float):
    """Moves an existing element to a new position. Use this when the user wants to reposition an element on the canvas."""
    response = requests.post(f"http://localhost:8080/moveElement?id={element_id}&newX={new_position_x}&newY={new_position_y}")
    return f"Moving element {element_id} to position {new_position_x}, {new_position_y}."

@function_tool
async def resize_element(element_id :int , new_width : float , new_height : float):
    """Resizes an existing element. Use this when the user wants to change the dimensions of an element on the canvas."""
    response = requests.post(f"http://localhost:8080/resizeElement?id={element_id}&newWidth={new_width}&newHeight={new_height}")
    return f"Resizing element {element_id} to width {new_width} and height {new_height}."

@function_tool
async def create_text(text_content : str , position_x : float , position_y : float):
    """Creates a new text element with the specified content and position. Use this when the user wants to add text to the canvas."""
    response = requests.post(f"http://localhost:8080/createText?text={text_content}&x={position_x}&y={position_y}&channelId={CURRENT_CHANNEL_ID}")
    return f"Creating text '{text_content}' at position {position_x}, {position_y}."

@function_tool
async def format_text(element_id :int , font_family : str , font_size : int , font_color : str):
    """Formats an existing text element. Use this when the user wants to change the appearance of a text element on the canvas."""
    response = requests.post(f"http://localhost:8080/formatText?id={element_id}&font={font_family}&fontSize={font_size}&color={font_color}")
    return f"Formatting text element {element_id} with font '{font_family}', size {font_size}, and color {font_color}."

@function_tool
async def update_text(element_id :int , new_text_content : str):
    """Updates the content of an existing text element. Use this when the user wants to change the text displayed on the canvas."""
    response = requests.post(f"http://localhost:8080/updateText?id={element_id}&newText={new_text_content}")
    return f"Updating text element {element_id} with new content: '{new_text_content}'."

@function_tool 
async def get_current_time():
    """Returns the current date and time. Use this when the user asks what time it is or what the current date is."""
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")


def save_conversation_to_backend(speaker_type , message):
    try:
        requests.post("http://localhost:8080/saveConversation", json={
            "speakerType": speaker_type,
            "message": message,
            "channel": {"id": CURRENT_CHANNEL_ID}
        })
    except Exception as e:
        print(f"Failed to save conversation: {e}")

async def entrypoint(ctx: JobContext):
    global CURRENT_CHANNEL_ID
    await ctx.connect(auto_subscribe=AutoSubscribe.AUDIO_ONLY)
    participant = await ctx.wait_for_participant() 
    CURRENT_CHANNEL_ID = ctx.room.name
    print(f"Using channel_id: {CURRENT_CHANNEL_ID}") 
    session = AgentSession(
        vad=silero.VAD.load(),
        stt=openai.STT(model="whisper-large-v3",
                       base_url="https://api.groq.com/openai/v1",
                       api_key=os.getenv("OPENAI_API_KEY"),
                       use_realtime=False),
        llm=openai.LLM(model="openai/gpt-oss-120b",
               base_url="https://api.groq.com/openai/v1",
               api_key=os.getenv("OPENAI_API_KEY"),
               ),
        tts=groq.TTS(
                       voice="austin",
                       model="canopylabs/orpheus-v1-english",
                       api_key=os.getenv("OPENAI_API_KEY"),
                       )
    )
    @session.on("conversation_item_added")
    def onConversation(eve : ConversationItemAddedEvent):
        speaker_type = eve.item.role 
        text = eve.item.text_content 
        if text:
            save_conversation_to_backend(speaker_type , text)
    
     
    await session.start(
        room=ctx.room,
        agent=Agent(instructions=system_instruction , tools=[get_current_time, create_element, update_element, delete_element, move_element, resize_element, create_text, format_text , update_text , get_elements ] )
    )

if __name__ == "__main__":
    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint))