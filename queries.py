import data_manager


def get_card_status(status_id):
    status = data_manager.execute_select(
        """
        SELECT * FROM statuses s
        WHERE s.id = %(status_id)s
        ;
        """,
        {"status_id": status_id},
    )
    return status


def add_column_to_board(title, board_id):
    return data_manager.execute_insert(
        """
        INSERT INTO statuses (title,board_id)
        values (%(title)s,%(board_id)s)
        """, {"title": title, "board_id": board_id}

    )


def get_boards_id(username='public'):
    return data_manager.execute_select(
        """
        SELECT * FROM boards
        WHERE username = %(username)s OR username = 'public'
        ;
        """,
        variables={"username": username}
    )


def rename_board_by_id(id, board_title):
    return data_manager.execute_insert(
        """
            UPDATE boards
            SET title = %(board_title)s  WHERE id = %(id)s
        """, {'board_title': board_title, 'id': id})


def rename_card_by_id(card_id, card_title):
    return data_manager.execute_insert(
        """
            UPDATE cards
            SET title = %(card_title)s  WHERE id = %(card_id)s
        """, {'card_title': card_title, 'card_id': card_id})


def create_board(title, username):
    return data_manager.execute_select(
        """
        insert into boards (title,username)
        values(%(title)s,%(username)s) returning id;
        """, {'title': title,
              "username": username}, False
    )


def get_cards_for_board(board_id):
    matching_cards = data_manager.execute_select(
        """
        SELECT * FROM cards
        WHERE cards.board_id = %(board_id)s
        ;
        """,
        {"board_id": board_id},
    )
    return matching_cards


def add_card(board_id, order_number):
    return data_manager.execute_insert(
        """
        insert into cards (board_id, status_id, title, card_order)
        values(%(board_id)s, 1, 'New card', %(order_number)s)
        """,
        {"board_id": board_id, "order_number": order_number},
    )


def get_order_number(board_id, status_id):
    return data_manager.execute_select(
        """
        select count(card_order) as order_id from cards where status_id = %(status_id)s and board_id = %(board_id)s
        """,
        {"board_id": board_id, "status_id": status_id},
    )


def list_users():
    return data_manager.execute_select("""SELECT * FROM users""")


def add_user(username, password, email):
    return data_manager.execute_select(
        """
        INSERT INTO users (username,  password, email)
        VALUES (%(username)s, %(password)s, %(email)s)
        returning id;
        """,
        {"username": username, "password": password, "email": email, },
        False,
    )


def get_statuses(board_id):
    return data_manager.execute_select(
        """
        select * from statuses where board_id = %(board_id)s
        """,
        {"board_id": board_id},
    )


def get_status(title, board_id):
    return data_manager.execute_insert(
        """
        INSERT INTO statuses (title, board_id)
        VALUES (%(title)s, %(board_id)s)
        """,
        {"title": title, "board_id": board_id},
    )


def create_card(board_id, status_id, title, card_order):
    return data_manager.execute_insert(
        """
            insert into cards (board_id,status_id,title,card_order)
            values (%(board_id)s,%(status_id)s,%(title)s,%(card_order)s)
        """,
        {"board_id": board_id, "status_id": status_id, "title": title, "card_order": card_order}
    )


def card_order_in_board(board_id):
    return data_manager.execute_select('''
        select count(status_id)+1 as number from cards where board_id = %(board_id)s and cards.status_id = 1
    ''', {'board_id': board_id}, False)


def get_user(email_or_name):
    return data_manager.execute_select(
        """
    select * from users where username = %(email_or_name)s """,
        {"email_or_name": email_or_name}, False)


def delete_all_cards_by_board_id(board_id):
    return data_manager.execute_insert(
        """
        DELETE FROM cards WHERE board_id = %(board_id)s
        """, {"board_id": board_id}
    )


def delete_all_cards_by_card_id(card_id):
    return data_manager.execute_insert(
        """
        DELETE FROM cards WHERE id = %(card_id)s
        """, {"card_id": card_id}
    )


def delete_all_statuses_by_board_id(board_id):
    return data_manager.execute_insert(
        """
            DELETE FROM statuses 
            WHERE board_id = %(board_id)s
        """, {"board_id": board_id}
    )


def delete_board_by_id(board_id):
    return data_manager.execute_insert(
        """
            DELETE FROM boards 
            WHERE id = %(board_id)s
        """, {"board_id": board_id}
    )


def rename_column(column_title, id):
    return data_manager.execute_insert(
        """UPDATE statuses SET title = %(column_title)s WHERE id = %(id)s""",
        {'column_title': column_title, 'id': id})


def delete_status_by_id(status_id):
    return data_manager.execute_insert(
        '''
            delete from statuses
            where id = %(status_id)s
        ''',
        {'status_id': status_id})
