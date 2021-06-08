import { v4 as uuidV4 } from "uuid";
import { hash } from "bcrypt";
import createConnection from "../index";

async function create() {
    const connection = await createConnection();

    await connection.query(
        "INSERT INTO user (id, name, document, cellphone, email, password, is_admin, is_confirmed) " +
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
        [
            "ba8e4a63-9a01-4bc9-aef9-1e0793bb2548",
            "Admin",
            "",
            "",
            "caiosduarte@yahoo.com.br",
            await hash("root", 8),
            true,
            true,
        ]
    );

    await connection.query(
        "INSERT INTO user (id, name, document, cellphone, email, password, is_admin, is_confirmed) " +
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
        [
            "ff9bf59a-70dc-4a80-a4b1-144fadfa8209",
            "Caio Duarte",
            "01351676636",
            "31984227833",
            "caiosduarte@gmail.com",
            await hash("password123", 8),
            false,
            true,
        ]
    );

    await connection.query(
        "INSERT INTO person (id, name, is_valid) " + "VALUES (?, ?, ?);",
        ["ff9bf59a-70dc-4a80-a4b1-144fadfa8209", "Caio Duarte", false]
    );

    await connection.close();
}

create().then(() =>
    console.log(
        "User Admin, user Caio Duarte and person Caio Duarte were created!"
    )
);
