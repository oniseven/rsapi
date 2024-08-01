import { AllowNull, Column, DataType, Default, HasMany, Model, Table } from "sequelize-typescript";
import { TindakanKelas } from "./TindakanKelas";

@Table({
  tableName: 'b_ms_tindakan'
})
export class MsTindakan extends Model {
  @AllowNull(true)
  @Column({
    type: DataType.STRING({length: 20})
  })
  'kode_icd9cm': string;

  @AllowNull(true)
  @Column({
    type: DataType.BIGINT
  })
  'unit_id': number;

  @AllowNull(true)
  @Column({
    type: DataType.BIGINT
  })
  'kel_tindakan_id': number;

  @AllowNull(true)
  @Column({
    type: DataType.STRING({length: 15})
  })
  'kel_tind_kode': string;

  @AllowNull(true)
  @Column({
    type: DataType.BIGINT
  })
  'klasifikasi_id': number;

  @AllowNull(true)
  @Column({
    type: DataType.STRING({length: 12})
  })
  'kode': string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING({length: 100})
  })
  'nama': string;

  @AllowNull(true)
  @Column({
    type: DataType.STRING({length: 12})
  })
  'kode_askes': string;

  @AllowNull(true)
  @Column({
    type: DataType.STRING({length: 100})
  })
  'nama_askes': string;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.TINYINT({length: 1})
  })
  'editable': number;

  @AllowNull(false)
  @Default(1)
  @Column({
    type: DataType.TINYINT({length: 1})
  })
  'aktif': number;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.TINYINT({length: 1})
  })
  'is_jenis_jasa': number;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.TINYINT({length: 1})
  })
  'is_penunjang': number;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.TINYINT({length: 1})
  })
  'is_penunjang_bpjs': number;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.TINYINT({length: 1})
  })
  'is_puasa': number;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.TINYINT({length: 1})
  })
  'is_dex_sin': number;

  @AllowNull(true)
  @Column({
    type: DataType.TINYINT({length: 3})
  })
  'inacbg_group_id': number;

  @AllowNull(true)
  @Column({
    type: DataType.INTEGER.UNSIGNED
  })
  'dinkes_group_id': number;

  @AllowNull(true)
  @Column({
    type: DataType.INTEGER.UNSIGNED
  })
  'dinkes_rad_group_id': number;

  @AllowNull(true)
  @Column({
    type: DataType.INTEGER.UNSIGNED
  })
  'dinkes_bedah_group_id': number;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.DOUBLE
  })
  'unit_cost': number;

  @AllowNull(true)
  @Column({
    type: DataType.STRING({length: 12})
  })
  'kode_alat': string;

  @HasMany(() => TindakanKelas, { foreignKey: 'ms_tindakan_id' })
  'tindakanKelass': TindakanKelas[];
}