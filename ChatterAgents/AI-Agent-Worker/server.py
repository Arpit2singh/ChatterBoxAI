from fastapi import FastAPI , Body , File

app = FastAPI() 
@app.get("/")
def server():
    return "server is running" 

@app.post("/question")
def questionAnswer(question : str):
    response = generateResponse(question) 
    return {"response" : response} 