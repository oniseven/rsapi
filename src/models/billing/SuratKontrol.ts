import { AllowNull, BelongsTo, Column, DataType, Default, Model, Table } from "sequelize-typescript";
import { Pasien } from "./master/Pasien";
import { Kunjungan } from "./Kunjungan";
import { Pelayanan } from "./Pelayanan";

@Table({
  tableName: 'surat_kontrol'
})
export class SuratKontrol extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.BIGINT
  })
  'kunjungan_id': number;

  @AllowNull(false)
  @Column({
    type: DataType.BIGINT
  })
  'pelayanan_id': number;

  @AllowNull(false)
  @Column({
    type: DataType.BIGINT
  })
  'pasien_id': number;

  @AllowNull(false)
  @Column({
    type: DataType.DATEONLY
  })
  'tgl': string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(100)
  })
  'no_surat': string;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER
  })
  'no_urut': number;

  @AllowNull(false)
  @Column({
    type: DataType.TINYINT({length: 2})
  })
  'bulan': number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER({length: 4})
  })
  'tahun': number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING
  })
  'no_rm': string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING
  })
  'nama': string;

  @AllowNull(false)
  @Column({
    type: DataType.DATEONLY
  })
  'tgl_lahir': string;

  @AllowNull(false)
  @Column({
    type: DataType.TEXT
  })
  'alamat': string;

  @AllowNull(false)
  @Default(1)
  @Column({
    type: DataType.TINYINT({length: 2})
  })
  'status': number;

  @AllowNull(false)
  @Column({
    type: DataType.BIGINT
  })
  'poli': number;

  @Column({
    type: DataType.TEXT
  })
  'keterangan': string;

  @Column({
    type: DataType.TEXT
  })
  'indikasi': string;

  @AllowNull(false)
  @Column({
    type: DataType.BIGINT.UNSIGNED
  })
  'user_id': number;

  @Column({
    type: DataType.BIGINT.UNSIGNED
  })
  'updated_by': number;

  @Column({
    type: DataType.DATE
  })
  'tgl_act': string;

  @Column({
    type: DataType.BIGINT.UNSIGNED
  })
  'user_delete': number;

  @Column({
    type: DataType.DATE
  })
  'tgl_delete': string;

  @AllowNull(false)
  @Column({
    type: DataType.BIGINT
  })
  'cetakan_ke': number;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.TINYINT({length: 1})
  })
  'is_used': number;

  @Column({
    type: DataType.DATEONLY
  })
  'tgl_awal': string;

  @Column({
    type: DataType.DATEONLY
  })
  'tgl_akhir': string;

  @Column({
    type: DataType.BIGINT.UNSIGNED
  })
  'dokter_dpjp': number;

  @Column({
    type: DataType.BIGINT.UNSIGNED
  })
  'dokter_konsul': number;

  @Column({
    type: DataType.TEXT
  })
  'tindakan': string;

  @Column({
    type: DataType.TEXT
  })
  'pengobatan': string;
  
  @Column({
    type: DataType.TINYINT({length: 2}).UNSIGNED
  })
  'keadaan_pulang': number;

  @Column({
    type: DataType.TEXT
  })
  'diagnosa': string;

  @Column({
    type: DataType.TEXT
  })
  'diagnosa_text': string;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.TINYINT({length: 1})
  })
  'inap': number;

  @Column({
    type: DataType.DATEONLY
  })
  'tgl_kontrol': string;

  @Column({
    type: DataType.DATE
  })
  'tgl_check_out': string;

  @Column({
    type: DataType.STRING({length: 45})
  })
  'nosk_bpjs': string;

  @Column({
    type: DataType.STRING({length: 45})
  })
  'nosep_sk': string;

  @Column({
    type: DataType.BIGINT
  })
  'kunjungan_create': number;

  @Column({
    type: DataType.BIGINT
  })
  'pelayanan_create': number;

  @Column({
    type: DataType.STRING({length: 30})
  })
  'sep_created': string;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.TINYINT({length: 1}).UNSIGNED
  })
  'kunjungan_sudah_autocreate': number;

  @BelongsTo(() => Kunjungan, { foreignKey: 'kunjungan_id', onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  'kunjungan': Kunjungan;

  @BelongsTo(() => Pelayanan, { foreignKey: 'pelayanan_id', onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  'pelayanan': Pelayanan;

  @BelongsTo(() => Pasien, { foreignKey: 'pasien_id', onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  'pasien': Pasien;
}