import { ormProviders } from './orm.providers';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
    providers: [...ormProviders],
    exports: [...ormProviders],
})
export class OrmModule {}
