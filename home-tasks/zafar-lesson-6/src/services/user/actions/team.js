const config = require("../../../../knexfile"),
  Knex = require("knex"),
  knex = Knex(config.development);

class Team {
  async list(_, __, context, root) {
    const teams = await knex("teams");
    const users = await knex("users");
    const result = teams.map((team) => {
      return {
        id: team.id,
        name: team.name,
        description: team.description,
        user: users.find((user) => user.id === team.user_id),
        status: team.status,
        created_at: team.created_at,
      };
    });
    return result;
  }

  async find(_, { id }, context, root) {
    const team = await knex("teams").where({ id }).first();
    if (!team) {
      throw new Error("Team not found");
    }
    const user = await knex("users").where({ id: team.user_id }).first();
    return {
      id: team.id,
      name: team.name,
      description: team.description,
      user: user,
      status: team.status,
      created_at: team.created_at,
    };
  }

  async create(_, { input }, context, root) {
    const newTeam = {
      user_id: input.userId,
      name: input.name,
      description: input.description,
      status: input.status,
    };
    return knex.insert(newTeam).into("teams");
  }

  async update(_, { id, input }, context, root) {
    const team = await knex("teams").where({ id: id }).first();
    console.log(team);
    if (!team) {
      throw new Error("Team not found");
    }
    try {
      await knex("teams")
        .update({
          user_id: input.userId || team.user_id,
          name: input.name || team.name,
          description: input.description || team.description,
          status: input.status || team.status,
        })
        .where({ id: id });
    } catch (e) {
      throw new Error(e);
    }

    const team1 = await knex("teams").where({ id }).first();
    const user = await knex("users").where({ id: team1.user_id }).first();
    return {
      id: team1.id,
      name: team1.name,
      description: team1.description,
      user: user,
      status: team1.status,
      created_at: team1.created_at,
    };
  }

  async delete(_, { id }, context, root) {
    const team = await knex("teams").where({ id }).first();
    if (!team) {
      throw new Error("Team not found");
    }
    try {
      await knex("teams").delete().where({ id });
    } catch (e) {
      throw new Error(e);
    }
    return true;
  }
}

module.exports = new Team();
