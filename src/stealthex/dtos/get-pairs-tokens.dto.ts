import { ArgsType, Field } from '@nestjs/graphql'

@ArgsType()
export class GetPairTokens {
  @Field(() => String)
  nativeCurrency: string = ''
}
