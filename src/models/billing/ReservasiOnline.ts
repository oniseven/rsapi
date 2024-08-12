import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  Model,
  Sequelize,
  Table,
} from "sequelize-typescript";
import { Pasien } from "./master/Pasien";

@Table({
  tableName: "b_reservasi_online",
})
export class ReservasiOnline extends Model {
  @Column({
    type: DataType.BIGINT,
  })
  "pasien_id": number;

  @Column({
    type: DataType.BIGINT,
  })
  "unit_id": number;

  @Column({
    type: DataType.BIGINT,
  })
  "kelas_id": number;

  @Column({
    type: DataType.BIGINT,
  })
  "kso_kelas_id": number;

  @Column({
    type: DataType.BIGINT,
  })
  "kso_id": number;

  @Column({
    type: DataType.DATEONLY,
  })
  "tgl_reservasi": string;

  @Column({
    type: DataType.BIGINT,
  })
  "dokter_id": number;

  @Column({
    type: DataType.BIGINT,
  })
  "retribusi": number;

  @Column({
    type: DataType.TEXT,
  })
  "tindakan_id": string;

  @Column({
    type: DataType.DOUBLE,
  })
  "biaya": number;

  @Column({
    type: DataType.INTEGER,
  })
  "no_iterasi": number;

  @Column({
    type: DataType.STRING(20),
  })
  "no_reservasi": string;

  @Column({
    type: DataType.DATEONLY,
  })
  "tgl": string;

  @Column({
    type: DataType.BIGINT,
  })
  "user_act": number;

  @Default(Sequelize.literal("NOW()"))
  @Column({
    type: DataType.DATE,
  })
  "tgl_act": Date;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.TINYINT({
      length: 1,
    }),
  })
  "status": number;

  @Column({
    type: DataType.DATE,
  })
  "tgl_approve": Date;

  @Column({
    type: DataType.TEXT,
  })
  "als_hapus": string;

  @Column({
    type: DataType.BIGINT,
  })
  "kunjungan_id": number;

  @Column({
    type: DataType.BIGINT,
  })
  "bayar_id": number;

  @Column({
    type: DataType.STRING(15),
  })
  "no_telp": string;

  @Column({
    type: DataType.STRING(50),
  })
  "terima_dari": string;

  @Column({
    type: DataType.TINYINT({ length: 1 }),
  })
  "check_in": number;

  @Column({
    type: DataType.DATE,
  })
  "checkin_at": Date;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.TINYINT({ length: 1 }),
  })
  "jenis_app": number;

  @Default(0)
  @Column({
    type: DataType.TINYINT({ length: 1 }),
  })
  "status_wa": number;

  @BelongsTo(() => Pasien, {
    foreignKey: "pasien_id",
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  "pasien": Pasien;
}
