import { NOTIFICATIONS_SERVICE } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import Stripe from 'stripe';
import { PaymentsCreateChargeDto } from './dto/payment-create-charge.dto';

@Injectable()
export class PaymentsService {
  private readonly stripe: Stripe;

  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationsService: ClientProxy,
  ) {
    this.stripe = new Stripe(
      this.configService.get<string>('STRIPE_SECRET_KEY')!,
      // {
      //   apiVersion: '2025-05-28.basil',
      // },
    );
  }

  async createCharge({ card, amount, email }: PaymentsCreateChargeDto) {
    const paymentMethod = await this.stripe.paymentMethods.create({
      type: 'card',
      card: {
        token: card.token,
      },
    });
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100, // Stripe expects the amount in cents
      confirm: true,
      currency: 'usd',
      payment_method: paymentMethod.id,
      payment_method_types: ['card'],
    });

    this.notificationsService.emit('notify_email', {
      email,
      text: `Your payment of $${amount} has been successfully processed.`,
    });
    return paymentIntent;
  }
}

// NOTE: alternate createCharge method
// async createCharge({ amount }: CreateChargeDto) {
//   const paymentIntent = await this.stripe.paymentIntents.create({
//     amount: amount * 100, // Stripe expects the amount in cents
//     confirm: true,
//     currency: 'usd',
//     payment_method: 'pm_card_visa', // Use a test card ID for testing purposes
//     automatic_payment_methods: {
//       enabled: true,
//       allow_redirects: 'never',
//     },
//   });
