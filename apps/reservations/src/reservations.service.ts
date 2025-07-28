import { PAYMENTS_SERVICE, User } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices/client/client-proxy';
import { firstValueFrom } from 'rxjs';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { PrismaService } from './prisma.service';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(PAYMENTS_SERVICE) private readonly paymentsService: ClientProxy,
  ) {}

  async create(
    createReservationDto: CreateReservationDto,
    { email, id: userId }: User,
  ) {
    const paymentResponse: unknown = await firstValueFrom(
      this.paymentsService.send('create_charge', {
        ...createReservationDto.charge,
        email,
      }),
    );

    const reservation = {
      ...createReservationDto,
      timestamp: new Date(),
      userId,
      invoiceId: (paymentResponse as { id: string })['id'],
    };
    return this.prismaService.reservation.create({
      data: {
        startDate: reservation.startDate,
        endDate: reservation.endDate,
        invoiceId: reservation.invoiceId,
        timestamp: new Date(),
        userId,
      },
    });
  }

  async findAll() {
    return this.prismaService.reservation.findMany({});
  }

  async findOne(id: number) {
    return this.prismaService.reservation.findUniqueOrThrow({ where: { id } });
  }

  async update(id: number, updateReservationDto: UpdateReservationDto) {
    return this.prismaService.reservation.update({
      where: { id },
      data: updateReservationDto,
    });
  }

  async remove(id: number) {
    return this.prismaService.reservation.delete({ where: { id } });
  }
}
