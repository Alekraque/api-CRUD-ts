import { Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn } from "typeorm";
import { ClientEntity } from "./clientEntity";


@Entity('users')
export class UserEntity {

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
      name: 'cpf',
      type: 'varchar',
      length: 11
    })
    cpf: string;

    @Column({
      name: 'password',
      type: 'varchar',
      length: 255
    })
    password: string;

    @CreateDateColumn({
      name: "created_at",
      type: "timestamp"
    })
    createAt: Date;

    @OneToMany(() => ClientEntity, (user) => user.user)
    @JoinColumn({ name: 'id', referencedColumnName: 'user_id'})
    client: ClientEntity[]
  }


