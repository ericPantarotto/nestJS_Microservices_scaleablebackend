import { Query, Resolver } from '@nestjs/graphql';
import { PaymentsService } from './payments.service';
import { PaymentIntent } from './payment-intent.entity';

@Resolver(() => PaymentIntent)
export class PaymentsResolver {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Query(() => [PaymentIntent], { name: 'payments' })
  findAll() {
    return this.paymentsService.getPayments();
  }
}
