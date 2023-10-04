import { UpdateCompanyDto } from "../../companies/dto/update-company.dto";

export const updateCompanyrMock: UpdateCompanyDto = {
    name: 'update test1',
    city: "update testCty",
    state: "update testState",
    address: "update addressTest",
    foundedAt: new Date("2023-02-01T00:0:00.000Z"),
    description: "update descriptionTest"
};