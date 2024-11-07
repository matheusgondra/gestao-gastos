module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	roots: ["<rootDir>/test"],
	collectCoverageFrom: ["<rootDir>/src/**/*.ts", "!<rootDir>/src/main/**", "!<rootDir>/src/**/index.ts"],
	moduleFileExtensions: ["js", "json", "ts"],
	transform: {
		"^.+\\.(t|j)s$": "ts-jest"
	},
	moduleNameMapper: {
		"@/(.*)": "<rootDir>/src/$1",
		"@test/(.*)": "<rootDir>/test/$1"
	}
};
