import { AllowNull, Column, DataType, Default, Model, Table } from "sequelize-typescript";

@Table({
  tableName: 'b_hasil_lab'
})
export class HasilLab extends Model {
  @Column({
    type: DataType.STRING
  })
  'no_lab': string;

  @AllowNull(false)
  @Column({
    type: DataType.BIGINT
  })
  'id_pelayanan': number;

  @AllowNull(false)
  @Column({
    type: DataType.BIGINT
  })
  'id_kunjungan': number;

  @AllowNull(false)
  @Column({
    type: DataType.BIGINT
  })
  'id_tindakan': number;

  @AllowNull(false)
  @Column({
    type: DataType.BIGINT
  })
  'id_normal': number;

  @Column({
    type: DataType.TEXT
  })
  'hasil': string;

  @Column({
    type: DataType.STRING({length: 100})
  })
  'ket': string;

  @Column({
    type: 'TIMESTAMP'
  })
  'tgl_act': string;

  @AllowNull(false)
  @Column({
    type: DataType.BIGINT
  })
  'user_act': number;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.TINYINT({length: 1})
  })
  'type_user': number;

  @Column({
    type: DataType.TEXT
  })
  'satuan_lab': string;

  @Column({
    type: DataType.TEXT
  })
  'normal_lab': string;
}