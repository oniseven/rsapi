import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "v_jadwal_dokter"
})
export class ViewJadwalDokter extends Model {
  @Column({
    type: DataType.BIGINT
  })
  "unit_id": number;

  @Column({
    type: DataType.BIGINT
  })
  "dokter_id": number;

  @Column({
    type: DataType.DATEONLY
  })
  "tgl": Date;

  @Column({
    type: DataType.STRING
  })
  "mulai": string;

  @Column({
    type: DataType.STRING
  })
  "selesai": string;

  @Column({
    type: DataType.STRING
  })
  "jam_praktek": string;

  @Column({
    type: DataType.TINYINT({length: 1})
  })
  "cstatus": number;

  @Column({
    type: DataType.TINYINT
  })
  "kuota": number;

  @Column({
    type: DataType.BIGINT
  })
  "user_tmp": number;

  @Column({
    type: DataType.TINYINT
  })
  "waktu_poli": number;

  @Column({
    type: DataType.TINYINT({length: 1})
  })
  "is_bpjs": number;

  @Column({
    type: DataType.TINYINT({length: 1})
  })
  "is_pm_ol": number;

  @Column({
    type: DataType.TINYINT
  })
  "kuota_bpjs_pm": number;

  @Column({
    type: DataType.TINYINT
  })
  "kuota_asuransi_pm": number;

  @Column({
    type: DataType.TINYINT
  })
  "kuota_umum_pm": number;

  @Column({
    type: DataType.BIGINT
  })
  "user_ubah": number;

  @Column({
    type: DataType.DATEONLY
  })
  "tgl_ubah": Date;

  @Column({
    type: DataType.STRING(15)
  })
  "kodeAskes": string;

  @Column({
    type: DataType.STRING
  })
  "namaunit": string;

  @Column({
    type: DataType.STRING
  })
  "namadokter": string;

  @Column({
    type: DataType.TINYINT
  })
  "is_jkn": number;

  @Column({
    type: DataType.INTEGER
  })
  "hafis_id": number;
}