import { AllowNull, BelongsTo, Column, DataType, Default, Model, Table } from "sequelize-typescript";
import { MsPemeriksaanLab } from "./MsPemeriksaanLab";

@Table({
  tableName: 'b_ms_normal_lab'
})
export class MsNormalLab extends Model {
  @Column({
    type: DataType.BIGINT.UNSIGNED
  })
  'id_pemeriksaan_lab': number;

  @Column({
    type: DataType.SMALLINT({length: 2})
  })
  'id_satuan': number;

  @Column({
    type: DataType.CHAR(1)
  })
  'lp': string;

  @Column({
    type: DataType.TEXT
  })
  'normal1': string;

  @Column({
    type: DataType.TEXT
  })
  'normal2': string;

  @Column({
    type: DataType.STRING(30)
  })
  'metode': string;

  @Column({
    type: DataType.STRING(50)
  })
  'ket': string;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.TINYINT({length: 1})
  })
  'type': number;

  @Column({
    type: DataType.INTEGER
  })
  'batas_bawah': number;

  @Column({
    type: DataType.STRING(10)
  })
  'batas_bawah_type': string;

  @Column({
    type: DataType.INTEGER
  })
  'batas_atas': number;

  @Column({
    type: DataType.STRING(10)
  })
  'batas_atas_type': string;

  @BelongsTo(() => MsPemeriksaanLab, { foreignKey: 'id_pemeriksaan_lab', onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  'masterPemeriksaanLab': MsPemeriksaanLab;
}