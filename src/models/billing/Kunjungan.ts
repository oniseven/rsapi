import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  HasMany,
  HasOne,
  Model,
  Sequelize,
  Table,
} from "sequelize-typescript";
import { Pasien } from "./master/Pasien";
import { Pelayanan } from "./Pelayanan";
import { SuratKontrol } from "./SuratKontrol";
import { ViewKunjunganInap } from "./view/ViewKunjunganInap";

@Table({
  tableName: "b_kunjungan",
})
export class Kunjungan extends Model {
  @Column({
    type: DataType.INTEGER,
  })
  "no_billing": number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  "pasien_id": number;

  @Column({
    type: DataType.INTEGER,
  })
  "asal_kunjungan": number;

  @Column({
    type: DataType.STRING(50),
  })
  "ket": number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  "jenis_layanan": number;

  @AllowNull(false)
  @Column({
    type: DataType.BIGINT.UNSIGNED,
  })
  "unit_id": number;

  @Column({
    type: DataType.BIGINT.UNSIGNED,
  })
  "loket_id": number;

  @Column({
    type: DataType.BIGINT.UNSIGNED,
  })
  "retribusi": number;

  @AllowNull(false)
  @Default(Sequelize.literal("CURDATE"))
  @Column({
    type: DataType.DATEONLY,
  })
  "tgl": Date;

  @Column({
    type: DataType.TINYINT.UNSIGNED,
  })
  "umur_thn": number;

  @Column({
    type: DataType.TINYINT.UNSIGNED,
  })
  "umur_bln": number;

  @Default(0)
  @Column({
    type: DataType.INTEGER,
  })
  "kel_umur": number;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.INTEGER,
  })
  "kelas_id": number;

  @Default(0)
  @Column({
    type: DataType.BIGINT,
  })
  "kamar_id": number;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.BIGINT,
  })
  "kso_id": number;

  @Default(0)
  @Column({
    type: DataType.BIGINT,
  })
  "kso_kelas_id": number;

  @Column({
    type: DataType.DATEONLY,
  })
  "tgl_sjp": Date;

  @Column({
    type: DataType.STRING({ length: 30 }),
  })
  "no_sjp": string;

  @Column({
    type: DataType.STRING({ length: 30 }),
  })
  "no_anggota": string;

  @Column({
    type: DataType.STRING({ length: 15 }),
  })
  "status_penj": string;

  @Column({
    type: DataType.STRING({ length: 40 }),
  })
  "nama_peserta": string;

  @Column({
    type: DataType.BIGINT,
  })
  "diag_awal": number;

  @Column({
    type: DataType.INTEGER,
  })
  "pendidikan_id": number;

  @Column({
    type: DataType.INTEGER,
  })
  "pekerjaan_id": number;

  @Column({
    type: DataType.STRING(50),
  })
  "alamat": string;

  @Column({
    type: DataType.STRING(3),
  })
  "rt": string;

  @Column({
    type: DataType.STRING(3),
  })
  "rw": string;

  @Column({
    type: DataType.BIGINT.UNSIGNED,
  })
  "desa_id": number;

  @Column({
    type: DataType.BIGINT.UNSIGNED,
  })
  "kec_id": number;

  @Column({
    type: DataType.BIGINT.UNSIGNED,
  })
  "kab_id": number;

  @Column({
    type: DataType.BIGINT.UNSIGNED,
  })
  "prop_id": number;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.TINYINT({ length: 1 }),
  })
  "pulang": number;

  @Column({
    type: DataType.DATE,
  })
  "tgl_pulang": string;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.TINYINT({ length: 1 }),
  })
  "isbaru": number;

  @Column({
    type: DataType.DATE,
  })
  "tgl_act": number;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.INTEGER,
  })
  "user_act": number;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.TINYINT({ length: 1 }),
  })
  "verifikasi": number;

  @Column({
    type: DataType.STRING,
  })
  "note_verifikasi": string;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.TINYINT({ length: 1 }),
  })
  "status_medik": number;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.TINYINT({ length: 1 }),
  })
  "hapus": number;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.TINYINT({ length: 1 }),
  })
  "post_keuangan": number;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.DATEONLY,
  })
  "post_tgl": string;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.TINYINT({ length: 1 }),
  })
  "pm": number;

  @Column({
    type: DataType.DATE,
  })
  "tgl_penyediaan_brm": Date;

  @Column({
    type: DataType.DATE,
  })
  "tgl_kembali_brm": Date;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.TINYINT({ length: 1 }),
  })
  "is_pm_ol": number;

  @Column({
    type: DataType.TEXT,
  })
  "als_hps_pm_ol": string;

  @Column({
    type: DataType.DATE,
  })
  "tgl_app_pm": Date;

  @Column({
    type: DataType.BIGINT,
  })
  "kso_cob_id": number;

  @Column({
    type: DataType.STRING(15),
  })
  "status_kepesertaan": string;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.TINYINT({ length: 1 }),
  })
  "katarak": number;

  @Column({
    type: DataType.STRING(150),
  })
  "kode_ppk_asal": string;

  @Column({
    type: DataType.STRING,
  })
  "nama_ppk_asal": string;

  @Column({
    type: DataType.TEXT,
  })
  "path_ttd_pasien": string;

  @Column({
    type: DataType.TEXT,
  })
  "file_ttd_asal": string;

  @Column({
    type: DataType.DATEONLY,
  })
  "tgl_rujukan": string;

  @Column({
    type: DataType.STRING(),
  })
  "no_rujukan": number;

  @Column({
    type: DataType.DATEONLY,
  })
  "exp_rujukan": string;

  @Column({
    type: DataType.TEXT,
  })
  "path_ttd_pasien_jakon": string;

  @Column({
    type: DataType.TEXT,
  })
  "file_ttd_asal_jakon": string;

  @Column({
    type: DataType.TINYINT({ length: 1 }),
  })
  "tipe_pencarian": number;
  // 0: No Kartu, 1: No Rujukan

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.TINYINT({ length: 1 }),
  })
  "posting_berkas": number;

  @Column({
    type: DataType.BIGINT,
  })
  "user_posting_berkas": number;

  @Column({
    type: DataType.DATE,
  })
  "tgl_posting_berkas": string;

  @Column({
    type: DataType.BIGINT,
  })
  "user_batal_posting_berkas": number;

  @Column({
    type: DataType.DATE,
  })
  "tgl_batal_posting_berkas": string;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.TINYINT({ length: 1 }),
  })
  "verif_berkas": number;

  @Column({
    type: DataType.BIGINT,
  })
  "user_verif_berkas": number;

  @Column({
    type: DataType.DATE,
  })
  "tgl_verif_berkas": string;

  @Column({
    type: DataType.BIGINT,
  })
  "user_batal_verif_berkas": number;

  @Column({
    type: DataType.DATE,
  })
  "tgl_batal_verif_berkas": string;

  @AllowNull(false)
  @Default(1)
  @Column({
    type: DataType.INTEGER({
      length: 2,
    }),
  })
  "status_konsul": number;

  @Column({
    type: DataType.TEXT,
  })
  "keterangan_hak_kelas": string;

  @AllowNull(true)
  @Column({
    type: DataType.INTEGER,
  })
  "id_reservasi_jkn": number;

  @BelongsTo(() => Pasien, {
    foreignKey: "pasien_id",
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  "pasien": Pasien;

  @HasMany(() => Pelayanan, { foreignKey: "kunjungan_id" })
  "pelayanans": Pelayanan[];

  @HasMany(() => SuratKontrol, { foreignKey: "kunjungan_id" })
  "surat_kontrols": SuratKontrol[];
}
