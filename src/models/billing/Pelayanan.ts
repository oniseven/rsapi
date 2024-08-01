import { AllowNull, BelongsTo, Column, DataType, Default, HasMany, Model, Sequelize, Table } from "sequelize-typescript";
import { Pasien } from "./master/Pasien";
import { Kunjungan } from "./Kunjungan";
import { SuratKontrol } from "./SuratKontrol";
import { Unit } from "./master/Unit";
import { TindakanKamar } from "./TindakanKamar";

@Table({
  tableName: 'b_pelayanan'
})
export class Pelayanan extends Model {
  @Column({
    type: DataType.INTEGER
  })
  'no_antrian': number;

  @Column({
    type: DataType.CHAR
  })
  'kode_antrian': string;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.INTEGER
  })
  'jenis_kunjungan': number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER
  })
  'pasien_id': number;

  @AllowNull(false)
  @Column({
    type: DataType.BIGINT
  })
  'kunjungan_id': number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER
  })
  'jenis_layanan': number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER
  })
  'unit_id': number;

  @AllowNull(true)
  @Column({
    type: DataType.INTEGER
  })
  'unit_id_asal': number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER
  })
  'kso_id': number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER
  })
  'kelas_id': number;

  @AllowNull(false)
  @Column({
    type: DataType.DATEONLY
  })
  'tgl': string;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.INTEGER
  })
  'dilayani': number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER
  })
  'dokter_id': number;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.INTEGER
  })
  'type_dokter': number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER
  })
  'dokter_tujuan_id': number;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.INTEGER
  })
  'type_dokter_tujuan': number;

  @AllowNull(false)
  @Default(DataType.NOW)
  @Column({
    type: DataType.DATE
  })
  'tgl_act': string;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER
  })
  'user_act': number;

  @Column({
    type: 'TIMESTAMP'
  })
  'tgl_dilayani': string;

  @BelongsTo(() => Pasien, { foreignKey: 'pasien_id', onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  'pasien': Pasien;

  @BelongsTo(() => Kunjungan, { foreignKey: 'kunjungan_id', onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  'kunjungan': Kunjungan;

  @BelongsTo(() => Unit, { foreignKey: 'unit_id', onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  'unit': Unit;

  @HasMany(() => SuratKontrol, { foreignKey: 'pelayanan_id' })
  'surat_kontrols': SuratKontrol[];

  @HasMany(() => TindakanKamar, { foreignKey: 'pelayanan_id' })
  'tindakan_kamars': TindakanKamar[];
}