/* eslint-disable @typescript-eslint/no-floating-promises */
import { NotificationsServiceControllerMethods } from '@app/common';
import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { NotifyEmailDto } from './dto/notify-email.dto';
import { NotificationsService } from './notifications.service';

@Controller()
@NotificationsServiceControllerMethods()
export class NotificationsController implements NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @UsePipes(new ValidationPipe())
  @EventPattern('notify_email')
  notifyEmail(data: NotifyEmailDto) {
    this.notificationsService.notifyEmail(data);
  }
}
