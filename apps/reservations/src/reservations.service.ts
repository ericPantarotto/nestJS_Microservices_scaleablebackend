/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PAYMENTS_SERVICE, User } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices/client/client-proxy';
import { firstValueFrom } from 'rxjs';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './models/reservation.entity';
import { ReservationRepository } from './reservation.repository';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    @Inject(PAYMENTS_SERVICE) private readonly paymentsService: ClientProxy,
  ) {}

  async create(
    createReservationDto: CreateReservationDto,
    { email, id }: User,
  ) {
    const paymentResponse: unknown = await firstValueFrom(
      this.paymentsService.send('create_charge', {
        ...createReservationDto.charge,
        email,
      }),
    );

    const reservation = new Reservation({
      ...createReservationDto,
      timestamp: new Date(),
      userId: id,
      invoiceId: (paymentResponse as { id: string })['id'],
    });
    return this.reservationRepository.create(reservation);
  }

  async findAll() {
    return this.reservationRepository.find({});
  }

  async findOne(id: number) {
    return this.reservationRepository.findOne({ id });
  }

  async update(id: number, updateReservationDto: UpdateReservationDto) {
    return this.reservationRepository.findOneAndUpdate(
      { id },
      updateReservationDto,
    );
  }

  async remove(id: number) {
    return this.reservationRepository.findOneAndDelete({ id });
  }
}
