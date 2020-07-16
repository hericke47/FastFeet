import FakeRecipientsRepository from '@modules/recipients/repositories/fakes/FakeRecipientRepository';
import CreateRecipientService from '@modules/recipients/services/CreateRecipientService';
import FakeCouriersRepository from '@modules/couriers/repositories/fakes/FakeCouriersRepository';
import CreateCourierService from '@modules/couriers/services/CreateCourierService';

import FakeDeliveriesRepository from '../repositories/fakes/FakeDeliveriesRepository';
import CreateDeliveryService from './CreateDeliveryService';

import UpdateDeliveryService from './UpdateDeliveryService';

let createDelivery: CreateDeliveryService;
let createRecipient: CreateRecipientService;
let createCourier: CreateCourierService;
let updateDelivery: UpdateDeliveryService;

let fakeDeliveriesRepository: FakeDeliveriesRepository;
let fakeRecipientRepository: FakeRecipientsRepository;
let fakeCourierRepository: FakeCouriersRepository;

describe('CreateDelivery', () => {
  beforeEach(() => {
    fakeDeliveriesRepository = new FakeDeliveriesRepository();
    fakeRecipientRepository = new FakeRecipientsRepository();
    fakeCourierRepository = new FakeCouriersRepository();

    createRecipient = new CreateRecipientService(fakeRecipientRepository);
    createCourier = new CreateCourierService(fakeCourierRepository);
    createDelivery = new CreateDeliveryService(fakeDeliveriesRepository);

    updateDelivery = new UpdateDeliveryService(fakeDeliveriesRepository);
  });

  it('should be able to create a delivery', async () => {
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

    const delivery = await createDelivery.execute({
      product: 'Produto1',
      recipient_id: recipient.id,
      courier_id: courier.id,
    });

    const updatedDelivery = await updateDelivery.execute(delivery.id, {
      product: 'Product Updated',
      recipient_id: 'new recipient ID',
      courier_id: 'new courier ID',
    });

    expect(updatedDelivery).toEqual({
      id: delivery.id,
      product: 'Product Updated',
      recipient_id: 'new recipient ID',
      courier_id: 'new courier ID',
    });
  });
});
