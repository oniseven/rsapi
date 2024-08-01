import { AllowNull, Column, DataType, Default, Model, Table } from "sequelize-typescript";

@Table({
  tableName: 'content'
})
export class Content extends Model {
  @AllowNull(false)
  @Default('faq')
  @Column({
    type: DataType.STRING(15),
    defaultValue: 'faq'
  })
  'type': string;

  @AllowNull(false)
  @Column({
    type: DataType.TEXT
  })
  'pertanyaan': string;

  @AllowNull(false)
  @Column({
    type: DataType.TEXT
  })
  'jawaban': string;

  @AllowNull(false)
  @Column({
    type: DataType.TEXT
  })
  'data': string;

  @AllowNull(false)
  @Default(1)
  @Column({
    type: DataType.TINYINT({length: 1, unsigned: true}),
    defaultValue: 1
  })
  'is_active': number;
}