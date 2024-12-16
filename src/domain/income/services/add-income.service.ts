import { Injectable } from "@nestjs/common";
import { AddIncomeRequestDTO } from "../dto/add-income-request.dto";

@Injectable()
export class AddIncomeService {
	async execute(dto: AddIncomeRequestDTO) {}
}
