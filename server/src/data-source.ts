import { DataSource } from "typeorm";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const pgDataSource = new DataSource({
    type: "postgres",
    host: process.env['PGHOST']!,
    port: 5432,
    username: process.env['PGUSER']!,
    password: process.env['PGPASSWORD']!,
    database: process.env['PGDATABASE']!,
    entities: [__dirname + "/entities/**/*{.js,.ts}"],
    logging: true,
    synchronize: true,
})