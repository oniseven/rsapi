import * as bcrypt from "bcrypt";
import { Sequelize } from "sequelize";
import {
  AllowNull,
  BeforeCreate,
  BeforeUpdate,
  Column,
  DataType,
  Default,
  HasOne,
  Model,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import { UserProfile } from "./UserProfile";

const SALTROUNDS = process.env.SALTROUNDS || 10;

@Table({
  tableName: "users",
})
export class Users extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.STRING(30),
  })
  "phone": string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(30),
  })
  "formatted_phone": string;

  @AllowNull(false)
  @Column({
    type: DataType.TEXT,
  })
  "password": string;

  @AllowNull(false)
  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  "is_verified": boolean;

  @AllowNull(false)
  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
  })
  "is_active": boolean;

  @AllowNull(false)
  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
  })
  "term_service_agreement": boolean;

  @Column({
    type: DataType.DATE,
  })
  "last_login": Date;

  @UpdatedAt
  @AllowNull(false)
  @Default(Sequelize.fn("CURRENT_TIMESTAMP"))
  @Column({
    type: DataType.DATE,
  })
  "updated_at": Date;

  @Default(Sequelize.fn("CURRENT_TIMESTAMP"))
  @Column({
    type: DataType.DATE,
  })
  "created_at": Date;

  @BeforeCreate
  static async hashPassword(instance: Users) {
    const salt = await bcrypt.genSalt(+SALTROUNDS);
    instance.password = await bcrypt.hash(instance.password, salt);
  }

  @BeforeUpdate
  static async hashPasswordIfChange(instance: Users) {
    if(instance.changed('password')){
      const salt = await bcrypt.genSalt(+SALTROUNDS);
      instance.password = await bcrypt.hash(instance.password, salt);
    }
  }

  @BeforeUpdate
  static updateTimestamp(instance: Users) {
    instance.updated_at = new Date();
  }

  @HasOne(() => UserProfile, { foreignKey: 'user_id' })
  "profile": UserProfile;
}
