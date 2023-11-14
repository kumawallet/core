import { ArgsType, Field, ObjectType } from '@nestjs/graphql'

@ArgsType()
export class GetEstimatedAmount {
  @Field(() => String)
  from: string = ''

  @Field(() => String)
  to: string = ''

  @Field(() => String)
  amount: string = ''
}

@ObjectType()
export class EstimatedAmount {
  @Field(() => Number!, { nullable: true })
  estimated?: number = 0

  @Field(() => Number)
  min: number = 0
}
