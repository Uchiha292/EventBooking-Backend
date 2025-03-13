import { app, server } from './index.js';
import request from 'supertest';
import User from './models/userModel.js';
import { jest } from '@jest/globals';
import mongoose from 'mongoose';

jest.mock('./models/userModel.js');

describe('User Routes', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    afterAll(async () => {
        if (server && server.close) {
            await server.close();
        }
        await mongoose.connection.close();
    });

    describe('POST /users', () => {
        test('should register new user', async () => {
            const newUser = { userName: 'Ameer Hamza', userEmail: 'hamza2579@gmail.com' };

            User.create = jest.fn().mockResolvedValue(newUser);

            const response = await request(app).post('/users').send(newUser);

            expect(response.status).toBe(201);
            expect(response.body.userName).toBe('Ameer Hamza');
            expect(User.create).toHaveBeenCalledWith(newUser);
        });

        test('should return 400', async () => {
            const response = await request(app).post('/users').send({});
            expect(response.status).toBe(400);
        });
    });
});