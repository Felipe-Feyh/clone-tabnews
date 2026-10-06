import database from "infra/database.js";
import { NotFoundError } from "infra/errors.js";

async function create(userInputValues) {
  const results = await database.query({
    text: `
        INSERT INTO
            users (username, email, password)
        VALUES
            ($1, $2, $3)
        RETURNING
            id, username, email, created_at, updated_at
        ;`,
    values: [
      userInputValues.username,
      userInputValues.email,
      userInputValues.password,
    ],
  });
  return results.rows[0];
}

async function findOneByUserName(username) {
  const results = await database.query({
    text: `
            SELECT id, username, created_at, updated_at
            FROM users
            WHERE LOWER(username) = LOWER($1);
        `,
    values: [username],
  });

  if (results.rowCount === 0) {
    throw new NotFoundError({
      message: "O username informado não foi encontrado no sistema.",
      action: "Verifique se o username está digitado corretamente.",
    });
  }

  return {
    ...results.rows[0],
    features: ["read:activation_token"],
  };
}

const user = {
  create,
  findOneByUserName,
};

export default user;
