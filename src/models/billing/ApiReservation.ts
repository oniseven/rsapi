import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  Model,
  Sequelize,
  Table,
} from "sequelize-typescript";
import { Unit } from "./master/Unit";
import { Pegawai } from "./master/Pegawai";

@Table({
  tableName: "api_reservations",
})
export class ApiReservation extends Model {
  @Column({
    type: DataType.TEXT,
  })
  "raw_request": string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(45),
  })
  "bpjs_cardno": string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(45),
  })
  "idcard_number": string;

  @Column({
    type: DataType.STRING(45),
  })
  "contact": string;

  @AllowNull(false)
  @Column({
    type: DataType.DATEONLY,
  })
  "service_date": Date;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(5),
  })
  "unit_code": string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(100),
  })
  "reff_number": string;

  @AllowNull(false)
  @Default("1")
  @Column({
    type: DataType.ENUM("1", "2"),
  })
  "reff_type": string;

  @AllowNull(false)
  @Default("1")
  @Column({
    type: DataType.ENUM("1", "2"),
  })
  "request_type": string;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.TINYINT,
  })
  "is_executive": number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(20),
  })
  "booking_code": number;

  @AllowNull(false)
  @Column({
    type: DataType.BIGINT,
  })
  "patient_id": number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER.UNSIGNED.ZEROFILL,
  })
  "norm": number;

  @AllowNull(false)
  @Column({
    type: DataType.BIGINT,
  })
  "kso_id": number;

  @AllowNull(false)
  @Column({
    type: DataType.BIGINT,
  })
  "unit_id": number;

  @Column({
    type: DataType.BIGINT,
  })
  "doctor_id": number;

  @Column({
    type: DataType.BIGINT,
  })
  "doctor_schedule_id": number;

  @Column({
    type: DataType.STRING(18),
  })
  "doctor_schedule_hours": string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(18),
  })
  "username": string;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.TINYINT({ length: 1 }),
  })
  "check_in": number;

  @Column({
    type: DataType.DATE,
  })
  "check_in_at": Date;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.TINYINT({ length: 1 }),
  })
  "is_cancel": number;

  @Column({
    type: DataType.TEXT,
  })
  "cancel_desc": number;

  @Column({
    type: DataType.DATE,
  })
  "cancel_at": Date;

  @AllowNull(false)
  @Column({
    type: DataType.BIGINT,
  })
  "created_by": number;

  @AllowNull(false)
  @Default(Sequelize.literal("NOW()"))
  @Column({
    type: DataType.DATE,
  })
  "created_at": Date;

  @AllowNull(false)
  @Default(Sequelize.literal("CURRENT_TIMESTAMP()"))
  @Column({
    type: DataType.DATE,
  })
  "updated_at": Date;

  @BelongsTo(() => Unit, {
    foreignKey: "unit_id",
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  "unit": Unit;

  @BelongsTo(() => Pegawai, {
    foreignKey: "doctor_id",
    onDelete: "RESTRICT",
    onUpdate: "CASCADE"
  })
  "pegawai": Pegawai;
}
