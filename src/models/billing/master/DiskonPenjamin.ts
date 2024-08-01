import { AllowNull, Column, DataType, Default, Model, Table } from "sequelize-typescript";

@Table({
  tableName: 'b_ms_kso_diskon'
})
export class DiskonPenjamin extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER
  })
  'kso_id': number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER
  })
  'diskon_id': number;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.DOUBLE
  })
  'diskon': number
}