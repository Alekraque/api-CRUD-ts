import { Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn } from "typeorm";

@Entity('clients')
export class ClientEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
      name: 'name',
      type: 'varchar',
      length: 255
    })
    name: string;

    @Column({
      name: 'email',
      type: 'varchar',
      length: 255
    })
    email: string

    @Column({
      name: 'phone',
      type: 'varchar',
      length: 255
    })
    phone: string;

    @CreateDateColumn({
        name: "created_at",
        type: "timestamp"
    })
    createAt: Date;
}
