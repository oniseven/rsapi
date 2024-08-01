import { AllowNull, Column, DataType, Default, HasMany, Model, Table, Validate } from "sequelize-typescript";
import { ApiReservation } from "../ApiReservation";
import { MasterJadwalDokter } from "./MasterJadwalDokter";

@Table({
  tableName: 'b_ms_pegawai'
})
export class Pegawai extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.STRING
  })
  "nip": string;

  @AllowNull(false)
  @Validate({
    notEmpty: true
  })
  @Column({
    type: DataType.STRING,
  })
  "nama": string;

  @Column({
    type: DataType.INTEGER,
  })
  "kode_jasa": number;

  @Column({
    type: DataType.STRING(10)
  })
  "dokter_bpjs": string;

  @AllowNull(false)
  @Default(1)
  @Column({
    type: DataType.TINYINT({length: 1})
  })
  "aktif": string;

  @HasMany(() => ApiReservation, {foreignKey: 'doctor_id'})
  "ApiReservations": ApiReservation[];

  @HasMany(() => MasterJadwalDokter, {foreignKey: 'dokter_id'})
  "MasterJadwalDokter": MasterJadwalDokter[];
}