import { faker } from '@faker-js/faker';

export class UserFactory {

  constructor() {
  }

  build(user) {
    return {
      firstName: (user.firstName !== undefined ? user.firstName : faker.person.firstName()),
      lastName: (user.lastName !== undefined ? user.lastName : faker.person.lastName()),
      email: (user.email !== undefined ? user.email : faker.internet.email()),
      password: (user.password !== undefined ? user.password : '123456'),
      confirmPassword: (user.confirmPassword !== undefined ? user.confirmPassword : '123456'),
      country: (user.country !== undefined ? user.country : 'Germany'),
      city: (user.city !== undefined ? user.city : 'Berlin'),
      address1: (user.address1 !== undefined ? user.address1 : 'Street 1'),
      zip_postal_code: (user.zip_postal_code !== undefined ? user.zip_postal_code : '11111'),
      phone: (user.phone !== undefined ? user.phone : faker.phone.number()),
    }
  }

}
