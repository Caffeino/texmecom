import { PrismaClient } from '@prisma/client';

// Declare a type for the global object to include our prisma instance
declare global {
	var prisma: PrismaClient | undefined;
}

const prisma = globalThis.prisma || new PrismaClient();

// Ensure the PrismaClient instance is not recreated in development
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;

export default prisma;
