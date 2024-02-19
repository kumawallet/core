import { ArgsType, Field, ObjectType } from '@nestjs/graphql'

@ArgsType()
export class GetPairTokensArgs {
  @Field(() => [String])
  nativeCurrencies: string[] = []
}

@ObjectType()
export class Pairs {
  @Field(() => String)
  asset: string = ''

  @Field(() => [String])
  pairs: string[] = []
}

@ObjectType()
export class GetPairTokens {
  @Field(() => [Pairs])
  pairs = []
}

