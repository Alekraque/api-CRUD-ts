import { Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./userEntity";

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

    @Column({
      name: 'user_id',
      type: 'uuid',
      nullable: false
    })
    user_id: string


    @OneToOne(() => UserEntity, (user) => user.client)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id'})
    user: UserEntity
  }
