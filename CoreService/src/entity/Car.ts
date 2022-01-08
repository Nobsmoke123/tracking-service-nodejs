import {
  Entity,
  Column,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Car {
  @ObjectIdColumn()
  id: string;

  @Column("string", {
    nullable: false,
    unique: true,
  })
  reference: string; /** Asset Unique reference */

  @Column("string", {
    nullable: false,
  })
  longitude: string; /** Asset Longitude */

  @Column("string", {
    nullable: false,
  })
  latitude: string; /** Asset Latitude */

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
