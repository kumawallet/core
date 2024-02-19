import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from 'axios'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { catchError, firstValueFrom } from 'rxjs'
import {
  StealthExPairTokens,
  StealthExEstimatedAmount,
  StealthExMinimalAmount,
  StealthExExchangeAmounts,
  StealthExApiError,
  StealthExSwapResponse,
  StealthExExchange,
  StealthExExchangeSimpleInfo,
} from './stealhtex.interface'

@Injectable()
export class StealthExService {
  constructor(
    @InjectPinoLogger(StealthExService.name)
    private readonly logger: PinoLogger,
    private readonly httpService: HttpService,
  ) {}

  public async sendPetition<T = any>(
    path: string,
    method: Method,
    params?: any,
    body?: any,
  ): Promise<AxiosResponse<T>> {
    const config: AxiosRequestConfig = {
      url: path,
      method,
    }

    if (params) {
      config.params = params
    }

    if (body) {
      config.data = body
    }

    return firstValueFrom(
      this.httpService.request<T>(config).pipe(
        catchError((error: AxiosError<StealthExApiError>) => {
          this.logger.error({ err: error?.response?.data }, 'AxiosError: Error sending petition.')

          throw new Error(error?.response?.data.message || error.message)
        }),
      ),
    )
  }
  // public async getTokens(): Promise<StealthExToken[]> {
  //   try {
  //     const { data } = await this.sendPetition<StealthExToken[]>('currency', 'get')

  //     return data
  //   } catch (err) {
  //     this.logger.error({ err }, 'Error getting tokens.')

  //     return []
  //   }
  // }

  public async getPairTokensFromNativeCurrency(nativeCurrencies: string[]): Promise<StealthExPairTokens[]> {
    try {
      const data = await Promise.all<StealthExPairTokens>(
        nativeCurrencies.map((nativeCurrency) =>
          this.sendPetition<string[]>(`pairs/${nativeCurrency}`, 'get').then(({ data }) => ({
            asset: nativeCurrency,
            pairs: data,
          })),
        ),
      )

      return data
    } catch (err) {
      this.logger.error({ err, nativeCurrencies }, 'Error getting pair for tokens.')

      return []
    }
  }

  public async getExchangeAmounts(from: string, to: string, amount: string): Promise<StealthExExchangeAmounts> {
    try {
      const params = { amount }
      const [estimate, min] = await Promise.all([
        this.sendPetition<StealthExEstimatedAmount>(`estimate/${from}/${to}`, 'get', params),
        this.sendPetition<StealthExMinimalAmount>(`min/${from}/${to}`, 'get', params),
      ])

      return {
        estimated: estimate.data?.estimated_amount || '0',
        min: min.data?.min_amount || '0',
      }
    } catch (err) {
      this.logger.error({ err, from, to, amount }, 'Error getting exchange amounts.')

      return { estimated: '0', min: '0' }
    }
  }

  public async createSwap(
    addressFrom: string,
    addressTo: string,
    amountFrom: string,
    currencyFrom: string,
    currencyTo: string,
  ): Promise<StealthExSwapResponse> {
    try {
      const { data } = await this.sendPetition<StealthExExchange>('exchange', 'post', null, {
        address_to: addressTo,
        amount_from: amountFrom,
        currency_from: currencyFrom,
        currency_to: currencyTo,
        fixed: false,
        extra_id_to: '',
        referral: '',
        refund_address: addressFrom,
        refund_extra_id: '',
        timezoneOffset: 240,
      })

      return { destination: data.address_from, id: data.id }
    } catch (err: any) {
      this.logger.error({ err, addressTo, amountFrom, currencyFrom, currencyTo }, 'Error creating swap.')

      return { error: err.message }
    }
  }

  async getActiveSwaps(swapIds: string[]): Promise<StealthExExchangeSimpleInfo[]> {
    try {
      const data = await Promise.all<StealthExExchangeSimpleInfo>(
        swapIds.map((swapId) =>
          this.sendPetition<StealthExExchange>(`exchange/${swapId}`, 'get').then(({ data }) => ({
            id: data.id,
            currencyFrom: data.currency_from,
            currencyTo: data.currency_to,
            iconFrom: data.currencies?.[data.currency_from]?.image || '',
            iconTo: data.currencies?.[data.currency_to]?.image || '',
            amountFrom: data.amount_from,
            amountTo: data.amount_to,
            addressFrom: data.address_from,
            addressTo: data.address_to,
            status: data.status,
          })),
        ),
      )

      return data
    } catch (err) {
      this.logger.error({ err, swapIds }, 'Error getting active swaps.')

      return []
    }
  }
}
