import FakeRecipientsRepository from '@modules/recipients/repositories/fakes/FakeRecipientRepository';
import CreateRecipientService from '@modules/recipients/services/CreateRecipientService';

import FakeCouriersRepository from '@modules/couriers/repositories/fakes/FakeCouriersRepository';
import CreateCourierService from '@modules/couriers/services/CreateCourierService';

import FakeDeliveriesRepository from '../repositories/fakes/FakeDeliveriesRepository';
import CreateDeliveryService from './CreateDeliveryService';

import ListDeliveryByIdService from './ListDeliveryByIdService';

let createDelivery: CreateDeliveryService;
let createRecipient: CreateRecipientService;
let createCourier: CreateCourierService;
let listDeliveryById: ListDeliveryByIdService;

let fakeDeliveriesRepository: FakeDeliveriesRepository;
let fakeRecipientRepository: FakeRecipientsRepository;
let fakeCourierRepository: FakeCouriersRepository;

describe('ListDeliveryById', () => {
  beforeEach(() => {
    fakeDeliveriesRepository = new FakeDeliveriesRepository();
    fakeRecipientRepository = new FakeRecipientsRepository();
    fakeCourierRepository = new FakeCouriersRepository();

    createDelivery = new CreateDeliveryService(fakeDeliveriesRepository);
    createRecipient = new CreateRecipientService(fakeRecipientRepository);
    createCourier = new CreateCourierService(fakeCourierRepository);
    listDeliveryById = new ListDeliveryByIdService(fakeDeliveriesRepository);
  });

  it('should be able to list all deliveries', async () => {
    const recipient = await createRecipient.execute({
      name: 'Joao Paulo',
      street: 'Rua sete de setembro',
      number: 2354,
      state: 'PR',
      city: 'Curitiba',
      zipcode: '80401-432',
    });

    const courier = await createCourier.execute({
      name: 'Entregador1',
      email: 'entregador1@email.com',
    });

    const delivery1 = await createDelivery.execute({
      product: 'Produto1',
      recipient_id: recipient.id,
      courier_id: courier.id,
    });

    await createDelivery.execute({
      product: 'Produto2',
      recipient_id: recipient.id,
      courier_id: courier.id,
    });

    const justOneDelivery = await listDeliveryById.execute(delivery1.id);

    expect(justOneDelivery).toEqual(delivery1);
  });
});
