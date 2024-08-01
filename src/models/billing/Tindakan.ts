import { BelongsTo, Column, DataType, Default, Model, Table } from "sequelize-typescript";
import { TindakanKelas } from "./master/TindakanKelas";
import { TindakanUnit } from "./master/TindakanUnit";

@Table({
  tableName: 'b_tindakan'
})
export class Tindakan extends Model {
  @Column({
    type: DataType.BIGINT
  })
  'ms_tindakan_kelas_id': number;

  @Column({
    type: DataType.BIGINT
  })
  'ms_tindakan_unit_id': number;

  @Column({
    type: DataType.TINYINT({length: 1})
  })
  'jenis_kunjungan': number;

  @Column({
    type: DataType.BIGINT
  })
  'kunjungan_id': number;

  @Column({
    type: DataType.TINYINT
  })
  'kunjungan_kelas_id': number;

  @Column({
    type: DataType.BIGINT
  })
  'pelayanan_id': number;

  @Column({
    type: DataType.BIGINT
  })
  'kso_id': number;

  @Column({
    type: DataType.BIGINT
  })
  'kso_kelas_id': number;

  @Column({
    type: DataType.DATEONLY
  })
  'tgl': number;

  @Column({
    type: DataType.DOUBLE
  })
  'qty': number;

  @Default(0)
  @Column({
    type: DataType.DOUBLE
  })
  'biaya': number;

  @Default(0)
  @Column({
    type: DataType.DOUBLE
  })
  'biaya_kso': number;

  @Default(0)
  @Column({
    type: DataType.DOUBLE
  })
  'diskon_kso': number;

  @Default(0)
  @Column({
    type: DataType.DOUBLE
  })
  'biaya_pasien': number;

  @Default(0)
  @Column({
    type: DataType.TINYINT({length: 1})
  })
  'lunas': number;

  @Default(0)
  @Column({
    type: DataType.BIGINT
  })
  'user_id': number;

  @Default(0)
  @Column({
    type: DataType.TINYINT({length: 1})
  })
  'type_dokter': number;

  @Column({
    type: DataType.DATE
  })
  'tgl_act': string;

  @Column({
    type: DataType.BIGINT
  })
  'user_act': number;

  @Default(0)
  @Column({
    type: DataType.BIGINT
  })
  'unit_act': number;

  @Default(0)
  @Column({
    type: DataType.DOUBLE
  })
  'biaya_asli': number;

  @BelongsTo(() => TindakanKelas, {foreignKey: 'ms_tindakan_kelas_id', onDelete: 'RESTRICT', onUpdate: 'CASCADE'})
  'tindakanKelas': TindakanKelas;

  @BelongsTo(() => TindakanUnit, {foreignKey: 'ms_tindakan_unit_id', onDelete: 'RESTRICT', onUpdate: 'CASCADE'})
  'tindakanUnit': TindakanUnit;
}