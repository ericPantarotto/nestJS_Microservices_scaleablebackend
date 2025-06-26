import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from './dto/notify-email.dto';

@Injectable()
export class NotificationsService {
  notifyEmail({ email }: NotifyEmailDto) {
    console.log(`Sending notification email to ${email}`);
  }
}
