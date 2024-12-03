import { PrismaClient } from "@prisma/client";
import { execSync } from "node:child_process";
import { randomUUID } from "node:crypto";

export class PrismaHelper {
	private prisma: PrismaClient;
	private schema: string;

	constructor() {
		this.schema = `test_${randomUUID()}`;
		this.prisma = new PrismaClient({
			datasources: {
				db: {
					url: this.getTestDatabaseUrl()
				}
			}
		});
	}

	async connect(): Promise<void> {
		await this.prisma.$executeRawUnsafe(`CREATE SCHEMA IF NOT EXISTS "${this.schema}";`);
		this.runMigrations();
	}

	async disconnect(): Promise<void> {
		await this.prisma.$disconnect();
		await this.prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE;`);
	}

	getPrismaClient(): PrismaClient {
		return this.prisma;
	}

	private getTestDatabaseUrl(): string {
		const baseUrl = process.env.DATABASE_URL;
		if (!baseUrl) {
			throw new Error("DATABASE_URL is not set in the environment variables.");
		}
		const [connectionUrl] = baseUrl.split("?");
		return `${connectionUrl}?schema=${this.schema}`;
	}

	private runMigrations(): void {
		console.log(`Running migrations on schema: ${this.schema}`);
		execSync(`pnpm prisma migrate deploy`, {
			env: {
				...process.env,
				DATABASE_URL: this.getTestDatabaseUrl()
			}
		});
	}
}
