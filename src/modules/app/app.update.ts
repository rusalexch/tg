import { Ctx, InjectBot, Sender, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { AppService } from './app.service';
import { InlineKeyboardButton } from 'typegram/inline';
import { AppLoggerService } from '../app-logger/app-logger.service';

@Update()
export class AppUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly appService: AppService,
    private readonly logger: AppLoggerService,
  ) {}

  @Start()
  async startCommand(
    @Ctx() ctx: Context,
    @Sender('id') id: string,
    @Sender('username') username: string,
    @Sender('first_name') firstName: string,
    @Sender('last_name') lastName: string,
  ) {
    const { id: chatId } = ctx.chat;
    const menu = await this.appService.getMenu({
      id,
      username,
      lastName,
      firstName,
    });
    const buttons: InlineKeyboardButton[][] = menu.map(({ name, url }) => [
      {
        text: name,
        url,
      },
    ]);
    try {
      await this.bot.telegram.sendMessage(
        chatId,
        `Здравствуйте ${firstName} ${lastName}, что хотите заказать?`,
        {
          reply_markup: {
            inline_keyboard: buttons,
          },
        },
      );
    } catch (error) {
      this.logger.error(
        error,
        undefined,
        `${AppUpdate.name}: ошибка при отправке меню`,
      );
      await ctx.reply(
        `Извините, у нас возникли технические неполадки, мы уже их исправляем. Попробуйте чуть позже`,
      );
    }
  }
}
