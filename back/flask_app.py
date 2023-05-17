from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from datetime import datetime
import os

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///parks.db'
app.config['SECRET_KEY'] = 'mysecretkey'

db = SQLAlchemy(app)
admin = Admin(app)

# Создание моделей базы данных
class Park(db.Model):
    parkId = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    total_area = db.Column(db.Float)
    city = db.Column(db.String(50))
    coordinates = db.Column(db.Text)

    problems = db.relationship('Problem', backref='park', lazy=True)

    def __repr__(self):
        return f'<Park {self.name}>'

class Problem(db.Model):
    problemId = db.Column(db.Integer, primary_key=True)
    parkId = db.Column(db.Integer, db.ForeignKey('park.parkId'), nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    about = db.Column(db.Text)
    is_solution = db.Column(db.Boolean, nullable=False)

    def __repr__(self):
        return f'<Problem {self.problemId}>'

# Создание таблиц базы данных
db.create_all()

# Регистрация моделей во Flask-Admin
admin.add_view(ModelView(Park, db.session))
admin.add_view(ModelView(Problem, db.session))

def get_problem_score(park_id):
    problems = Problem.query.filter_by(parkId=park_id).all()
    problem_score = sum(1 if not problem.is_solution else -1 for problem in problems)
    return problem_score

@app.route('/api/getParks', methods=['GET'])
def get_parks():
    parks = Park.query.all()
    response = {
        "features": [
            {
                "parkId": park.parkId,
                "properties": {
                    "name": park.name,
                    "total_area": park.total_area,
                    "city": park.city,
                    "problem_score": get_problem_score(park.parkId)
                },
                "geometry": {
                    "coordinates": eval(park.coordinates)
                },
            } for park in parks
        ]
    }
    return jsonify(response)

@app.route('/api/parksWithProblems', methods=['GET'])
def parks_with_problems():
    parks = Park.query.all()
    response = {
        "features": [
            {
                "parkId": park.parkId,
                "properties": {
                    "name": park.name,
                    "total_area": park.total_area,
                    "city": park.city,
                    "problem_score": get_problem_score(park.parkId)
                },
                "geometry": {
                    "coordinates": eval(park.coordinates)
                },
            } for park in parks if get_problem_score(park.parkId) > 0
        ]
    }
    return jsonify(response)

@app.route('/api/parksWithoutProblems', methods=['GET'])
def parks_without_problems():
    parks = Park.query.all()
    response = {
        "features": [
            {
                "parkId": park.parkId,
                "properties": {
                    "name": park.name,
                    "total_area": park.total_area,
                    "city": park.city
                },
                "geometry": {
                    "coordinates": eval(park.coordinates)
                },
            } for park in parks if get_problem_score(park.parkId) == 0
        ]
    }
    return jsonify(response)

@app.route('/api/parksProblems/<int:park_id>', methods=['GET'])
def parks_problems(park_id):
    problems = Problem.query.filter_by(parkId=park_id).all()
    return jsonify(problems=[{'problemId': problem.problemId, 'about': problem.about, 'is_solution' : problem.is_solution} for problem in problems])

@app.route('/api/deleteProblem/<int:problem_id>', methods=['DELETE'])
def delete_problem(problem_id):
    problem = Problem.query.get_or_404(problem_id)
    db.session.delete(problem)
    db.session.commit()
    return jsonify(message="Problem deleted successfully")

@app.route('/api/addProblem', methods=['POST'])
def add_problem():
    park_id = request.json['parkId']
    date = datetime.fromtimestamp(request.json['date'])
    about = request.json['about']
    is_solution = request.json['is_solution']

    new_problem = Problem(parkId=park_id, date=date, about=about, is_solution=is_solution)
    db.session.add(new_problem)
    db.session.commit()
    return jsonify(message="Problem added successfully")

@app.route('/api/addPark', methods=['POST'])
def add_park():
    name = request.json['name']
    total_area = request.json['total_area']
    city = request.json['city']
    coordinates = request.json['coordinates']

    new_park = Park(name=name, total_area=total_area, city=city, coordinates=str(coordinates))
    db.session.add(new_park)
    db.session.commit()
    return jsonify(message="Park added successfully")

if __name__ == '__main__':
    app.run()
