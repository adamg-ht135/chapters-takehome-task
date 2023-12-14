import { BaseEntity } from '@/types';

export type UserResponse = {
  name: string;
  email: string;
  phone: number;
} & BaseEntity;
