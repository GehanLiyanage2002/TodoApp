from flask import Blueprint, request, jsonify
import sqlite3

DB_NAME = "db.sqlite3"
todos_bp = Blueprint("todos", __name__)

def get_db_connection():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn

# GET all todos
@todos_bp.route("/", methods=["GET"])
def get_todos():
    conn = get_db_connection()
    todos = conn.execute("SELECT * FROM todos ORDER BY created_at DESC").fetchall()
    conn.close()
    return jsonify([dict(todo) for todo in todos])

# POST add todo
@todos_bp.route("/", methods=["POST"])
def add_todo():
    data = request.get_json()
    text = data.get("text")
    if not text:
        return jsonify({"error": "Text is required"}), 400
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO todos (text, completed) VALUES (?,?)", (text, 0))
    conn.commit()
    todo_id = cursor.lastrowid
    conn.close()
    return jsonify({"id": todo_id, "text": text, "completed": False}), 201

# PUT toggle or update todo
@todos_bp.route("/<int:id>", methods=["PUT"])
def update_todo(id):
    data = request.get_json()
    text = data.get("text")
    completed = data.get("completed")
    conn = get_db_connection()
    cursor = conn.cursor()
    if text is not None:
        cursor.execute("UPDATE todos SET text=? WHERE id=?", (text, id))
    if completed is not None:
        cursor.execute("UPDATE todos SET completed=? WHERE id=?", (1 if completed else 0, id))
    conn.commit()
    conn.close()
    return jsonify({"message": "Todo updated"}), 200

# DELETE todo
@todos_bp.route("/<int:id>", methods=["DELETE"])
def delete_todo(id):
    conn = get_db_connection()
    conn.execute("DELETE FROM todos WHERE id=?", (id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Todo deleted"}), 200
