import { BelongsTo, Column, DataType, Model, Table } from "sequelize-typescript";
import { Pelayanan } from "./Pelayanan";

@Table({
  tableName: 'b_tindakan_kamar'
})
export class TindakanKamar extends Model {
  @Column({
    type: DataType.BIGINT
  })
  'pelayanan_id': number;

  @Column({
    type: DataType.BIGINT({
      unsigned: true
    })
  })
  'unit_id_asal': number;

  @Column({
    type: DataType.BIGINT
  })
  'kso_id': number;

  @Column({
    type: DataType.DATE
  })
  'tgl_in': string;

  @Column({
    type: DataType.DATE
  })
  'tgl_out': string;

  @Column({
    type: DataType.BIGINT
  })
  'kamar_id': number;

  @Column({
    type: DataType.STRING(12)
  })
  'kode': number;
  
  @Column({
    type: DataType.STRING(60)
  })
  'nama': number;

  @Column({
    type: DataType.INTEGER
  })
  'qty': number;

  @Column({
    type: DataType.DOUBLE
  })
  'tarip': number;

  @Column({
    type: DataType.DOUBLE
  })
  'beban_kso': number;

  @Column({
    type: DataType.DOUBLE
  })
  'diskon_kso': number;

  @Column({
    type: DataType.DOUBLE
  })
  'beban_pasien': number;

  @Column({
    type: DataType.BIGINT
  })
  'kelas_id': number;

  @Column({
    type: DataType.DOUBLE
  })
  'bayar': number;

  @Column({
    type: DataType.DOUBLE
  })
  'bayar_kso': number;

  @Column({
    type: DataType.DOUBLE
  })
  'bayar_pasien': number;

  @Column({
    type: DataType.TINYINT
  })
  'lunas': number;

  @Column({
    type: DataType.TINYINT
  })
  'status_out': number;

  @Column({
    type: DataType.TINYINT
  })
  'aktif': number;

  @Column({
    type: DataType.TINYINT
  })
  'verifikasi': number;

  @Column({
    type: DataType.BIGINT
  })
  'is_edit': number;

  @Column({
    type: DataType.BIGINT
  })
  'user_act': number;

  @BelongsTo(() => Pelayanan, { foreignKey: 'pelayanan_id', onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  'pelayanan': Pelayanan;
}