import { Test, TestingModule } from '@nestjs/testing'
import t from 'tap'
import { AppResolver } from './app.resolver'

t.test('AppResolver', (t) => {
  let resolver: AppResolver

  t.beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppResolver],
    }).compile()

    resolver = module.get<AppResolver>(AppResolver)
  })

  t.test('should be defined', (t) => {
    t.ok(resolver)
    t.end()
  })

  t.test('status', (t) => {
    t.test('should return "running"', (t) => {
      t.equal(resolver.status(), 'running')
      t.end()
    })

    t.end()
  })

  t.test('version', (t) => {
    t.test('should return the current version', (t) => {
      t.equal(resolver.version(), 'v1.0.0')
      t.end()
    })

    t.end()
  })

  t.end()
})
