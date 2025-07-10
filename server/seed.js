import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/userModel.js';

dotenv.config();
await connectDB();

await User.deleteMany();

await User.insertMany([
  {
    name: 'Alice',
    email: 'alice@example.com',
    password: '1234',
    role: 'admin',
    profile: {
      age: 30,
      gender: 'female',
      country: 'USA',
      preferences: {
        newsletter: true,
        notifications: true
      }
    },
    activity: [
      { date: new Date(), type: 'login', metadata: { ip: '1.1.1.1', device: 'mobile' } }
    ],
    subscriptions: [
      {
        plan: 'pro',
        status: 'active',
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      }
    ],
    isDeleted: true,
    deletedAt: null
  },
  {
    name: 'Bob',
    email: 'bob@example.com',
    password: '1234',
    role: 'user',
    profile: { age: 25, gender: 'male', country: 'Canada' },
    activity: [
      { date: new Date(), type: 'purchase', metadata: { ip: '2.2.2.2', device: 'desktop' } }
    ],
    isDeleted: false,
    deletedAt: null
  },
  {
    name: 'Charlie',
    email: 'charlie@example.com',
    password: '1234',
    role: 'user',
    profile: { age: 28, gender: 'male', country: 'UK' },
    activity: [
      { date: new Date(), type: 'login', metadata: { ip: '3.3.3.3', device: 'tablet' } }
    ],
    subscriptions: [
      {
        plan: 'basic',
        status: 'inactive',
        startDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      }
    ],
    isDeleted: false,
    deletedAt: null
  },
  {
    name: 'Diana',
    email: 'diana@example.com',
    password: '1234',
    role: 'admin',
    profile: {
      age: 34,
      gender: 'female',
      country: 'Germany',
      preferences: { newsletter: false, notifications: true }
    },
    activity: [
      { date: new Date(), type: 'logout', metadata: { ip: '4.4.4.4', device: 'laptop' } }
    ],
    isDeleted: false,
    deletedAt: null
  },
  {
    name: 'Ethan',
    email: 'ethan@example.com',
    password: '1234',
    role: 'user',
    profile: { age: 22, gender: 'male', country: 'Australia' },
    activity: [
      { date: new Date(), type: 'login', metadata: { ip: '5.5.5.5', device: 'mobile' } }
    ],
    isDeleted: false,
    deletedAt: null
  },
  {
    name: 'Fiona',
    email: 'fiona@example.com',
    password: '1234',
    role: 'admin',
    profile: {
      age: 45,
      gender: 'female',
      country: 'Ireland',
      preferences: { newsletter: true, notifications: false }
    },
    subscriptions: [
      {
        plan: 'enterprise',
        status: 'active',
        startDate: new Date(),
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
      }
    ],
    isDeleted: false,
    deletedAt: null
  },
  {
    name: 'George',
    email: 'george@example.com',
    password: '1234',
    role: 'user',
    profile: { age: 31, gender: 'male', country: 'USA' },
    activity: [
      { date: new Date(), type: 'login', metadata: { ip: '6.6.6.6', device: 'desktop' } },
      { date: new Date(), type: 'purchase', metadata: { ip: '6.6.6.6', device: 'desktop' } }
    ],
    isDeleted: false,
    deletedAt: null
  },
  {
    name: 'Hannah',
    email: 'hannah@example.com',
    password: '1234',
    role: 'user',
    profile: { age: 29, gender: 'female', country: 'France' },
    activity: [
      { date: new Date(), type: 'login', metadata: { ip: '7.7.7.7', device: 'tablet' } }
    ],
    subscriptions: [
      {
        plan: 'pro',
        status: 'cancelled',
        startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      }
    ],
    isDeleted: false,
    deletedAt: null
  },
  {
    name: 'Ivan',
    email: 'ivan@example.com',
    password: '1234',
    role: 'user',
    profile: { age: 35, gender: 'male', country: 'Russia' },
    activity: [
      { date: new Date(), type: 'logout', metadata: { ip: '8.8.8.8', device: 'desktop' } }
    ],
    isDeleted: false,
    deletedAt: null
  },
  {
    name: 'Julia',
    email: 'julia@example.com',
    password: '1234',
    role: 'user',
    profile: { age: 40, gender: 'female', country: 'Spain' },
    subscriptions: [
      {
        plan: 'basic',
        status: 'active',
        startDate: new Date(),
        endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
      }
    ],
    isDeleted: false,
    deletedAt: null
  }
]);

console.log('Seeded users');
process.exit();
