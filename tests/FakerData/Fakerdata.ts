import { faker } from "@faker-js/faker";

export const Fakerdatauppdatelient = () => {
    return {
        "name": faker.person.fullName(),
        "email": faker.internet.email(),
        "telephone":faker.phone.number(),
        "id": 1
    }
}

