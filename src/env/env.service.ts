import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Params as PinoParams } from 'nestjs-pino'
import { Level as PinoLevel, LoggerOptions } from 'pino'
import { Environment } from '../env/env.validation'

@Injectable()
export class EnvService {
  public readonly NODE_ENV: Environment
  public readonly PORT: number
  public readonly API_BASE_PATH: string
  public readonly LOG_NAME: string
  public readonly LOG_LEVEL: PinoLevel

  public readonly GRAPHQL_DEBUG: boolean
  public readonly GRAPHQL_PLAYGROUND: boolean
  public readonly GRAPHQL_SORT_SCHEMA: boolean
  public readonly GRAPHQL_INTROSPECTION: boolean

  public readonly STEALTH_EX_BASE_URL: string
  public readonly STEALTH_EX_API_KEY: string

  public readonly COINMARKETCAP_BASE_URL: string
  public readonly COINMARKETCAP_API_KEY: string

  constructor(private readonly config: ConfigService) {
    // public env variables
    this.NODE_ENV = this.config.get<Environment>('NODE_ENV', Environment.Development)
    this.PORT = parseInt(this.config.get<string>('PORT', '8080'), 10)
    this.API_BASE_PATH = this.config.get<string>('API_BASE_PATH', '/api/v1')
    this.LOG_NAME = this.config.get<string>('LOG_NAME', 'nestjs-api-boilerplate')
    this.LOG_LEVEL = this.config.get<PinoLevel>('LOG_LEVEL', 'debug')

    // graphql env variables
    this.GRAPHQL_DEBUG = this.config.get<boolean>('GRAPHQL_DEBUG', false)
    this.GRAPHQL_PLAYGROUND = this.config.get<boolean>('GRAPHQL_PLAYGROUND', false)
    this.GRAPHQL_SORT_SCHEMA = this.config.get<boolean>('GRAPHQL_SORT_SCHEMA', false)
    this.GRAPHQL_INTROSPECTION = this.config.get<boolean>('GRAPHQL_INTROSPECTION', false)

    this.STEALTH_EX_BASE_URL = this.config.get<string>('STEALTH_EX_BASE_URL', '')
    this.STEALTH_EX_API_KEY = this.config.get<string>('STEALTH_EX_API_KEY', '')

    this.COINMARKETCAP_BASE_URL = this.config.get<string>('COINMARKETCAP_BASE_URL', '')
    this.COINMARKETCAP_API_KEY = this.config.get<string>('COINMARKETCAP_API_KEY', '')
  }

  public isProduction(): boolean {
    return this.NODE_ENV === Environment.Production
  }

  public isDevelopment(): boolean {
    return this.NODE_ENV === Environment.Development
  }

  public isTest(): boolean {
    return this.NODE_ENV === Environment.Test
  }

  public isStaging(): boolean {
    return this.NODE_ENV === Environment.Staging
  }

  public getPinoConfig(): PinoParams {
    const pinoHttp: LoggerOptions = {
      name: this.LOG_NAME,
      level: this.LOG_LEVEL,
    }

    if (!this.isProduction()) {
      pinoHttp.transport = {
        target: 'pino-pretty',
        options: { colorize: true, singleLine: true, translateTime: true },
      }
    }

    return { pinoHttp }
  }
}
