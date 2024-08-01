import {
  AllowNull,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";

@Table({
  tableName: "api_users",
})
export class ApiUser extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.STRING({ length: 180 }),
  })
  "name": string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING({ length: 20 }),
  })
  "username": string;

  @AllowNull(false)
  @Column({
    type: DataType.TEXT,
  })
  "password": string;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  "insurance_id": number;

  @AllowNull(false)
  @Column({
    type: DataType.TINYINT({ length: 1 }),
  })
  "is_active": number;

  @Column({
    type: DataType.DATE,
  })
  "last_login": Date;

  @Column({
    type: DataType.TEXT,
  })
  "last_jwt": string;
}
