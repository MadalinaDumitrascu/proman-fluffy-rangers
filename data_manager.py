import os
import psycopg2
import psycopg2.extras
from dotenv import load_dotenv

load_dotenv()

def establish_connection(connection_data=None):
    if connection_data is None:
        # connection_data = get_connection_data()
        connection_data = os.getenv("HEROKU_DB")
    try:
        connect_str = "dbname={} user={} host={} password={}".format(
            connection_data["dbname"],
            connection_data["user"],
            connection_data["host"],
            connection_data["password"],
        )
        conn = psycopg2.connect(connect_str)
        conn.autocommit = True
    except psycopg2.DatabaseError as e:
        print("Cannot connect to database.")
        print(e)
    else:
        return conn


def get_connection_data(db_name=None):
    if db_name is None:
        db_name = os.environ.get("MY_PSQL_DBNAME")

    return {
        "dbname": db_name,
        "user": os.environ.get("MY_PSQL_USER"),
        "host": os.environ.get("MY_PSQL_HOST"),
        "password": os.environ.get("MY_PSQL_PASSWORD"),
    }


def execute_select(statement, variables=None, fetchall=True):
    with establish_connection() as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
            cursor.execute(statement, variables)
            result_set = cursor.fetchall() if fetchall else cursor.fetchone()
            print(cursor.query.decode("utf-8"))
    return result_set


def execute_insert(statement, variables=None):
    with establish_connection() as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
            cursor.execute(statement, variables)
