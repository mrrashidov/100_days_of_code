function rolePermissionsBuilder(count, roleCount, rcFirst, notIn = []) {
  const items = [];
  for (let rc = rcFirst; rc <= roleCount; rc++) {
    for (let i = 1; i < count; i++) {
      if (notIn && notIn.includes(i)) continue;
      items.push({
        role_id: rc,
        permission_id: i,
      });
    }
  }
  return items;
}
const superAdmin = rolePermissionsBuilder(17, 1, 1);
exports.seed = async (knex) =>
  await knex("role_permissions")
    .del()
    .then(async () => await knex("role_permissions").insert([...superAdmin]));
