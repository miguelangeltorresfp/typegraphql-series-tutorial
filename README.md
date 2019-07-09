# TYPE GRAPHQL SERIES TUTORIAL BY BEN AWAD

[youtube-link](https://www.youtube.com/watch?v=8yZImm2A1KE&list=PLN3n1USn4xlma1bBu3Tloe4NyYn9Ko8Gs)

## PART 0 - SETUP

* `yarn init -y`

* Install dependencies - `yarn add apollo-server-express express graphql reflect-metadata type-graphql`

* Install dev dependencies - `yarn add -D @types/express @types/graphql @types/node ts-node-dev typescript`

* Add tsconfig.json - `tsc --init`
  * Copy tsconfig.json from `https://github.com/benawad/monorepo-boilerplate/blob/master/packages/server/tsconfig.json`
  * Remove monorepo reference

* Create `src/index.ts`

* Create a basic apollo ( express ) graphql server with a "hello world" resolver

# PART 1 - REGISTER RESOLVER

* Install typeorm - `yarn add pg typeorm bcryptjs`
  * pg is for postgres
  * bcryptjs for encrypting passwords
  
* Add dev dependencies types for bcryptjs - `yarn add -D @types/bcryptjs`

* Create a ormconfig.json file and create the connection on the main

```bash
{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "postgres",
  "password": "",
  "database": "typegraphql-example",
  "synchronize": true,
  "logging": true,
  "entities": ["src/entity/*.*"]
}
```

```bash
const main = async () => {
  await createConnection();
}
```

* Create de User entity
  * extends BaseEntity nos permite usar métodos como find o create

```bash
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column("text", { unique: true })
  email: string;

  @Column()
  password: string;
}
```

* Create a resolver mutation in order to be able to create an user

* Para poder usar los tipos definidos en las entidades dentro del esquema de GraphQL tenemos que añadir un decorador especial - @ObjectType
  * El decorador @Field indica que ese valor estará disponible para obtenerse mediante queries
  * Password is a database field but it's not a graphql field
  * También podemos tener un campo que solo sea incluido en el esquema de graphql, por ejemplo "name"

```bash
@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column("text", { unique: true })
  email: string;

  @Field()
  name: string;

  @Column()
  password: string;
}
````

* Podemos crear un resolver para este campo:

```bash
  @FieldResolver()
  async name(@Root() parent: User) {
    return `${parent.firstName} ${parent.lastName}`;
  }
```
