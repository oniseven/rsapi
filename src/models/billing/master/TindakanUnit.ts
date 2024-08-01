import { AllowNull, BelongsTo, Column, DataType, Default, HasMany, Model, Table } from "sequelize-typescript";
import { TindakanKelas } from "./TindakanKelas";
import { Unit } from "./Unit";
import { Tindakan } from "../Tindakan";

@Table({
  tableName: 'b_ms_tindakan_unit'
})
export class TindakanUnit extends Model {
  @AllowNull(true)
  @Column({
    type: DataType.STRING({length: 30})
  })
  'kode': string;

  @AllowNull(false)
  @Column({
    type: DataType.BIGINT
  })
  'ms_tindakan_kelas_id': number;

  @AllowNull(true)
  @Column({
    type: DataType.STRING({length: 30})
  })
  'kode_tindakan': string;

  @AllowNull(false)
  @Column({
    type: DataType.BIGINT
  })
  'ms_unit_id': number;

  @AllowNull(true)
  @Column({
    type: DataType.STRING({length: 30})
  })
  'kode_unit': string;

  @AllowNull(false)
  @Default(1)
  @Column({
    type: DataType.TINYINT({length: 1}).UNSIGNED
  })
  'aktif': number;

  @BelongsTo(() => TindakanKelas, {foreignKey: 'ms_tindakan_kelas_id', onDelete: 'RESTRICT', onUpdate: 'CASCADE'})
  'tindakanKelas': TindakanKelas;

  @BelongsTo(() => Unit, {foreignKey: 'ms_unit_id', onDelete: 'RESTRICT', onUpdate: 'CASCADE'})
  'unit': Unit;

  @HasMany(() => Tindakan, { foreignKey: 'ms_tindakan_unit_id' })
  'tindakans': Tindakan[];
}