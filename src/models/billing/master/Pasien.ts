import {
  AllowNull,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
  Unique,
  Validate,
} from "sequelize-typescript";
import { Pelayanan } from "../Pelayanan";
import { Kunjungan } from "../Kunjungan";
import { SuratKontrol } from "../SuratKontrol";
import { ReservasiOnline } from "../ReservasiOnline";

@Table({
  tableName: "b_ms_pasien",
})
export class Pasien extends Model {
  @Unique
  @Validate({
    notEmpty: {
      msg: "NoRM tidak boleh kosong",
    },
    max: 6,
  })
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  "no_rm": string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  "nama": string;

  @Column({
    type: DataType.DATEONLY,
  })
  "tgl_lahir": string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  "no_ktp": string;

  @AllowNull(false)
  @Column({
    type: DataType.CHAR({ length: 1 }),
  })
  "sex": string;

  @Column({
    type: DataType.BIGINT.UNSIGNED,
  })
  "pendidikan_id": number;

  @Column({
    type: DataType.BIGINT.UNSIGNED,
  })
  "pekerjaan_id": number;

  @Column({
    type: DataType.STRING,
  })
  "alamat": string;

  @Column({
    type: DataType.STRING,
  })
  "rt": string;

  @Column({
    type: DataType.STRING,
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

  @HasMany(() => Pelayanan, { foreignKey: "pasien_id" })
  "pelayanans": Pelayanan[];

  @HasMany(() => Kunjungan, { foreignKey: "pasien_id" })
  "kunjungans": Kunjungan[];

  @HasMany(() => SuratKontrol, { foreignKey: "pasien_id" })
  "surat_kontrols": SuratKontrol[];

  @HasMany(() => ReservasiOnline, { foreignKey: "pasien_id" })
  "reservasi_onlines": ReservasiOnline[];
}
