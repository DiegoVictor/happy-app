import factory from 'factory-girl';
import faker from 'faker';

factory.define(
  'Orphanage',
  {},
  {
    id: faker.random.number,
    latitude: () => Number(faker.address.latitude()),
    longitude: () => Number(faker.address.longitude()),
    whatsapp: faker.phone.phoneNumber,
    images: [
      {
        id: faker.random.number,
        path: faker.image.imageUrl,
      },
    ],
    name: faker.name.findName,
    about: faker.lorem.sentence,
    instructions: faker.lorem.sentence,
    opening_hours: faker.lorem.sentence,
    open_on_weekends: faker.random.boolean,
  },
);

export default factory;
