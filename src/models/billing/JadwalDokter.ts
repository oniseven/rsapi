import { AllowNull, Column, DataType, Default, Model, Table } from "sequelize-typescript";

@Table({
  tableName: 'b_jadwal_dokter'
})
export class JadwalDokter extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER
  })
  "unit_id": number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER
  })
  "dokter_id": number;

  @AllowNull(false)
  @Column({
    type: DataType.DATEONLY
  })
  "tgl": Date;

  @AllowNull(false)
  @Column({
    type: DataType.STRING
  })
  "mulai": string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING
  })
  "selesai": string;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.INTEGER
  })
  "kuota": number;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.ENUM('0', '1')
  })
  "waktu_poli": number;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.TINYINT({length: 1})
  })
  "is_bpjs": number;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.TINYINT({length: 1})
  })
  "is_pm_ol": number;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.INTEGER
  })
  "kuota_bpjs_pm": number;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.INTEGER
  })
  "kuota_asuransi_pm": number;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.INTEGER
  })
  "kuota_umum_pm": number;
}
