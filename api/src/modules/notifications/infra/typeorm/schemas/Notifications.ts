import {
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
} from 'typeorm';

@Entity('notifications')
class Notifications {
  @ObjectIdColumn()
  id: string;

  @Column()
  content: string;

  @Column('uuid')
  recipient_id: string;

  @Column({ default: false })
  read: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Notifications;
