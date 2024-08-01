import { Sequelize } from "sequelize";
import {
  AllowNull,
  BeforeUpdate,
  BelongsTo,
  Column,
  DataType,
  Default,
  Model,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import { Users } from "./Users";

@Table({
  tableName: "user_profile",
})
export class UserProfile extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.BIGINT,
  })
  "user_id": number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  "fullname": string;

  @Column({
    type: DataType.DATEONLY,
  })
  "birthdate": Date;

  @Column({
    type: DataType.TEXT,
  })
  "picture": string;

  @Column({
    type: DataType.ENUM("M", "F"),
  })
  "sex": "M" | "F";

  @UpdatedAt
  @AllowNull(false)
  @Default(Sequelize.fn("CURRENT_TIMESTAMP"))
  @Column({
    type: DataType.DATE,
  })
  "updated_at": Date;

  @BeforeUpdate
  static updateTimestamp(instance: UserProfile) {
    instance.updated_at = new Date();
  }

  @BelongsTo(() => Users, {
    foreignKey: "user_id",
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  "user": Users;
}
