
from flask import Flask, render_template, url_for, request, flash, redirect, session
from dotenv import load_dotenv
from util import json_response
import mimetypes
import queries
from flask_session import Session
import util, templates

mimetypes.add_type("application/javascript", ".js")
app = Flask(__name__)
load_dotenv()
load_dotenv()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)
COLUMN_HEADERS = ["new", "in progress", "testing", "done"]
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template("index.html")


@app.route("/api/boards")
@json_response
def get_boards():
    if session:
        username = session['logged_in']
        return queries.get_boards_id(username)
    boards=queries.get_boards_id()
    print(boards)
    return queries.get_boards_id()


@app.route("/api/boards/<int:board_id>/cards/")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return queries.get_cards_for_board(board_id)


@app.route("/registration", methods=["POST", "GET"])
def registration():
    if request.method == "POST":
        username = request.form.get("username")
        email = request.form.get("email")
        password = request.form.get("password")
        queries.add_user(username, util.hash_password(password), email)
        return redirect(url_for("login"))
    return render_template("registration.html")


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        userdict = queries.get_user(request.form['username'])
        if userdict['username'] and util.verify_password(
                request.form['password'],
                userdict['password']):

            session['logged_in'] = userdict['username']
            session['user_id'] = userdict['id']
            return redirect(url_for('index'))
        return render_template('login.html', error=True)
    return render_template('login.html', error=False)


@app.get('/logout')
def logout():
    session.clear()
    return redirect(url_for("index"))


@app.route("/api/boards/<int:board_id>/add-card/")
@json_response
def add_cards_for_board(board_id: int):

    # adding the cards for the selected board in the database
    return queries.add_card(board_id, order_number=int(queries.get_order_number(board_id, 1))+1)



@app.route("/api/create_new_boards/" , methods=['POST', 'GET'])
@json_response
def add_new_board():
    data = request.get_json()
    if session:
        username = session['logged_in']
    else:
        username = "public"
    board_id = queries.create_board(data.get('boardTitle'), username)
    print(board_id)
    for title in COLUMN_HEADERS:
        queries.add_column_to_board(title,dict(board_id)["id"])



@app.route("/api/status/<int:board_id>", methods=["POST"])
@json_response
def get_status(board_id):
    title = "addColumn"
    return queries.get_status(title, board_id)

@app.route("/api/statuses/<boardId>")
@json_response
def get_statuses(boardId):
    get_board_id = int(boardId)
    a = queries.get_statuses(get_board_id)
    return queries.get_statuses(get_board_id)

@app.route("/api/rename-board-by-id/<int:board_id>/<board_title>", methods=["POST"])
@json_response
def rename_board_by_id(board_id, board_title):
    return queries.rename_board_by_id(board_id, board_title)


@app.route('/api/rename-column/<status_id>/<status_title>', methods=['POST'])
@json_response
def rename_column(status_id, status_title):
    return queries.rename_column(status_title, status_id)


@app.route("/api/rename-card-by-id/<card_id>/<card_title>", methods=["POST"])
@json_response
def rename_card_by_id(card_id, card_title):
    return queries.rename_card_by_id(card_id, card_title)


@app.route("/api/delete-board-by-id/<int:board_id>",methods=["GET","POST"])
@json_response
def delete_boards(board_id):
    queries.delete_all_cards_by_board_id(board_id)
    queries.delete_all_statuses_by_board_id(board_id)
    queries.delete_board_by_id(board_id)


@app.route("/api/new-card/<board_id>", methods=["post"])
@json_response
def create_new_card(board_id):
    status_id = 1;
    title = "NewCard"

    queries.create_card(board_id, status_id, title, dict(queries.card_order_in_board(board_id))['number'])


@app.route("/api/delete-card/<card_id>", methods=["post"])
@json_response
def delete_card(card_id):
    queries.delete_all_cards_by_card_id(card_id)


@app.route('/api/delete-status/<status_id>', methods=['POST'])
@json_response
def delete_status(status_id):
    queries.delete_status_by_id(status_id)


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule(
            "/favicon.ico",
            redirect_to=url_for("static", filename="favicon/favicon.ico"),
        )


if __name__ == "__main__":
    main()
