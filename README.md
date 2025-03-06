This is a FastAPI application that provides a simple API for managing student information. 
It allows for the following operations:

1. Get all students (`GET /students`)
2. Add a new student (`POST /students`)
3. Update an existing student by ID (`PUT /students/{id}`)
4. Delete a student by ID (`DELETE /students/{id}`)

### Requirements:
- FastAPI (install via `pip install fastapi`)
- Uvicorn (install via `pip install uvicorn`)

### How to Run:
1. Install the necessary dependencies:
    ```
    pip install fastapi uvicorn
    ```

2. Save this code to a Python file (e.g., `app.py`).

3. Run the application using Uvicorn:
    ```
    uvicorn app:app --reload
    ```
    This will start the server and you can access the API at `http://127.0.0.1:8000`.

4. You can test the API using a tool like [Postman](https://www.postman.com/) or by sending HTTP requests directly from your frontend application.

### API Endpoints:

#### 1. `GET /students`
This endpoint returns a list of all students.

**Response:**
- A JSON array of student objects.

Example response:
{
  "id": 1,
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "age": 21,
  "major": "Computer Science"
}
]

#### 2. `POST /students`
This endpoint adds a new student. You need to provide the following data in the request body:

**Request body (JSON format):**
{
  "first_name": "Jane",
  "last_name": "Smith",
  "email": "jane.smith@example.com",
  "age": 22,
  "major": "Physics"
}

**Response:**
- A JSON object containing the newly created student with an auto-generated `id`.

Example response:
{
  "id": 2,
  "first_name": "Jane",
  "last_name": "Smith",
  "email": "jane.smith@example.com",
  "age": 22,
  "major": "Physics"
}

#### 3. `PUT /students/{id}`
This endpoint updates an existing student by their `id`. You need to provide the updated data in the request body:

**Request body (JSON format):**
{
  "first_name": "Jane",
  "last_name": "Doe",
  "email": "jane.doe@example.com",
  "age": 23,
  "major": "Mathematics"
}

**Response:**
- A success message indicating the student was updated.

Example response:
{
  "message": "Student Updated Successfully"
}

#### 4. `DELETE /students/{id}`
This endpoint deletes an existing student by their `id`.

**Response:**
- A success message indicating the student was deleted.

Example response:
{
  "message": "Student Deleted Successfully"
}

### Frontend Requirements:
To interact with this API from your frontend, you can use a JavaScript library like `fetch` or `axios` to send HTTP requests.

#### Example of sending a `POST` request using `fetch`:
fetch("http://localhost:8000/students", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    first_name: "Jane",
    last_name: "Smith",
    email: "jane.smith@example.com",
    age: 22,
    major: "Physics"
  })
})
.then(response => response.json())
.then(data => console.log(data));

### CORS Configuration:
This application uses CORS (Cross-Origin Resource Sharing) middleware to allow requests from `http://localhost:5173`, which is useful if you're developing your frontend on that address (e.g., using Vite for fast development). If you need to change the allowed origins, you can modify the `allow_origins` list in the FastAPI app configuration.
"""
