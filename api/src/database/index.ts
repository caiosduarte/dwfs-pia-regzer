import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (host = "database"): Promise<Connection> => {
    const options = await getConnectionOptions();

    return createConnection(
        Object.assign(options, {
            //host,
        })
    );
};
