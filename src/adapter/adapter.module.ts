import { Module } from "@nestjs/common";
import { BCryptAdapter } from "./bcrypt.adapter";

@Module({
	providers: [BCryptAdapter],
	exports: [BCryptAdapter]
})
export class AdapterModule {}
