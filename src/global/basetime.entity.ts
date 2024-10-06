import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export class BaseTimeEntity {

  @CreateDateColumn({
    name: 'created_date',
    type: 'datetime',
    precision: 6,
    update: false,
  })
  createdDate: Date;

  @UpdateDateColumn({
    name: 'last_modified_date',
    type: 'datetime',
    precision: 6,
  })
  lastModifiedDate: Date;
}