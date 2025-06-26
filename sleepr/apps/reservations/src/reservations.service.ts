import { PAYMENTS_SERVICE, UserDto } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices/client/client-proxy';
import { firstValueFrom } from 'rxjs';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationRepository } from './reservation.repository';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    @Inject(PAYMENTS_SERVICE) private readonly paymentsService: ClientProxy,
  ) {}

  async create(
    createReservationDto: CreateReservationDto,
    { email, _id: userId }: UserDto,
  ) {
    const paymentResponse: unknown = await firstValueFrom(
      this.paymentsService.send('create_charge', {
        ...createReservationDto.charge,
        email,
      }),
    );
    // Optionally, assert or cast to the expected type if known, e.g.:
    // const paymentResponse = await firstValueFrom<PaymentResponseType>(
    //   this.paymentsService.send('create_charge', createReservationDto.charge),
    // );

    // console.log('Payment response:', paymentResponse);

    const reservation = {
      ...createReservationDto,
      timestamp: new Date(),
      userId,
      invoiceId: (paymentResponse as { id: string })['id'],
    };
    return this.reservationRepository.create(reservation);
  }

  async findAll() {
    return this.reservationRepository.find({});
  }

  async findOne(_id: string) {
    return this.reservationRepository.findOne({ _id });
  }

  async update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationRepository.findOneAndUpdate(
      { _id },
      { $set: updateReservationDto },
    );
  }

  async remove(_id: string) {
    return this.reservationRepository.findOneAndDelete({ _id });
  }
}
