import { AllowNull, Column, DataType, Default, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "b_ms_kso_luar_paket"
})
export class TindakanKsoLuarPaket extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER
  })
  'kso_id': number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER
  })
  'ms_tindakan_id': number;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.DOUBLE
  })
  'nilai': number;
}