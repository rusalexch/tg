import { Inject, Injectable } from '@nestjs/common';
import { TELEGRAM_CONFIG_KEY, TelegramConfigType } from '../../common/config';
import { IUser, IMenuButton, IMenuItem } from './interfaces';
import { menu } from './menu';
import { nanoid } from 'nanoid';

@Injectable()
export class AppService {
  private orders: Map<string, { user: IUser; order: IMenuItem }> = new Map();
  constructor(
    @Inject(TELEGRAM_CONFIG_KEY) private readonly config: TelegramConfigType,
  ) {}

  async getMenu(user: IUser): Promise<IMenuButton[]> {
    return menu.map((order) => {
      const key = nanoid();
      this.orders.set(key, { user, order });
      const url = `${this.config.url}/order/${key}`;
      const name = `${order.name} - ${order.price} руб.`;
      return {
        name,
        url,
      };
    });
  }

  async getOrder(key: string) {
    if (!this.orders.has(key)) {
      return 'Заказ не найден';
    }
    return this.orders.get(key);
  }
}
