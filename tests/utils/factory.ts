import factory from 'factory-girl';
import { faker } from '@faker-js/faker';

factory.define(
  'Orphanage',
  {},
  {
    id: faker.datatype.number,
    latitude: () => Number(faker.address.latitude()),
    longitude: () => Number(faker.address.longitude()),
    whatsapp: faker.phone.phoneNumber,
    images: [
      {
        id: faker.datatype.number,
        path: faker.image.imageUrl,
      },
    ],
    name: faker.name.findName,
    about: faker.lorem.sentence,
    instructions: faker.lorem.sentence,
    opening_hours: faker.lorem.sentence,
    open_on_weekends: faker.datatype.boolean,
  },
);

export default factory;
