import "module-alias/register";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			forbidNonWhitelisted: true
		})
	);

	const config = new DocumentBuilder()
		.setTitle("Gestão de Gastos")
		.setDescription("API para gestão de gastos")
		.setVersion("1.0")
		.addTag("Income")
		.addTag("Auth")
		.build();

	const documentFactory = () => SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("doc", app, documentFactory);

	await app.listen(3000);
}
bootstrap();
