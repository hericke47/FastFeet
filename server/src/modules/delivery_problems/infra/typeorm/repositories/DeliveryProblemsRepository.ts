import ICreateDeliveryProblemDTO from '@modules/delivery_problems/dtos/ICreateDeliveryProblemDTO';

import { Repository, getRepository } from 'typeorm';
import IDeliveryProblemsRepository from '@modules/delivery_problems/repositories/IDeliveryProblemsRepository';
import DeliveryProblems from '../entities/DeliveryProblems';

class DeliveryProblemsRepository implements IDeliveryProblemsRepository {
  private ormRepository: Repository<DeliveryProblems>;

  constructor() {
    this.ormRepository = getRepository(DeliveryProblems);
  }

  public async create(
    data: ICreateDeliveryProblemDTO,
  ): Promise<DeliveryProblems> {
    console.log(data);
    const deliveryProblem = this.ormRepository.create(data);
    console.log(deliveryProblem);
    await this.ormRepository.save(deliveryProblem);

    return deliveryProblem;
  }

  public async save(
    deliveryProblem: DeliveryProblems,
  ): Promise<DeliveryProblems> {
    return this.ormRepository.save(deliveryProblem);
  }
}

export default DeliveryProblemsRepository;
