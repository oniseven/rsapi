import { AllowNull, Column, DataType, Default, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: 'ms_libur'
})
export class Libur extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  "ms_libur_id": number;

  @Column({
    type: DataType.STRING
  })
  "ms_libur_thn": string;

  @Column({
    type: DataType.DATEONLY
  })
  "ms_libur_tgl": string;

  @Column({
    type: DataType.TEXT
  })
  "ms_libur_ket": string;

  @AllowNull(false)
  @Default(1)
  @Column({
    type: DataType.TINYINT({length: 1})
  })
  "ms_libur_aktif": number;

  @Column({
    type: DataType.TINYINT()
  })
  "flag": number;
}