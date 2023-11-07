import { Injectable } from '@nestjs/common'
import axios, { AxiosInstance } from 'axios'
import { EnvService } from 'src/env/env.service'

@Injectable()
export class StealthExService {
  private readonly API_KEY: string
  private readonly API: AxiosInstance

  constructor(private readonly envService: EnvService) {
    this.API_KEY = this.envService.STEALTH_EX_API_KEY

    this.API = axios.create({
      baseURL: 'https://api.stealthex.io/api/v2/',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  sendPetition({
    body,
    method,
    path,
    querys,
  }: {
    path: string
    method: 'get' | 'post'
    querys?: { [key: string]: string }
    body?: { [key: string]: unknown }
  }) {
    let url = `${path}?api_key=${this.API_KEY}`

    if (querys) {
      Object.keys(querys).forEach((key) => {
        url += `&${key}=${querys[key]}`
      })
    }

    if (body) {
      return this.API[method](url, body)
    }

    return this.API[method](url)
  }

  async getTokens() {
    const { data } = await this.sendPetition({
      path: 'currency',
      method: 'get',
    })

    return data
  }

  async getPairTokensFromNativeCurrency({ nativeCurrency }: { nativeCurrency: string }) {
    const { data } = await this.sendPetition({
      path: `pairs/${nativeCurrency}`,
      method: 'get',
    })

    return data
  }

  async getEstimatedAmount({ from, to, amount }: { from: string; to: string; amount: string }) {
    const [{ data }, { data: data2 }] = await Promise.all([
      this.sendPetition({
        path: `estimate/${from}/${to}`,
        method: 'get',
        querys: {
          amount,
        },
      }),
      this.sendPetition({
        path: `min/${from}/${to}`,
        method: 'get',
        querys: {
          amount,
        },
      }),
    ])

    return {
      estimatedAmount: data?.estimated_amount,
      minAmount: data2?.min_amount,
    }
  }

  async createSwap({
    addressTo,
    amountFrom,
    currencyFrom,
    currencyTo,
  }: {
    addressTo: string
    amountFrom: string
    currencyFrom: string
    currencyTo: string
  }) {
    try {
      const { data } = await this.sendPetition({
        path: 'exchange',
        method: 'post',
        body: {
          address_to: addressTo,
          amount_from: amountFrom,
          currency_from: currencyFrom,
          currency_to: currencyTo,
          fixed: false,
          extra_id_to: '',
          referral: '',
          refund_address: '',
          refund_extra_id: '',
          timezoneOffset: 240,
        },
      })

      const destination = data?.address_from as string
      return { destination, error: null }
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      return { destination: null, error: error.response?.data?.message }
    }
  }
}
