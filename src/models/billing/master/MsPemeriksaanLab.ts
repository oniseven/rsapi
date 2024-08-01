import { AllowNull, Column, DataType, Default, HasMany, Model, Table } from "sequelize-typescript";
import { MsNormalLab } from "./MsNormalLab";

@Table({
  tableName: 'b_ms_pemeriksaan_lab'
})
export class MsPemeriksaanLab extends Model {
  @Column({
    type: DataType.INTEGER
  })
  'kelompok_lab_id': number;

  @Column({
    type: DataType.INTEGER
  })
  'tes_no': number;

  @Column({
    type: DataType.INTEGER
  })
  'tes_no2': number;

  @Column({
    type: DataType.INTEGER
  })
  'tes_no3': number;

  @Column({
    type: DataType.STRING({length: 15})
  })
  'kode': string;

  @Column({
    type: DataType.INTEGER
  })
  'kode_urut': number;

  @Column({
    type: DataType.STRING({length: 75})
  })
  'nama': string;

  @AllowNull(false)
  @Default(1)
  @Column({
    type: DataType.TINYINT({length: 1})
  })
  'entry_by_group': number;

  @AllowNull(false)
  @Default(1)
  @Column({
    type: DataType.TINYINT({length: 1})
  })
  'aktif': number;
  
  @HasMany(() => MsNormalLab, { foreignKey: 'id_pemeriksaan_lab' })
  'masterNormalLabs': MsNormalLab[];
}