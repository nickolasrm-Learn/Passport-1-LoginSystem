const request = require('supertest'),
	{StatusCodes} = require('http-status-codes')
const app = require('../app'),
	{db} = require('../app')
const { describe } = require('../models/user')

describe('Registration', () => {
	beforeAll(async () => {
		await db.sync({force: true})
	})

	it('Request with invalid headers', async () => {
		const res = await request(app)
			.post('/register')
		expect(res.status).toBe(StatusCodes.BAD_REQUEST)
	})

	it('Request with invalid body', async () => {
		const res = await request(app)
			.post('/register')
			.set('Content-Type', 'application/json')
			.send({})
		expect(res.status).toBe(StatusCodes.BAD_REQUEST)
	});

	it('Request with invalid email', async () => {
		const res = await request(app)
			.post('/register')
			.set('Content-Type', 'application/json')
			.send({username: 'Test', password: '12345678', email: '@'})
		expect(res.status).toBe(StatusCodes.BAD_REQUEST)
	});

	it('Request with invalid username', async () => {
		const res = await request(app)
			.post('/register')
			.set('Content-Type', 'application/json')
			.send({username: 'AB', password: '12345678', email: 'test@gmail.com'})
		expect(res.status).toBe(StatusCodes.BAD_REQUEST)
	});

	it('Request with invalid password', async () => {
		const res = await request(app)
			.post('/register')
			.set('Content-Type', 'application/json')
			.send({username: 'Test', password: '1234567', email: 'test@gmail.com'})
		expect(res.status).toBe(StatusCodes.BAD_REQUEST)
	});

	it('Registering a new user', async () => {
		const res = await request(app)
			.post('/register')
			.set('Content-Type', 'application/json')
			.send({username: 'Test', email: 'test@gmail.com', password: '12345678'})
		expect(res.status).toBe(StatusCodes.CREATED)
	})

	it('Duplicated user checking', async () => {
		const res = await request(app)
			.post('/register')
			.set('Content-Type', 'application/json')
			.send({username: 'Test', email: 'test@gmail.com', password: '12345678'})
		expect(res.status).toBe(StatusCodes.CONFLICT)
	})
})

describe('Login', () => {
	it('Request with invalid headers', async () => {
		
	});

	afterAll(async () => {
		app.close()
		db.close()
	})
})