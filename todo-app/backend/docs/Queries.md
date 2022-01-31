**User Find**

```graphql
query USER(id: ID!) {
  user(id: $id) {
    id
  }
}
```

**Variables**

```shell
{
    id:11
}
```

**Users**

```graphql
{
  users {
    id
    email
    phone
    status
    name {
      first
      last
      name
    }
  }
}
```

**Permission find**

```graphql
query PERMISSION($id: ID!) {
  permission(id: $id) {
    id
    name
    description
  }
}
```

**Variables**

```shell
{
    id:1
}
```

**Permissions**

```graphql
{
  permissions {
    id
    name
    description
  }
}
```

**Role Find**

```graphql
query Role($id: ID!) {
  role(id: $id) {
    id
    name
    description
    status
  }
}
```

**Variables**

```shell
{
    id:1
}
```

**Roles**

```graphql
{
  roles {
    id
    name
    description
    status
  }
}
```
