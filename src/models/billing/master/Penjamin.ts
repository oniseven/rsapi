import { AllowNull, Column, DataType, Default, Model, Table } from "sequelize-typescript";

@Table({
  tableName: 'b_ms_kso'
})
export class Penjamin extends Model {
  @AllowNull(true)
  @Column({
    type: DataType.STRING({length: 7})
  })
  'kode': string;

  @AllowNull(true)
  @Column({
    type: DataType.STRING({length: 100})
  })
  'nama': string;

  @AllowNull(false)
  @Default(1)
  @Column({
    type: DataType.TINYINT({length: 1})
  })
  'aktif': number;

  @AllowNull(true)
  @Column({
    type: DataType.DOUBLE
  })
  'diskon': number;

  @AllowNull(false)
  @Default(1)
  @Column({
    type: DataType.TINYINT({length: 1})
  })
  'kel_tarip': number;
}