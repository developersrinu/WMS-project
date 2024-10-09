import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AuthUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  userName: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;
}
