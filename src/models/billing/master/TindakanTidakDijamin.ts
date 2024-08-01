import { AllowNull, Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "b_ms_tindakan_tdk_jamin"
})
export class TindakanTidakDijamin extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER
  })
  'b_ms_tindakan_id': number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER
  })
  'b_ms_kso_id': number;
}