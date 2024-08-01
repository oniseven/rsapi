import { AllowNull, Column, DataType, Default, Model, Table } from "sequelize-typescript";

@Table({
  tableName: 'setting'
})
export class Setting extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.STRING
  })
  'name': string;

  @AllowNull(false)
  @Column({
    type: DataType.TEXT
  })
  'keterangan': string;

  @Column({
    type: DataType.TEXT
  })
  'data': string;

  @Column({
    type: DataType.TEXT
  })
  'alias': string;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.TINYINT({
      length: 1
    }).UNSIGNED
  })
  'is_json': number;

  @AllowNull(false)
  @Default(1)
  @Column({
    type: DataType.TINYINT({
      length: 1
    }).UNSIGNED
  })
  'aktif': number;

  get getDataParsed(): any {
    try {
      return this.is_json ? JSON.parse(this.data) : this.data
    } catch (error) {
      return null;
    }
  }
}