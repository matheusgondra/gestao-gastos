import { PrismaClient } from "@prisma/client";
import { execSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { resolve } from "node:path";

const prismaBinary = resolve(__dirname, "..", "..", "node_modules", ".bin", "prisma");
export class PrismaHelper {
	private schema: string;
	private connectionString: string;
	private prisma: PrismaClient = null;

	constructor() {
		this.schema = `test_${randomUUID()}`;
		this.connectionString = this.getTestDatabaseUrl();
		process.env.DATABASE_URL = this.connectionString;
	}

	async connect(): Promise<void> {
		this.runMigrations();
		this.prisma = this.generateClient();
	}

	async disconnect(): Promise<void> {
		await this.prisma.$disconnect();
		await this.prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE;`);
	}

	getPrismaClient(): PrismaClient {
		if (!this.prisma) {
			this.prisma = this.generateClient();
		}

		return this.prisma;
	}

	private generateClient(): PrismaClient {
		return new PrismaClient({
			datasources: {
				db: {
					url: this.connectionString
				}
			}
		});
	}

	private getTestDatabaseUrl(): string {
		const baseUrl = process.env.DATABASE_URL;
		if (!baseUrl) {
			throw new Error("DATABASE_URL is not set in the environment variables.");
		}

		const url = new URL(baseUrl);
		url.searchParams.set("schema", this.schema);

		return url.toString();
	}

	private runMigrations(): void {
		console.log(`Running migrations on schema: ${this.schema}`);
		execSync(`${prismaBinary} migrate deploy`, { env: { ...process.env } });
		console.log(`Migrations completed on schema: ${this.schema}`);
	}
}
