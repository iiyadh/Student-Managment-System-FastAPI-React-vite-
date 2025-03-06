from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import motor.motor_asyncio
from pydantic import BaseModel
from bson import ObjectId

from pymongo import ReturnDocument

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB Connection
client = motor.motor_asyncio.AsyncIOMotorClient("mongodb+srv://tabaiiyadh317:sG93hRye4btB058t@cluster0.cxp3v.mongodb.net/")
db = client.StudentMS
student_collection = db.students

# Pydantic Model
class Student(BaseModel):
    first_name: str
    last_name: str
    email: str
    age: int
    major: str

# Helper function to convert MongoDB documents
def student_serializer(student) -> dict:
    return {
        "id": str(student["_id"]),
        "first_name": student["first_name"],
        "last_name": student["last_name"],
        "email": student["email"],
        "age": student["age"],
        "major": student["major"],
    }

# Create a Student
@app.post("/students")
async def add_student(student: Student):
    new_student = await student_collection.insert_one(student.dict())
    created_student = await student_collection.find_one({"_id": new_student.inserted_id})
    return student_serializer(created_student)

# Read All Students
@app.get("/students")
async def find_all_students():
    students = await student_collection.find().to_list(100)
    return [student_serializer(student) for student in students]

# Read One Student
@app.get("/students/{id}")
async def find_student(id: str):
    student = await student_collection.find_one({"_id": ObjectId(id)})
    if student:
        return student_serializer(student)
    raise HTTPException(status_code=404, detail="Student not found")

# Update a Student
@app.put("/students/{id}")
async def update_student(id: str, student: Student):
    updated_student = await student_collection.find_one_and_update(
        {"_id": ObjectId(id)},
        {"$set": student.dict()},
        return_document=ReturnDocument.AFTER
    )
    if updated_student:
        return student_serializer(updated_student)
    raise HTTPException(status_code=404, detail="Student not found")

# Delete a Student
@app.delete("/students/{id}")
async def delete_student(id: str):
    deleted_student = await student_collection.find_one_and_delete({"_id": ObjectId(id)})
    if deleted_student:
        return {"message": "Student deleted successfully"}
    raise HTTPException(status_code=404, detail="Student not found")