import { AllowNull, Column, DataType, Default, Model, Table } from "sequelize-typescript";

@Table({
  tableName: 'autobill'
})
export class Autobill extends Model {
  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.BIGINT
  })
  'kso_id': number;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.BIGINT
  })
  'unit_id': number;

  @AllowNull(false)
  @Default(0) 
  @Column({
    type: DataType.BIGINT
  })
  'dokter_id': number;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.BIGINT
  })
  'tindakan_id': number;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.BIGINT
  })
  'tipe_tindakan': number;
}