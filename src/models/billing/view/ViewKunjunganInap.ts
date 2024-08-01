import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { Kunjungan } from "../Kunjungan";

@Table({
  tableName: "v_kunjungan_inap",
})
export class ViewKunjunganInap extends Model {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true
  })
  "id": number;

  @Column({
    type: DataType.DATEONLY,
  })
  "tgl": string;

  @Column({
    type: DataType.DATE,
  })
  "tgl_pulang": string;

  @Column({
    type: DataType.TINYINT({ length: 1 }),
  })
  "pulang": number;

  @Column({
    type: DataType.INTEGER,
  })
  "jml": number;
}
