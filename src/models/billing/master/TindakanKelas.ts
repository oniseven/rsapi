import { AllowNull, BelongsTo, Column, DataType, Default, HasMany, Model, Table } from "sequelize-typescript";
import { Tindakan } from "../Tindakan";
import { TindakanUnit } from "./TindakanUnit";
import { MsTindakan } from "./MsTindakan";

@Table({
  tableName: 'b_ms_tindakan_kelas',
})
export class TindakanKelas extends Model {
  @AllowNull(true)
  @Column({
    type: DataType.STRING({length: 30})
  })
  'kode': string;

  @AllowNull(false)
  @Column({
    type: DataType.BIGINT
  })
  'ms_tindakan_id': number;

  @AllowNull(true)
  @Column({
    type: DataType.STRING({length: 30})
  })
  'kode_tindakan': string;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER
  })
  'ms_kelas_id': number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING({length: 30})
  })
  'kode_kelas': string;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.TINYINT({length: 1}).UNSIGNED
  })
  'kategori': number;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.DOUBLE
  })
  'tarip_2011': number;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.DOUBLE
  })
  'tarip': number;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.DOUBLE
  })
  'tarip_askes': number;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.DOUBLE
  })
  'tarip_jamsostek': number;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.TINYINT({length:1}).UNSIGNED
  })
  'st_harian': number;

  @AllowNull(false)
  @Column({
    type: DataType.BIGINT
  })
  'user_act': number;
  
  @AllowNull(false)
  @Default(1)
  @Column({
    type: DataType.TINYINT({length:1}).UNSIGNED
  })
  'aktif': number;

  @BelongsTo(() => MsTindakan, {foreignKey: 'ms_tindakan_id', onDelete: 'RESTRICT', onUpdate: 'CASCADE'})
  'masterTindakan': MsTindakan;

  @HasMany(() => Tindakan, { foreignKey: 'ms_tindakan_kelas_id' })
  'tindakans': Tindakan[];

  @HasMany(() => TindakanUnit, {foreignKey: 'ms_tindakan_kelas_id'})
  'tindakanUnits': TindakanUnit[];
}