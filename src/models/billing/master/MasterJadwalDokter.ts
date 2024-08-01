import { AllowNull, BelongsTo, Column, DataType, Default, Model, Table } from "sequelize-typescript";
import { Pegawai } from "./Pegawai";

@Table({
  tableName: 'b_ms_jadwal_dokter'
})
export class MasterJadwalDokter extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.BIGINT
  })
  'unit_id': number;

  @AllowNull(false)
  @Column({
    type: DataType.BIGINT
  })
  'dokter_id': number;

  @AllowNull(false)
  @Column({
    type: DataType.TINYINT({length: 2, unsigned: true})
  })
  'hari': number;

  @AllowNull(false)
  @Column({
    type: DataType.TIME
  })
  'mulai': number;

  @AllowNull(false)
  @Column({
    type: DataType.TIME
  })
  'selesai': number;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.INTEGER({unsigned: true}),
    defaultValue: 0
  })
  'kuota': number;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.ENUM("0", "1"),
    defaultValue: 0
  })
  'waktu_poli': number;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.TINYINT({length: 1, unsigned: true}),
    defaultValue: 0
  })
  'is_bpjs': number;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.TINYINT({length: 1, unsigned: true}),
    defaultValue: 0
  })
  'is_pm_ol': number;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.INTEGER({unsigned: true}),
    defaultValue: 0
  })
  'kuota_bpjs_pm': number;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.INTEGER({unsigned: true}),
    defaultValue: 0
  })
  'kuota_asuransi_pm': number;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.INTEGER({unsigned: true}),
    defaultValue: 0
  })
  'kuota_umum_pm': number;

  @AllowNull(false)
  @Default(1)
  @Column({
    type: DataType.TINYINT({length: 1, unsigned: true}),
    defaultValue: 1
  })
  'aktif': number;

  @BelongsTo(() => Pegawai, { foreignKey: 'dokter_id', onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  'pegawai': Pegawai;
}