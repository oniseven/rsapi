import {
  AllowNull,
  Column,
  DataType,
  Default,
  HasMany,
  HasOne,
  Model,
  Table,
  Validate,
} from "sequelize-typescript";
import { TindakanUnit } from "./TindakanUnit";
import { Pelayanan } from "../Pelayanan";
import { ApiReservation } from "../ApiReservation";
import { encrypt } from "../../../utils/EncryptionUtils";

@Table({
  tableName: "b_ms_unit",
})
export class Unit extends Model {
  @AllowNull(true)
  @Column({
    type: DataType.INTEGER,
  })
  "parent_id": number;

  @AllowNull(true)
  @Validate({
    max: 8,
  })
  @Column({
    type: DataType.STRING,
  })
  "kode": string;

  @AllowNull(true)
  @Validate({
    max: 5,
  })
  @Column({
    type: DataType.STRING,
  })
  "kodeAskes": string;

  @AllowNull(true)
  @Column({
    type: DataType.STRING,
  })
  "nama": string;

  @AllowNull(false)
  @Default(1)
  @Column({
    type: DataType.TINYINT({ length: 1 }).UNSIGNED,
  })
  "inap": number;

  @AllowNull(false)
  @Default(1)
  @Column({
    type: DataType.TINYINT({ length: 1 }).UNSIGNED,
  })
  "penunjang": number;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.TINYINT({ length: 1 }).UNSIGNED,
  })
  "is_jkn": number;

  @AllowNull(true)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  "jkn_dokter": number;

  @AllowNull(false)
  @Default(1)
  @Column({
    type: DataType.TINYINT({ length: 1 }).UNSIGNED,
  })
  "aktif": number;

  @HasMany(() => TindakanUnit, { foreignKey: "ms_unit_id" })
  "tindakanUnits": TindakanUnit[];

  @HasMany(() => Pelayanan, { foreignKey: "unit_id" })
  "pelayanans": Pelayanan[];

  @HasMany(() => ApiReservation, { foreignKey: "unit_id" })
  "apiReservasis": ApiReservation[];

  @Column({
    type: DataType.VIRTUAL,
    get(this: Unit) {
      return encrypt(this.id.toString())
    }
  })
  "encryptedID": string;

  // get encryptedID(): string {
  //   return encrypt(this.id);
  // }
}
