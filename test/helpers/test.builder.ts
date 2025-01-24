import { Provider, Type, ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing";

export class TestBuilder {
	private imports: any[] = [];
	private controllers: any[] = [];
	private providers: Provider[] = [];
	private guards: { guard: Type<any>; value: any }[] = [];

	private constructor() {}

	static builder() {
		return new TestBuilder();
	}

	setImports(imports: any[]) {
		this.imports = imports;
		return this;
	}

	setProviders(providers: Provider[]) {
		this.providers = providers;
		return this;
	}

	setControllers(controllers: any[]) {
		this.controllers = controllers;
		return this;
	}

	overrideGuard(guard: Type<any>, value: any) {
		this.guards.push({ guard, value });
		return this;
	}

	async buildE2E() {
		const moduleBuilder = await Test.createTestingModule({
			imports: this.imports,
			controllers: this.controllers,
			providers: this.providers
		});

		this.guards.forEach(({ guard, value }) => {
			moduleBuilder.overrideGuard(guard).useValue(value);
		});

		const module = await moduleBuilder.compile();

		const app = module.createNestApplication();
		app.useGlobalPipes(
			new ValidationPipe({
				whitelist: true,
				transform: true
			})
		);

		await app.init();

		return app;
	}

	async build() {
		const moduleBuilder = await Test.createTestingModule({
			imports: this.imports,
			controllers: this.controllers,
			providers: this.providers
		});

		this.guards.forEach(({ guard, value }) => {
			moduleBuilder.overrideGuard(guard).useValue(value);
		});

		const module = await moduleBuilder.compile();

		return module;
	}
}
